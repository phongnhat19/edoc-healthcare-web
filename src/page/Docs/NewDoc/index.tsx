import React, { useState, useEffect, useContext } from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  Table,
} from "reactstrap";
import { getAllForms } from "../../../services/api/form";
import { UserContext } from "../../../App";
import { ClipLoader } from "react-spinners";
import { type } from "os";

const NewDocForm = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [issuedPlace, setIssuedPlace] = useState("");
  const [issuedTime, setIssuedTime] = useState("");
  const [description, setDescription] = useState("");
  const [uri, setUri] = useState("");

  const [allForm, setAllForm] = useState({
    page: 1,
    limit: 100,
    totalItems: 0,
    totalPages: 0,
    data: [] as Array<Form>,
  });
  const [formId, setFormId] = useState("");
  const [formField, setFormField] = useState([] as Array<FormField>);

  const { token } = useContext(UserContext);

  const getCurrentDate = (): string => {
    const today = new Date();
    return (
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
  };

  useEffect(() => {
    setIssuedTime(getCurrentDate());
  }, []);

  useEffect(() => {
    const { page, limit } = allForm;
    getAllForms({ page, limit, token }).then((response) => {
      setAllForm(response);
      setLoading(false);
    });
  }, []);

  const handleSubmit = () => {
    console.log(name, issuedPlace, issuedTime, description, uri);
  };

  useEffect(() => {
    const selectedForm = allForm.data.filter((form) => form._id === formId)[0];
    setFormField(selectedForm?.inputFields);
    console.log(allForm.data.filter((form) => form._id === formId)[0]);
  }, [formId]);

  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        {loading ? (
          <ClipLoader />
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
                  Tên
                </Col>
                <Col xs="12" lg="4">
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                    value={issuedPlace}
                    onChange={(e) => setIssuedPlace(e.target.value)}
                  />
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
                    value={issuedTime}
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
                    <option key="default" value=""></option>
                    {allForm.data.map((doc) => (
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
                    onChange={(e) => setDescription(e.target.value)}
                  />
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
                    onChange={(e) => setUri(e.target.value)}
                  />
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
                      {formField?.map((form) => (
                        <tr>
                          <td>{form.name}</td>
                          <td>
                            {form.type === "string" ? (
                              <Input type="text" name={type.name} />
                            ) : (
                              <Input type="select">
                                <option>A</option>
                                <option>B</option>
                              </Input>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
            <div className="divider" />
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
