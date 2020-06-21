import React from "react";
import { Col, Input } from "reactstrap";
import { getFormattedDate } from "../../../../utils/date";

const CreatedDate = () => {
  return (
    <React.Fragment>
      <Col xs="12" lg="2" className="d-flex align-items-center">
        Ngày tạo
      </Col>
      <Col xs="12" lg="2">
        <Input type="text" value={getFormattedDate(new Date())} disabled />
      </Col>
    </React.Fragment>
  );
};

export default CreatedDate;
