import React, { useState, useContext } from "react";
import {
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";
import Swal from "sweetalert2";
import { UserContext } from "../../../App";

import "./style.css";
import { getFormRawTX, sendSignedFormTX } from "../../../services/api/form";
import {
  symDecrypt,
  getClientPassphrase,
  getSignedTx,
} from "../../../utils/blockchain";
import CreatedDate from "./components/CreatedDate";
import Creator from "./components/Creator";
import FormName from "./components/FormName";
import FormSymbol from "./components/FormSymbol";
import FormTab from "./components/FormTab";

const CreateFormPage = () => {
  const [formName, setFormName] = useState("");
  const [formNameError, setFormNameError] = useState("");
  const [formSymbol, setFormSymbol] = useState("");
  const [formSymbolError, setFormSymbolError] = useState("");
  const [modelUI, setModelUI] = useState("");
  const [loading, setLoading] = useState(false);

  const [formFields, setFormFields] = useState([] as TableFormField[]);
  const { userData, token } = useContext(UserContext);

  const handleSubmitForm = () => {
    let isValid = true;
    if (!formName) {
      setFormNameError("Tên mẫu không được để trống");
      isValid = false;
    }
    if (!formSymbol) {
      setFormSymbolError("Ký hiệu không được để trống");
      isValid = false;
    }
    if (!isValid) return;
    setLoading(true);
    const formDataToSubmit = {
      token,
      name: formName,
      symbol: formSymbol,
      modelUI,
      inputFields: formFields.map((field) => {
        const resultObj = {
          label: field.label,
          name: field.code,
          type: field.type as FormFieldType,
          options: field.option,
        };
        if ((field.type as FormFieldType) === "string")
          delete resultObj.options;
        return resultObj;
      }),
    };
    getFormRawTX(formDataToSubmit)
      .then(({ rawTx, sessionKey }) => {
        const decryptedPrivateKey = symDecrypt(
          userData.privateEncrypted,
          getClientPassphrase(userData._id)
        );
        const signedTx = getSignedTx(rawTx, decryptedPrivateKey);
        return sendSignedFormTX({ token, sessionKey, signedTx });
      })
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Thành công",
          text: "Tạo mẫu hồ sơ thành công.",
          type: "success",
          confirmButtonText: "OK",
        }).then(() => (window.location.href = "/forms/list"));
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Oops",
          text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
          type: "error",
          confirmButtonText: "OK",
        });
        console.error(err);
      });
  };

  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        <Card>
          <CardHeader>
            <div className="card-header--title">
              <b className="d-block text-uppercase mt-1">Tạo mẫu mới</b>
            </div>
          </CardHeader>
          <div className="divider" />
          <CardBody>
            <Row className="justify-content-center">
              <CreatedDate />
              <Creator />
            </Row>
            <Row className="justify-content-center mt-3">
              <FormName
                formName={formName}
                setFormName={setFormName}
                formNameError={formNameError}
              />
            </Row>
            <Row className="justify-content-center mt-3">
              <FormSymbol
                formSymbol={formSymbol}
                formSymbolError={formSymbolError}
                setFormSymbol={setFormSymbol}
              />
            </Row>
            <FormTab
              formFields={formFields}
              setFormFields={setFormFields}
              modelUI={modelUI}
              setModelUI={setModelUI}
            />
          </CardBody>
          <div className="divider" />
          <CardFooter className="d-flex justify-content-end">
            <Button
              size="sm"
              className="py-2 px-4 mr-3"
              color="danger"
              onClick={() => (window.location.href = "/forms/list")}
              disabled={loading}
            >
              <span className="btn-wrapper--label text-uppercase font-weight-bold">
                Huỷ
              </span>
            </Button>
            <Button
              size="sm"
              className="py-2 px-4"
              color="primary"
              onClick={handleSubmitForm}
              disabled={loading}
            >
              {loading ? (
                <span
                  className="btn-wrapper--icon spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <span className="btn-wrapper--label text-uppercase font-weight-bold">
                  Tạo
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateFormPage;
