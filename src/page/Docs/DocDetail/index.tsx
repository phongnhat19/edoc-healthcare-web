import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink as NavLinkStrap,
  Row,
  TabContent,
  TabPane,
  CardHeader,
} from "reactstrap";
import clsx from "clsx";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import DocInfo from "./components/DocInfo";
import DocActivity from "./components/DocActivity";
import { UserContext } from "../../../App";
import { getDocById } from "../../../services/api/doc";
import { getFormDetail } from "../../../services/api/form";

const DocDetailPage = () => {
  const { docId } = useParams();
  const { token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [docInfo, setDocInfo] = useState({} as Doc);
  const [formDetail, setFormDetail] = useState({} as Form);

  const [activeTab, setActiveTab] = useState("information");
  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getDocById({ token, docId }).then((docRes) => {
      setDocInfo(docRes);
      const formID = docRes.docModel._id || "";
      getFormDetail({ token, formID }).then((docModelRes) => {
        setFormDetail(docModelRes);
        setLoading(false);
      });
    });
  }, [docId, token]);

  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div className="card-header--title">
                  <b className="d-block text-uppercase mt-1">
                    <Link to="/documents/list">Danh sách hồ sơ</Link> /{" "}
                    {docInfo.name}
                  </b>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col span={12}>
                    <Nav tabs>
                      <NavItem>
                        <NavLinkStrap
                          className={clsx({
                            active: activeTab === "information",
                          })}
                          onClick={() => {
                            toggle("information");
                          }}
                        >
                          Thông tin
                        </NavLinkStrap>
                      </NavItem>
                      <NavItem>
                        <NavLinkStrap
                          className={clsx({ active: activeTab === "activity" })}
                          onClick={() => {
                            toggle("activity");
                          }}
                        >
                          Hoạt động
                        </NavLinkStrap>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col span={12}>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="information">
                        <Row>
                          <Col sm="12">
                            {loading ? (
                              <ClipLoader />
                            ) : (
                              <DocInfo
                                docInfo={docInfo}
                                formDetail={formDetail}
                              />
                            )}
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="activity">
                        <Row>
                          <Col sm="12">
                            {loading ? (
                              <ClipLoader />
                            ) : (
                              <DocActivity activityList={docInfo.activities} />
                            )}
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DocDetailPage;
