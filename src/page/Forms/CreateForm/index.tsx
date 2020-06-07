import React, { useState } from "react";
import {
  Row,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Table,
  CustomInput,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Switch from "rc-switch";

const CreateFormPage = () => {
  const [formName, setFormName] = useState("");

  const [formField, setFormFields] = useState([
    {
      fieldName: "Tên bệnh nhân",
      fieldCode: "name",
      fieldType: "Text",
      fieldRequired: true,
      fieldDefault: "Tên bệnh nhân",
    },
    {
      fieldName: "Ngày sinh",
      fieldCode: "dob",
      fieldType: "Date",
      fieldRequired: true,
      fieldDefault: "{{today}}",
    },
  ]);

  const toggleRequire = (fieldIndex: number) => {
    const newFormField = [...formField];
    newFormField[fieldIndex].fieldRequired = !newFormField[fieldIndex]
      .fieldRequired;
    setFormFields(newFormField);
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
                  name="createdDate"
                  value={"01/06/2020"}
                  disabled
                />
              </Col>
              <Col xs="12" lg="2" className="d-flex align-items-center">
                Người tạo
              </Col>
              <Col xs="12" lg="2">
                <Input
                  type="text"
                  name="createdDate"
                  value={"Admin"}
                  disabled
                />
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
                  onChange={(e) => setFormName(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="justify-content-center mt-3">
              <Col xs="12" lg="2" className="d-flex align-items-center">
                Loại mẫu
              </Col>
              <Col xs="12" lg="6">
                <Input type="select" name="select" id="exampleSelect">
                  <option>Y tế</option>
                  <option>Xét nghiệm</option>
                </Input>
              </Col>
            </Row>
            <Row className="justify-content-center mt-5">
              <Col width="12">
                <div className="table-responsive-md">
                  <Table className="text-nowrap mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center" style={{ width: "5%" }}>
                          <CustomInput
                            type="checkbox"
                            id="CustomCheckbox3"
                            className="align-self-start"
                            label="&nbsp;"
                          />
                        </th>
                        <th>Tên field</th>
                        <th>Loại</th>
                        <th>Mã</th>
                        <th className="text-center" style={{ width: "20%" }}>
                          Bắt buộc
                        </th>
                        <th>Giá trị mặc định</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {formField.map((field, fieldIndex) => {
                        return (
                          <tr>
                            <td className="text-center">
                              <CustomInput
                                type="checkbox"
                                id="doc-1"
                                className="align-self-start"
                                label="&nbsp;"
                              />
                            </td>
                            <td>
                              <b>{field.fieldName}</b>
                            </td>
                            <td>
                              <div className="align-box-row">
                                {field.fieldType}
                              </div>
                            </td>
                            <td>
                              <div className="align-box-row">
                                {field.fieldCode}
                              </div>
                            </td>
                            <td className="text-center">
                              <Switch
                                checked={field.fieldRequired}
                                onMouseUp={() => toggleRequire(fieldIndex)}
                                loadingIcon={<div></div>}
                                className="switch-small toggle-switch-success"
                              />
                            </td>
                            <td>{field.fieldDefault}</td>
                            <td className="text-center">
                              <div>
                                <Button
                                  size="sm"
                                  color="neutral-first"
                                  className="d-30 btn-pill p-0 btn-icon"
                                >
                                  <FontAwesomeIcon
                                    icon={faEllipsisH}
                                    className="font-size-lg"
                                  />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </CardBody>
          <div className="divider" />
          <CardFooter className="d-flex justify-content-end">
            <Button size="sm" className="py-2 px-4" color="primary">
              <span className="btn-wrapper--label text-uppercase font-weight-bold">
                Tạo
              </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateFormPage;
