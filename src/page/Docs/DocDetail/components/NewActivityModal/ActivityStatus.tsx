import React from "react";
import { Col, Input, FormFeedback } from "reactstrap";

const ActivityStatus = ({
  status,
  formStatusError,
  onChange,
}: {
  formStatusError: string;
  status: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <React.Fragment>
      <Col
        xs="12"
        lg="2"
        className="d-flex justify-content-lg-end align-items-center"
      >
        Trạng thái
      </Col>
      <Col
        xs="12"
        lg="4"
        className="d-flex justify-content-lg-end align-items-center flex-column"
      >
        <Input
          type="text"
          name="status"
          value={status}
          invalid={status === "" && formStatusError !== ""}
          onChange={onChange}
        />
        <FormFeedback>{formStatusError}</FormFeedback>
      </Col>
    </React.Fragment>
  );
};

export default ActivityStatus;
