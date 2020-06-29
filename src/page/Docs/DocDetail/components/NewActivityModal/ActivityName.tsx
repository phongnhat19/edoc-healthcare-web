import React from "react";
import { Col, Input, FormFeedback } from "reactstrap";

const ActivityName = ({
  name,
  onChange,
  formNameError,
}: {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formNameError: string;
}) => {
  return (
    <React.Fragment>
      <Col
        xs="12"
        lg="2"
        className="d-flex justify-content-lg-end align-items-center"
      >
        Nội dung
      </Col>
      <Col
        xs="12"
        lg="4"
        className="d-flex justify-content-lg-end align-items-center flex-column"
      >
        <Input
          type="text"
          name="name"
          value={name}
          invalid={name === "" && formNameError !== ""}
          onChange={onChange}
        />
        <FormFeedback>{formNameError}</FormFeedback>
      </Col>
    </React.Fragment>
  );
};

export default ActivityName;
