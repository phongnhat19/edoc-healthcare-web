import React, { useState } from "react";

import { Button, Col, Row, Modal } from "reactstrap";
import NewActivityModal from "./NewActivityModal";
import { getFormattedDate } from "../../../../utils/date";

const DocActivity = ({ activityList }: { activityList: any }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const toggle = () => setModalOpened(!modalOpened);

  return (
    <>
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
            {activityList.map((activity: any, index: number) => {
              const activityTime = new Date(activity.recordingTime);
              return (
                <div className="timeline-item" key={`activity-${index}`}>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon" />
                    <h4 className="timeline-item--label mb-2 font-weight-bold">
                      {getFormattedDate(activityTime)}
                    </h4>
                    <p>{activity.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DocActivity;
