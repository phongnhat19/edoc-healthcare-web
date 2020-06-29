import React from "react";
import { Col } from "reactstrap";
import DatePicker from "react-datepicker";
import vi from "date-fns/locale/vi";

const ActivityTime = ({
  recordingTime,
  onChange,
}: {
  recordingTime: Date;
  onChange: (
    date: Date | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => void;
}) => {
  return (
    <React.Fragment>
      <Col
        xs="12"
        lg="2"
        className="d-flex justify-content-lg-end align-items-center"
      >
        Thời gian
      </Col>
      <Col
        xs="12"
        lg="4"
        className="d-flex justify-content-lg-end align-items-center flex-column"
      >
        <DatePicker
          className="form-control"
          selected={recordingTime}
          onChange={onChange}
          locale={vi}
          dateFormat="dd/MM/yyyy"
        />
      </Col>
    </React.Fragment>
  );
};

export default ActivityTime;
