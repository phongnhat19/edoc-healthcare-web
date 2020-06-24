import React, { useState } from "react";
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
} from "reactstrap";
import clsx from "clsx";
import DocInfo from "./components/DocInfo";
import DocActivity from "./components/DocActivity";
import { useParams } from "react-router-dom";

const DocDetailPage = () => {
  const { docId } = useParams();
  const [activeTab, setActiveTab] = useState("information");
  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        <Row>
          <Col>
            <Card>
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
                            <DocInfo docId={docId} />
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="activity">
                        <Row>
                          <Col sm="12">
                            <DocActivity docId={docId} />
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
