import React from "react";
import { Col, Input, FormFeedback } from "reactstrap";

const FormName = ({
  formName,
  setFormName,
  formNameError,
}: {
  formName: string;
  formNameError: string;
  setFormName: (newFormName: string) => void;
}) => {
  return (
    <React.Fragment>
      <Col xs="12" lg="2" className="d-flex align-items-center">
        Tên mẫu
      </Col>
      <Col xs="12" lg="6">
        <Input
          type="text"
          name="formName"
          value={formName}
          invalid={formNameError !== ""}
          onChange={(e) => setFormName(e.target.value)}
        />
        <FormFeedback>{formNameError}</FormFeedback>
      </Col>
    </React.Fragment>
  );
};

export default FormName;
