import React from "react";
import { Row, Col, Input } from "reactstrap";

import { getFormattedDate } from "../../../../utils/date";

const DocInfo = ({
  docInfo,
  docModelDetail,
}: {
  docInfo: DocDetail;
  docModelDetail: any;
}) => {
  return (
    <>
      <Row className="justify-content-center">
        <Col
          xs="12"
          lg="2"
          className="d-flex justify-content-lg-end align-items-center"
        >
          Tên hồ sơ
        </Col>
        <Col xs="12" lg="10">
          <Input type="text" name="name" value={docInfo.name} disabled />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col
          xs="12"
          lg="2"
          className="d-flex justify-content-lg-end align-items-center"
        >
          Nơi cấp
        </Col>
        <Col xs="12" lg="4">
          <Input
            type="text"
            name="issuedPlace"
            value={docInfo.issuedPlace}
            disabled
          />
        </Col>
        <Col
          xs="12"
          lg="2"
          className="d-flex justify-content-lg-end align-items-center"
        >
          Ngày Cấp
        </Col>
        <Col xs="12" lg="4">
          <Input value={getFormattedDate(docInfo.issuedTime)} disabled />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col
          xs="12"
          lg="2"
          className="d-flex justify-content-lg-end align-items-center"
        >
          Loại
        </Col>
        <Col xs="12" lg="4">
          <Input type="text" name="type" value={docInfo.type} disabled />
        </Col>
        <Col
          xs="12"
          lg="2"
          className="d-flex justify-content-lg-end align-items-center"
        >
          Mẫu
        </Col>
        <Col xs="12" lg="4">
          <Input
            type="text"
            name="formId"
            value={docModelDetail.name}
            disabled
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col
          xs="12"
          lg="2"
          className="d-flex justify-content-lg-end align-items-center"
        >
          Mô tả
        </Col>
        <Col xs="12" lg="10">
          <Input
            type="textarea"
            name="description"
            value={docInfo.description}
            disabled
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col
          xs="12"
          lg="2"
          className="d-flex justify-content-lg-end align-items-center"
        >
          Link
        </Col>
        <Col xs="12" lg="10">
          <Input type="text" name="uri" value={docInfo.uri} disabled />
        </Col>
      </Row>
    </>
  );
};

export default DocInfo;
