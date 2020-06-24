import React, { useContext } from "react";
import { Col, Input } from "reactstrap";
import { UserContext } from "../../../../App";

const Creator = () => {
  const { userData } = useContext(UserContext);
  return (
    <React.Fragment>
      <Col xs="12" lg="2" className="d-flex align-items-center">
        Người tạo
      </Col>
      <Col xs="12" lg="2">
        <Input type="text" value={userData.name} disabled />
      </Col>
    </React.Fragment>
  );
};

export default Creator;
