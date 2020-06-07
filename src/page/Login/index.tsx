import React from "react";
import { Row, Col, Card, Container } from "reactstrap";

import hero6 from "../../assets/images/hero-bg/hero-1.jpg";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image opacity-6"
              style={{ backgroundImage: "url(" + hero6 + ")" }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-7" />
            <div className="bg-composed-wrapper--content p-3 p-md-5">
              <Container className="d-flex justify-content-center">
                <Card className="rounded-sm modal-content p-3 bg-white-10 col-sm-12 col-lg-8">
                  <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                    <Row className="no-gutters">
                      <Col
                        lg="12"
                        className="d-flex align-items-center justify-content-center flex-column"
                      >
                        <div className="text-center mt-4">
                          <h1 className="font-size-xxl mb-1 font-weight-bold">
                            Login
                          </h1>
                          <p className="mb-0 text-black-50">
                            Fill in the fields below to login to your account
                          </p>
                        </div>
                        <div className="py-4 col-sm-12 col-lg-6">
                          <LoginForm />
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Card>
              </Container>
            </div>
          </div>
          <div className="hero-footer w-100 pb-4">
            <Container>
              <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                <div className="text-center d-block mb-3 mb-md-0 text-white">
                  Copyright &copy; 2020 - VBC
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
