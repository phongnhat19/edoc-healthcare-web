import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardBody,
  CardFooter,
} from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";

import people1 from "../../assets/images/stock-photos/people-1.jpg";
import people3 from "../../assets/images/stock-photos/people-3.jpg";

import avatar1 from "../../assets/images/avatars/avatar1.jpg";
import avatar2 from "../../assets/images/avatars/avatar2.jpg";
import avatar6 from "../../assets/images/avatars/avatar6.jpg";

import { UserContext } from "../../App";
import { updateProfile } from "../../services/api/user";

const ProfilePage = () => {
  const { userData, token, updateUserProfile } = useContext(UserContext);
  const [nameUpdate, setNameUpdate] = useState(true);

  const [name, setName] = useState(userData.name);

  const handleUpdate = async () => {
    setNameUpdate(true);
    if (name === "" || name === userData.name) {
      setNameUpdate(false);
      return;
    };
    const userResponse = await updateProfile({ name, token });
    setNameUpdate(false);
    updateUserProfile(userResponse);
  };

  return (
    <>
      <div className="app-inner-content-layout">
        <div className="app-inner-content-layout--main">
          <Row>
            <Col lg="6">
              <Card className="card-box mb-5 w-100">
                <CardHeader>
                  <div className="card-header--title">
                    <b className="d-block text-uppercase mt-1">
                      Thông tin cá nhân
                    </b>
                  </div>
                  <div className="avatar-icon-wrapper avatar-initials shadow-none d-40 mr-0">
                    <div className="avatar-icon rounded">
                      <img src={userData.avatar} alt="..." />
                    </div>
                  </div>
                </CardHeader>
                <div className="divider" />
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={userData.email}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Role</Label>
                      <Input
                        type="text"
                        name="role"
                        value={userData.role}
                        disabled
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Tên</Label>
                      <Input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter className="p-3 text-center">
                  <Button size="sm" className="py-2 px-4" color="primary" 
                          onClick={handleUpdate}
                          disabled={nameUpdate}>
                    <span className="btn-wrapper--label text-uppercase font-weight-bold">
                      Cập nhật
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="6" className="d-flex">
              <Card className="card-box w-100 shadow-xxl mb-5">
                <CardHeader>
                  <div className="card-header--title">
                    <b className="d-block text-uppercase mt-1">
                      Lịch sử hoạt động
                    </b>
                  </div>
                </CardHeader>
                <div className="divider" />
                <div className="pl-3">
                  <div className="scroll-area shadow-overflow">
                    <PerfectScrollbar>
                      <div className="timeline-list timeline-list-offset timeline-list-offset-dot py-3">
                        <div className="timeline-item">
                          <div className="timeline-item-offset">12 Feb</div>
                          <div className="timeline-item--content">
                            <div className="timeline-item--icon" />
                            <h4 className="timeline-item--label mb-2 font-weight-bold">
                              <div className="badge badge-success">
                                sell/market
                              </div>
                            </h4>
                            <p>
                              You sold <b>12 ETH</b> for <b>3478 USD</b>.
                            </p>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-item-offset">11 Feb</div>
                          <div className="timeline-item--content">
                            <div className="timeline-item--icon" />
                            <h4 className="timeline-item--label mb-2 font-weight-bold">
                              Invite code sent
                            </h4>
                            <p>Your friends joined the platform.</p>
                            <div className="avatar-wrapper-overlap mt-2 mb-1">
                              <div className="avatar-icon-wrapper avatar-icon-sm">
                                <div className="avatar-icon">
                                  <img alt="..." src={avatar1} />
                                </div>
                              </div>
                              <div className="avatar-icon-wrapper avatar-icon-sm">
                                <div className="avatar-icon">
                                  <img alt="..." src={avatar2} />
                                </div>
                              </div>
                              <div className="avatar-icon-wrapper avatar-icon-sm">
                                <div className="avatar-icon">
                                  <img alt="..." src={avatar6} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-item-offset">9 Feb</div>
                          <div className="timeline-item--content">
                            <div className="timeline-item--icon" />
                            <h4 className="timeline-item--label mb-2 font-weight-bold">
                              Uploaded documents
                            </h4>
                            <p>
                              You uploaded the following documents onto the
                              crypto platform:
                            </p>
                            <div className="mt-3">
                              <a href="#/" onClick={(e) => e.preventDefault()}>
                                <img
                                  alt="..."
                                  className="img-fluid rounded mr-3 shadow-sm"
                                  src={people1}
                                  width="70"
                                />
                              </a>
                              <a href="#/" onClick={(e) => e.preventDefault()}>
                                <img
                                  alt="..."
                                  className="img-fluid rounded shadow-sm"
                                  src={people3}
                                  width="70"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-item-offset">9 Feb</div>
                          <div className="timeline-item--content">
                            <div className="timeline-item--icon" />
                            <h4 className="timeline-item--label mb-2 font-weight-bold">
                              Profile verification
                            </h4>
                            <p>
                              You partially submitted the required documents.
                            </p>
                            <div className="mt-2">
                              <Button size="sm" color="warning">
                                Submit remaining docs
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-item-offset">6 Feb</div>
                          <div className="timeline-item--content">
                            <div className="timeline-item--icon" />
                            <h4 className="timeline-item--label mb-2 font-weight-bold">
                              Joined bamburgh
                            </h4>
                            <p>
                              Welcome to the platform. Enjoy your stay here!
                            </p>
                          </div>
                        </div>
                      </div>
                    </PerfectScrollbar>
                  </div>
                </div>
                <div className="card-footer p-3 text-center">
                  <Button size="sm" className="py-2 px-4" color="primary">
                    <span className="btn-wrapper--label text-uppercase font-weight-bold">
                      Xem tất cả
                    </span>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
