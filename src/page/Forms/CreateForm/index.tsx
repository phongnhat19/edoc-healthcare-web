import React, { useState, useContext } from "react";
import {
  Row,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  FormFeedback,
  Nav,
  NavItem,
  NavLink as NavLinkStrap,
  TabContent,
  TabPane,
} from "reactstrap";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";

import FormFieldTable from "./FormFieldTable";
import { getFormattedDate } from "../../../utils/date";
import { UserContext } from "../../../App";

import "./style.css";
import { getFormRawTX, sendSignedFormTX } from "../../../services/api/form";
import {
  symDecrypt,
  getClientPassphrase,
  getSignedTx,
} from "../../../utils/blockchain";
import clsx from "clsx";

const CreateFormPage = () => {
  const [formName, setFormName] = useState("");
  const [formNameError, setFormNameError] = useState("");
  const [formSymbol, setFormSymbol] = useState("");
  const [formSymbolError, setFormSymbolError] = useState("");
  const [modelUI, setModelUI] = useState("");
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("modelUI");

  const [formFields, setFormFields] = useState([] as TableFormField[]);
  const { userData, token } = useContext(UserContext);

  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const updateFormField = (
    index: number,
    newValue: {
      label: string;
      code: string;
      type: string;
      option: string[];
      default: string;
      editing: boolean;
    }
  ) => {
    const newFormFields = [...formFields];
    newFormFields[index] = newValue;
    setFormFields(newFormFields);
  };

  const addFormField = () => {
    const newFormFields = [
      ...[
        {
          label: "",
          code: "",
          type: "string",
          option: [] as string[],
          default: "",
          editing: true,
        },
      ],
      ...formFields,
    ];
    setFormFields(newFormFields);
  };

  const deleteFormField = (index: number) => {
    const newFormFields = [...formFields];
    newFormFields.splice(index, 1);
    setFormFields(newFormFields);
  };

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
              <Col xs="12" lg="2" className="d-flex align-items-center">
                Ngày tạo
              </Col>
              <Col xs="12" lg="2">
                <Input
                  type="text"
                  value={getFormattedDate(new Date())}
                  disabled
                />
              </Col>
              <Col xs="12" lg="2" className="d-flex align-items-center">
                Người tạo
              </Col>
              <Col xs="12" lg="2">
                <Input type="text" value={userData.name} disabled />
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col xs="12" lg="2" className="d-flex align-items-center">
                Tên mẫu
              </Col>
              <Col xs="12" lg="6">
                <Input
                  type="text"
                  name="formName"
                  value={formName}
                  invalid={formNameError !== ""}
                  onChange={(e) => setFormName(e.target.value)}
                />
                <FormFeedback>{formNameError}</FormFeedback>
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col xs="12" lg="2" className="d-flex align-items-center">
                Ký hiệu
              </Col>
              <Col xs="12" lg="6">
                <Input
                  type="text"
                  name="formSymbol"
                  value={formSymbol}
                  invalid={formSymbolError !== ""}
                  onChange={(e) => setFormSymbol(e.target.value)}
                />
                <FormFeedback>{formSymbolError}</FormFeedback>
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col span={12}>
                <Nav tabs>
                  <NavItem>
                    <NavLinkStrap
                      className={clsx({ active: activeTab === "modelUI" })}
                      onClick={() => {
                        toggle("modelUI");
                      }}
                    >
                      Mẫu
                    </NavLinkStrap>
                  </NavItem>
                  <NavItem>
                    <NavLinkStrap
                      className={clsx({ active: activeTab === "inputFields" })}
                      onClick={() => {
                        toggle("inputFields");
                      }}
                    >
                      Thông tin cần thiết
                    </NavLinkStrap>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col span={12}>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="modelUI">
                    <ReactQuill
                      theme="snow"
                      value={modelUI}
                      onChange={setModelUI}
                      placeholder="Example placeholder..."
                    />
                  </TabPane>
                  <TabPane tabId="inputFields">
                    <FormFieldTable
                      updateFormField={updateFormField}
                      formFields={formFields}
                      addFormField={addFormField}
                      deleteFormField={deleteFormField}
                    />
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </CardBody>
          <div className="divider" />
          <CardFooter className="d-flex justify-content-end">
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
