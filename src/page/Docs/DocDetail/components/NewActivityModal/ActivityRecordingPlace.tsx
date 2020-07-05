import React from "react";
import { Col, Input, FormFeedback } from "reactstrap";

const ActivityRecordingPlace = ({
  recordingPlace,
  formRecordingPlaceError,
  onChange,
}: {
  formRecordingPlaceError: string;
  recordingPlace: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <React.Fragment>
      <Col
        xs="12"
        lg="2"
        className="d-flex justify-content-lg-end align-items-center"
      >
        Nơi cấp
      </Col>
      <Col
        xs="12"
        lg="4"
        className="d-flex justify-content-lg-end align-items-center flex-column"
      >
        <Input
          type="text"
          name="recordingPlace"
          value={recordingPlace}
          invalid={recordingPlace === "" && formRecordingPlaceError !== ""}
          onChange={onChange}
        />
        <FormFeedback>{formRecordingPlaceError}</FormFeedback>
      </Col>
    </React.Fragment>
  );
};

export default ActivityRecordingPlace;
