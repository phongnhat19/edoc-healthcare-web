import React from "react";
import { Col, Input } from "reactstrap";

const ActivityStatusBackground = ({
  statusBackground,
  onChange,
}: {
  statusBackground: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <React.Fragment>
      <Col
        xs="12"
        lg="2"
        className="d-flex justify-content-lg-end align-items-center"
      >
        Màu nền
      </Col>
      <Col
        xs="12"
        lg="4"
        className="d-flex justify-content-lg-end align-items-center"
      >
        <Input
          type="color"
          name="statusBackground"
          value={statusBackground}
          onChange={onChange}
        />
      </Col>
    </React.Fragment>
  );
};

export default ActivityStatusBackground;
