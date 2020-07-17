import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink as NavLinkStrap,
  Table,
} from "reactstrap";
import { getFormattedDate } from "../../../utils/date";
import { UserContext } from "../../../App";
import { getFormDetail } from "../../../services/api/form";
import clsx from "clsx";
import "./style.css";
import { Link } from "react-router-dom";

const FormDetail = () => {
  const { formId: formID } = useParams();
  const [formData, setFormData] = useState<Form>();
  const [activeTab, setActiveTab] = useState("modelUI");

  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { token } = useContext(UserContext);

  useEffect(() => {
    getFormDetail({ token, formID }).then(setFormData);
  }, [formID, token]);

  const renderFormField = () => {
    return (
      <div className="table-responsive-md">
        <Table className="text-nowrap mb-0">
          <thead className="thead-light">
            <tr>
              <th>Tên field</th>
              <th>Loại</th>
              <th>Mã</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {formData?.inputFields.map((field, fieldIndex) => {
              return (
                <tr key={`field-${fieldIndex}`}>
                  <td>{field.label}</td>
                  <td>
                    <div className="align-box-row">{field.type}</div>
                  </td>
                  <td>
                    <div className="align-box-row">{field.name}</div>
                  </td>
                  <td>
                    <b>{field.options ? field.options.join(",") : ""}</b>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        <Card>
          <CardHeader>
            <div className="card-header--title">
              <b className="d-block text-uppercase mt-1">
                <Link to="/forms/list">Danh sách mẫu</Link> / {formData?.name}
              </b>
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
                  value={formData ? getFormattedDate(formData.dateCreated) : ""}
                  disabled
                />
              </Col>
              <Col xs="12" lg="2" className="d-flex align-items-center">
                Người tạo
              </Col>
              <Col xs="12" lg="2">
                <Input type="text" value={"123"} disabled />
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
                  value={formData ? formData.name : ""}
                  disabled
                />
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
                  value={formData ? formData.symbol : ""}
                  disabled
                />
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
                    <div
                      className="model-ui-container"
                      dangerouslySetInnerHTML={{
                        __html: formData ? formData.modelUI : "",
                      }}
                    />
                  </TabPane>
                  <TabPane tabId="inputFields">
                    {formData && renderFormField()}
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default FormDetail;
