import React, { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Row,
  Col,
} from "reactstrap";

const NewUserPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");

  const ROLES = [
    { id: "0", name: "admin" },
    { id: "1", name: "organization" },
    { id: "2", name: "staff" },
    { id: "3", name: "personal user" },
  ];

  const createYearRange = () => {
    const START = 1945;
    const END = 2020;
    let yearRange: any[] = [];
    for (let i = START; i < END; i++) {
      yearRange.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return yearRange;
  };
  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
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
                Role
              </Col>
              <Col xs="12" lg="4">
                <Input
                  type="select"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {ROLES.map((role: any) => {
                    return (
                      <option value={role.id} key={role.id}>
                        {role.name}
                      </option>
                    );
                  })}
                </Input>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col
                xs="12"
                lg="2"
                className="d-flex justify-content-lg-end align-items-center"
              >
                Email
              </Col>
              <Col xs="12" lg="4">
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col
                xs="12"
                lg="2"
                className="d-flex justify-content-lg-end align-items-center"
              >
                Mật khẩu
              </Col>
              <Col xs="12" lg="4">
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col
                xs="12"
                lg="2"
                className="d-flex justify-content-lg-end align-items-center"
              >
                Giới tính
              </Col>
              <Col xs="12" lg="4">
                <Input
                  type="select"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option key="0" value="0">
                    Nam
                  </option>
                  <option key="0" value="0">
                    Nữ
                  </option>
                </Input>
              </Col>
              <Col
                xs="12"
                lg="2"
                className="d-flex justify-content-lg-end align-items-center"
              >
                Năm Sinh
              </Col>
              <Col xs="12" lg="4">
                <Input
                  type="select"
                  name="yearOfBirth"
                  value={yearOfBirth}
                  onChange={(e) => setYearOfBirth(e.target.value)}
                >
                  {createYearRange()}
                </Input>
              </Col>
            </Row>
            <Row className="justify-content-center mt-4">
              <Col
                xs="12"
                lg="2"
                className="d-flex justify-content-lg-end align-items-center"
              >
                Địa chỉ
              </Col>
              <Col xs="12" lg="10">
                <Input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>
            </Row>
            {/* <UncontrolledAlert className="mt-4" color="danger">
              <span>Các mục không được để trống</span>
            </UncontrolledAlert> */}
          </CardBody>
          <div className="divider" />
          <CardFooter className="d-flex justify-content-end">
            <Button size="sm" outline color="primary" className="py-2 px-4">
              Hủy
            </Button>
            &nbsp;
            <Button size="sm" className="py-2 px-4" color="primary">
              Tạo
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewUserPage;
