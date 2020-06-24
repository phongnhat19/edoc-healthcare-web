import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Row,
  Table,
  Nav,
  NavItem,
  NavLink as NavLinkStrap,
  TabContent,
  TabPane,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { getAllForms } from "../../../services/api/form";
import { UserContext } from "../../../App";
import { ClipLoader } from "react-spinners";
import {
  getAllDocTypes,
  getDocRawTX,
  sendSignedDocTX,
} from "../../../services/api/doc";
import vi from "date-fns/locale/vi";
import {
  symDecrypt,
  getClientPassphrase,
  getSignedTx,
} from "../../../utils/blockchain";
import Swal from "sweetalert2";
import clsx from "clsx";

const NewDocForm = () => {
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [issuedPlace, setIssuedPlace] = useState("");
  const [issuedTime, setIssuedTime] = useState(new Date());
  const [description, setDescription] = useState("");
  const [uri, setUri] = useState("");

  const [formList, setFormList] = useState([] as Form[]);
  const [formId, setFormId] = useState("");
  const [typeList, setTypeList] = useState([] as string[]);
  const [type, setType] = useState("");
  const [inputData, setInputData] = useState([] as FormInputData[]);

  // Error message state
  const [formNameError, setFormNameError] = useState("");
  const [formIssuedPlaceError, setFormIssuedPlaceError] = useState("");
  const [formDescriptionError, setFormDescriptionError] = useState("");
  const [formUriError, setFormUriError] = useState("");
  const [errorInputData, setErrorInputData] = useState("");
  const [activeTab, setActiveTab] = useState("formInfo");

  const { token, userData } = useContext(UserContext);

  useEffect(() => {
    Promise.all([
      getAllForms({ page: 1, limit: 100, token }),
      getAllDocTypes({ token }),
    ]).then(([responseForm, responseDocType]) => {
      setFormList(responseForm.data);
      setFormId(responseForm.data[0].blockchainId);

      setTypeList(responseDocType);
      setType(responseDocType[0]);
      setLoading(false);
    });
  }, [token]);

  const checkValid = (): boolean => {
    setFormNameError("");
    setFormIssuedPlaceError("");
    setFormDescriptionError("");
    setFormUriError("");

    let isValid = true;
    if (name === "") {
      setFormNameError("Tên không được để trống");
      isValid = false;
    }
    if (issuedPlace === "") {
      setFormIssuedPlaceError("Nơi cấp không được để trống");
      isValid = false;
    }
    if (description === "") {
      setFormDescriptionError("Mô tả không được để trống");
      isValid = false;
    }
    if (uri === "") {
      setFormUriError("Link không được để trống");
      isValid = false;
    }

    getSelectedFormInputFields().forEach((inputObj) => {
      if (getInputData(inputObj.name) === "") {
        setErrorInputData("Dữ liệu không được để trống");
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = () => {
    let isValid = checkValid();
    if (!isValid) return;

    const rawDocData = {
      token,
      docModelId: formId,
      name,
      uri,
      issuedPlace,
      issuedTime,
      owner: userData._id,
      description,
      type,
      inputData,
    };

    setCreating(true);

    getDocRawTX(rawDocData)
      .then(({ rawTx, sessionKey }) => {
        const decryptedPrivateKey = symDecrypt(
          userData.privateEncrypted,
          getClientPassphrase(userData._id)
        );
        const signedTx = getSignedTx(rawTx, decryptedPrivateKey);
        return sendSignedDocTX({ token, sessionKey, signedTx });
      })
      .then(() => {
        setCreating(false);
        Swal.fire({
          title: "Thành công",
          text: "Tạo hồ sơ thành công.",
          type: "success",
          confirmButtonText: "OK",
        }).then(() => (window.location.href = "/documents/list"));
      })
      .catch((err) => {
        setCreating(false);
        Swal.fire({
          title: "Oops",
          text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
          type: "error",
          confirmButtonText: "OK",
        });
        console.error(err);
      });
  };

  const updateInputData = (fieldCode: string, fieldValue: string) => {
    const newInputData = [...inputData];
    let found = false;
    newInputData.forEach((field) => {
      if (field.name === fieldCode) {
        found = true;
        field.value = fieldValue;
      }
    });
    if (!found) {
      newInputData.push({
        name: fieldCode,
        value: fieldValue,
      });
    }
    setInputData(newInputData);
  };

  const getInputData = (fieldCode: string) => {
    let returnValue = "";
    inputData.some((field) => {
      if (field.name === fieldCode) {
        returnValue = field.value;
        return true;
      }
      return false;
    });
    return returnValue;
  };

  const getSelectedFormInputFields = () => {
    const selectedForm = formList.filter(
      (form) => form.blockchainId === formId
    )[0];
    if (!selectedForm) return [] as FormField[];
    return selectedForm.inputFields;
  };

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        {loading ? (
          <div className="m-auto">
            <ClipLoader />
          </div>
        ) : (
          <Card>
            <CardHeader>
              <div className="card-header--title">
                <b className="d-block text-uppercase mt-1">Tạo Hồ sơ mới</b>
              </div>
            </CardHeader>
            <div className="divider" />
            <CardBody>
              <Row className="justify-content-center">
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Tên hồ sơ
                </Col>
                <Col xs="12" lg="10">
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    invalid={formNameError !== ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormFeedback>{formNameError}</FormFeedback>
                </Col>
              </Row>
              <Row className="justify-content-center mt-4">
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Nơi cấp
                </Col>
                <Col xs="12" lg="4">
                  <Input
                    type="text"
                    name="issuedPlace"
                    invalid={formIssuedPlaceError !== ""}
                    value={issuedPlace}
                    onChange={(e) => setIssuedPlace(e.target.value)}
                  />
                  <FormFeedback>{formIssuedPlaceError}</FormFeedback>
                </Col>
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Ngày Cấp
                </Col>
                <Col xs="12" lg="4">
                  <DatePicker
                    className="form-control"
                    selected={issuedTime}
                    onChange={(date) => setIssuedTime(date || new Date())}
                    locale={vi}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center mt-4">
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Loại
                </Col>
                <Col xs="12" lg="4">
                  <Input
                    type="select"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {typeList.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Mẫu
                </Col>
                <Col xs="12" lg="4">
                  <Input
                    type="select"
                    name="formId"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                  >
                    {formList.map((doc) => (
                      <option key={doc._id} value={doc.blockchainId}>
                        {doc.name}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
              <Row className="justify-content-center mt-4">
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Mô tả
                </Col>
                <Col xs="12" lg="10">
                  <Input
                    type="textarea"
                    name="description"
                    value={description}
                    invalid={formDescriptionError !== ""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <FormFeedback>{formDescriptionError}</FormFeedback>
                </Col>
              </Row>
              <Row className="justify-content-center mt-4">
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Link
                </Col>
                <Col xs="12" lg="10">
                  <Input
                    type="text"
                    name="uri"
                    value={uri}
                    invalid={formUriError !== ""}
                    onChange={(e) => setUri(e.target.value)}
                  />
                  <FormFeedback>{formUriError}</FormFeedback>
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Col span={12}>
                  <Nav tabs>
                    <NavItem>
                      <NavLinkStrap
                        className={clsx({ active: activeTab === "formInfo" })}
                        onClick={() => {
                          toggleTab("formInfo");
                        }}
                      >
                        Thông tin mẫu
                      </NavLinkStrap>
                    </NavItem>
                    <NavItem>
                      <NavLinkStrap
                        className={clsx({
                          active: activeTab === "recipentInfo",
                        })}
                        onClick={() => {
                          toggleTab("recipentInfo");
                        }}
                      >
                        Thông tin người nhận
                      </NavLinkStrap>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
              <Row className="justify-content-center mt-3">
                <Col span={12}>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="formInfo">
                      <Table className="text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>Thông tin</th>
                            <th>Giá trị</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getSelectedFormInputFields().map((form) => (
                            <tr key={`input-data-${form.name}`}>
                              <td>{form.name}</td>
                              <td>
                                {form.type === "string" ? (
                                  <Input
                                    type="text"
                                    value={getInputData(form.name)}
                                    onChange={(e) =>
                                      updateInputData(form.name, e.target.value)
                                    }
                                    invalid={
                                      getInputData(form.name) === "" &&
                                      errorInputData !== ""
                                    }
                                  />
                                ) : (
                                  <Input
                                    type="select"
                                    value={getInputData(form.name)}
                                    onChange={(e) =>
                                      updateInputData(form.name, e.target.value)
                                    }
                                    invalid={
                                      getInputData(form.name) === "" &&
                                      errorInputData !== ""
                                    }
                                  >
                                    <option value="">Chọn giá trị</option>
                                    {form.options?.map((opt, idx) => (
                                      <option key={idx} value={opt}>
                                        {opt}
                                      </option>
                                    ))}
                                  </Input>
                                )}
                                {getInputData(form.name) === "" && (
                                  <FormFeedback>{errorInputData}</FormFeedback>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </TabPane>
                    <TabPane tabId="recipentInfo">
                      <div>Thông tin người nhận</div>
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
                color="danger"
                disabled={creating}
                onClick={() => (window.location.href = "/documents/list")}
              >
                Hủy
              </Button>
              &nbsp;
              <Button
                size="sm"
                className="py-2 px-4"
                color="primary"
                onClick={handleSubmit}
                disabled={creating}
              >
                {creating ? (
                  <span
                    className="btn-wrapper--icon spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Tạo"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NewDocForm;
