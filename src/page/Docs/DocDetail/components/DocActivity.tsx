import React, { useState, useContext, useEffect } from "react";

import { Button, Col, Row, Modal } from "reactstrap";
import { UserContext } from "../../../../App";
import { getDocActivities } from "../../../../services/api/doc";

import avatar1 from "../../../../assets/images/avatars/avatar1.jpg";
import avatar2 from "../../../../assets/images/avatars/avatar2.jpg";
import avatar6 from "../../../../assets/images/avatars/avatar6.jpg";
import people3 from "../../../../assets/images/stock-photos/people-3.jpg";
import people1 from "../../../../assets/images/stock-photos/people-1.jpg";
import NewActivityModal from "./NewActivityModal";

const DocActivity = ({ docId }: { docId: string }) => {
  const { token } = useContext(UserContext);
  const [modalOpened, setModalOpened] = useState(false);

  const toggle = () => setModalOpened(!modalOpened);

  useEffect(() => {
    getDocActivities({ docId, token }).then((res) => console.log(res));
  }, [docId]);

  return (
    <>
      {/* Add new activity with modal */}
      <Row>
        <Col>
          <Button color="primary" onClick={() => setModalOpened(true)}>
            Thêm hoạt động
          </Button>
        </Col>
        <Col>
          <Modal
            zIndex={2000}
            centered
            isOpen={modalOpened}
            toggle={toggle}
            backdrop={"static"}
            size="lg"
          >
            <NewActivityModal toggle={toggle} />
          </Modal>
        </Col>
      </Row>

      <div className="divider mt-4" />
      <Row className="mt-4">
        <Col lg="4">
          <div className="timeline-list mb-5">
            <div className="timeline-item">
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  1991
                </h4>
                <p>The World Wide Web goes live with its first web page.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Java exam day
                </h4>
                <p>Bill Clinton's presidential scandal makes it online.</p>
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
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Business investor meeting
                </h4>
                <p>
                  Mosaic, the first graphical browser, is introduced to the
                  average consumer.
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
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  Learning round table gathering
                </h4>
                <p>First ever iPod launches.</p>
                <div className="mt-2">
                  <Button size="sm" color="primary">
                    Submit Report
                  </Button>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-item--content">
                <div className="timeline-item--icon" />
                <h4 className="timeline-item--label mb-2 font-weight-bold">
                  2003
                </h4>
                <p>MySpace becomes the most popular social network.</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DocActivity;
