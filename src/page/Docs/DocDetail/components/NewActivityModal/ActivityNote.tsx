import React from "react";
import { Col, Input, FormFeedback } from "reactstrap";

const ActivityNote = ({
  notes,
  formNotesError,
  onChange,
}: {
  formNotesError: string;
  notes: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <React.Fragment>
      <Col
        xs="12"
        lg="2"
        className="d-flex justify-content-lg-end align-items-center"
      >
        Ghi chú
      </Col>
      <Col
        xs="12"
        lg="10"
        className="d-flex justify-content-lg-end align-items-center flex-column"
      >
        <Input
          type="textarea"
          rows="3"
          name="notes"
          value={notes}
          invalid={notes === "" && formNotesError !== ""}
          onChange={onChange}
        />
        <FormFeedback>{formNotesError}</FormFeedback>
      </Col>
    </React.Fragment>
  );
};

export default ActivityNote;
