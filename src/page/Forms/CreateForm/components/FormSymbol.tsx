import React from "react";
import { Col, Input, FormFeedback } from "reactstrap";

const FormSymbol = ({
  formSymbol,
  setFormSymbol,
  formSymbolError,
}: {
  formSymbol: string;
  formSymbolError: string;
  setFormSymbol: (newFormSymbol: string) => void;
}) => {
  return (
    <React.Fragment>
      <Col xs="12" lg="2" className="d-flex align-items-center">
        Ký hiệu
      </Col>
      <Col xs="12" lg="6">
        <Input
          type="text"
          name="formSymbol"
          value={formSymbol}
          invalid={formSymbolError !== ""}
          onChange={(e) => setFormSymbol(e.target.value)}
        />
        <FormFeedback>{formSymbolError}</FormFeedback>
      </Col>
    </React.Fragment>
  );
};

export default FormSymbol;
