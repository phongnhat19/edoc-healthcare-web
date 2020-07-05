import React from "react";
import { Col, Input, FormFeedback } from "reactstrap";

const ActivityRecordingPerson = ({
  recordingPerson,
  formRecordingPersonError,
  onChange,
}: {
  formRecordingPersonError: string;
  recordingPerson: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <React.Fragment>
      <Col
        xs="12"
        lg="2"
        className="d-flex justify-content-lg-end align-items-center"
      >
        Người Cấp
      </Col>
      <Col
        xs="12"
        lg="4"
        className="d-flex justify-content-lg-end align-items-center flex-column"
      >
        <Input
          type="text"
          name="recordingPerson"
          value={recordingPerson}
          invalid={recordingPerson === "" && formRecordingPersonError !== ""}
          onChange={onChange}
        />
        <FormFeedback>{formRecordingPersonError}</FormFeedback>
      </Col>
    </React.Fragment>
  );
};

export default ActivityRecordingPerson;
