import React, {useContext, useEffect, useState} from "react";

import {Button, Card, CardBody, CardFooter, CardHeader, Col, FormFeedback, Input, Row, Table,} from "reactstrap";
import {getAllForms} from "../../../services/api/form";
import {UserContext} from "../../../App";
import {ClipLoader} from "react-spinners";
import {getFormattedDate} from "../../../utils/date";

const NewDocForm = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [issuedPlace, setIssuedPlace] = useState("");
  const [description, setDescription] = useState("");
  const [uri, setUri] = useState("");

  const [formList, setFormList] = useState([] as Form[]);
  const [formId, setFormId] = useState("");
  const [inputData, setInputData] = useState([] as FormInputData[]);

  // Error message state
  const [formNameError, setFormNameError] = useState("");
  const [formIssuedPlaceError, setFormIssuedPlaceError] = useState("");
  const [formDescriptionError, setFormDescriptionError] = useState("");
  const [formUriError, setFormUriError] = useState("");

  const {token} = useContext(UserContext);

  useEffect(() => {
    getAllForms({page: 1, limit: 100, token}).then((response) => {
      setFormList(response.data);
      setLoading(false);
      // set 1st items as default id
      setFormId(response.data[0]._id);
    });
  }, [token]);

  const checkValid = () : boolean => {
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
    return isValid;
  }

  const handleSubmit = () => {
    let isValid = checkValid();;
    if (!isValid) return;
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
    const selectedForm = formList.filter((form) => form._id === formId)[0];
    if (!selectedForm) return [] as FormField[];
    return selectedForm.inputFields;
  };

  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        {loading ? (
          <ClipLoader/>
        ) : (
          <Card>
            <CardHeader>
              <div className="card-header--title">
                <b className="d-block text-uppercase mt-1">Tạo Hồ sơ mới</b>
              </div>
            </CardHeader>
            <div className="divider"/>
            <CardBody>
              <Row className="justify-content-center">
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Tên
                </Col>
                <Col xs="12" lg="4">
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    invalid={formNameError !== ""}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormFeedback>{formNameError}</FormFeedback>
                </Col>
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
              </Row>
              <Row className="justify-content-center mt-4">
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  Ngày Cấp
                </Col>
                <Col xs="12" lg="4">
                  <Input
                    type="text"
                    name="issuedTime"
                    value={getFormattedDate(new Date())}
                    disabled
                  />
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
                    <option value={""}>Chọn mẫu hồ sơ</option>
                    {formList.map((doc) => (
                      <option key={doc._id} value={doc._id}>
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
              <Row className="justify-content-end mt-4">
                <Col xs="12" lg="10">
                  <Table className="text-nowrap mb-0">
                    <thead>
                    <tr>
                      <th>Thông tin</th>
                      <th>Giá trị</th>
                    </tr>
                    </thead>
                    <tbody>
                      {getSelectedFormInputFields().map((form) => (
                        <tr>
                          <td>{form.label}</td>
                          <td>
                            {form.type === "string" ? (
                              <Input
                                type="text"
                                value={getInputData(form.name)}
                                onChange={(e) =>
                                  updateInputData(form.name, e.target.value)
                                }
                              />
                            ) : (
                              <Input
                                type="select"
                                value={getInputData(form.name)}
                                onChange={(e) => updateInputData(form.name, e.target.value)}
                              >
                                {
                                  form.options?.map( (opt, idx) => <option key={idx} value={opt}>{opt}</option> )

                                }
                              </Input>
                              )
                            }
                          )
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
            <div className="divider"/>
            <CardFooter className="d-flex justify-content-end">
              <Button size="sm" className="py-2 px-4" color="danger">
                Hủy
              </Button>
              &nbsp;
              <Button
                size="sm"
                className="py-2 px-4"
                color="primary"
                onClick={handleSubmit}
              >
                Tạo
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NewDocForm;
