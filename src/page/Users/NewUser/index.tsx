import React, { useState, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";

import { generateEOA, symEncrypt } from "../../../utils/blockchain";
import { signUpForStaff } from "../../../services/api/user";
import { UserContext } from "../../../App";

const ROLES = [
  { id: "0", name: "admin" },
  { id: "1", name: "organization" },
  { id: "2", name: "staff" },
  { id: "3", name: "personal user" },
];
const STAFF_ROLE_ID = "2";

const userEOA = generateEOA();
const bcAddress = userEOA.address;
const { privateKey } = userEOA;
const clientPassphrase = "my_password_hash"; // Currently client passphrase will be 'my_password_hash' for every user
const privateEncrypted = symEncrypt(privateKey, clientPassphrase);

console.log(bcAddress, privateEncrypted);

const NewUserPage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("0");
  const [yearOfBirth, setYearOfBirth] = useState("1945");
  const [formError, setFormError] = useState("");

  const {token} = useContext(UserContext);

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

  const setError = () => {
    setFormError("Không được để trống");
    return false;
  };

  const checkValidation = (): boolean => {
    let isValid = true;
    if (name === "") isValid = setError();
    if (userName === "" && role.id === STAFF_ROLE_ID) isValid = setError();
    if (email === "") isValid = setError();
    if (password === "") isValid = setError();
    if (address === "") isValid = setError();

    return isValid;
  };

  const submitHandle = async () => {
    const isValid = checkValidation();
    if (!isValid) return;

    if (role.id === STAFF_ROLE_ID) {
      signUpForStaff({
        username: userName,
        name,
        password,
        bcAddress,
        privateEncrypted,
        token,
      }).then((response) => {
        window.location.href = "/users/list";
      })
      .catch((error) => console.log(error))

    }
  };

  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        <Card>
          <CardHeader>
            <div className="card-header--title">
              <b className="d-block text-uppercase mt-1">Tạo nhân viên mới</b>
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
                  invalid={formError !== "" && name === ""}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormFeedback>{formError}</FormFeedback>
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
                  value={role.id}
                  onChange={(e) =>
                    setRole({ id: e.target.value, name: role.name })
                  }
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
            {role.id === STAFF_ROLE_ID && (
              <Row className="justify-content-center mt-4">
                <Col
                  xs="12"
                  lg="2"
                  className="d-flex justify-content-lg-end align-items-center"
                >
                  User name
                </Col>
                <Col xs="12" lg="10">
                  <Input
                    type="text"
                    name="userName"
                    value={userName}
                    invalid={formError !== "" && userName === ""}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <FormFeedback>{formError}</FormFeedback>
                </Col>
              </Row>
            )}
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
                  invalid={formError !== "" && email === ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormFeedback>{formError}</FormFeedback>
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
                  invalid={formError !== "" && password === ""}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormFeedback>{formError}</FormFeedback>
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
                  <option key="1" value="1">
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
                  invalid={formError !== "" && address === ""}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormFeedback>{formError}</FormFeedback>
              </Col>
            </Row>
            {/* <UncontrolledAlert className="mt-4" color="danger">
              <span>Các mục không được để trống</span>
            </UncontrolledAlert> */}
          </CardBody>
          <div className="divider" />
          <CardFooter className="d-flex justify-content-end">
            <Button
              size="sm"
              color="danger"
              className="py-2 px-4 mr-3"
              onClick={() => window.history.back()}
            >
              Hủy
            </Button>
            <Button
              size="sm"
              className="py-2 px-4"
              color="primary"
              onClick={submitHandle}
            >
              Tạo
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewUserPage;
