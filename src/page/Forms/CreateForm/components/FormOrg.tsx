import React from "react";
import { Col } from "reactstrap";
import Select from "react-dropdown-select";

const FormOrg = ({
  formOrg,
  orgList,
  setFormOrg,
}: {
  formOrg: string;
  orgList: Organization[];
  setFormOrg: (newOrg: string) => void;
}) => {
  return (
    <React.Fragment>
      <Col xs="12" lg="2" className="d-flex align-items-center">
        Tên mẫu
      </Col>
      <Col xs="12" lg="6">
        <Select
          options={orgList}
          placeholder="Chọn tổ chức..."
          searchable={true}
          labelField="name"
          valueField="_id"
          values={orgList.filter((org) => org._id === formOrg) as object[]}
          onChange={(values) => setFormOrg((values[0] as Organization)._id)}
        />
      </Col>
    </React.Fragment>
  );
};

export default FormOrg;
