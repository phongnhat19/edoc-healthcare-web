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
} from "reactstrap";

import FormFieldTable from "./FormFieldTable";

const CreateFormPage = () => {
  const [formName, setFormName] = useState("");

  const [formFields, setFormFields] = useState([
    {
      label: "Tên bệnh nhân",
      code: "name",
      type: "string",
      option: [] as string[],
      default: "",
      editing: false,
    },
    {
      label: "Ngày sinh",
      code: "dob",
      type: "string",
      option: [] as string[],
      default: "{{today}}",
      editing: false,
    },
  ]);

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
                <FormFieldTable
                  updateFormField={updateFormField}
                  formFields={formFields}
                  addFormField={addFormField}
                  deleteFormField={deleteFormField}
                />
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
