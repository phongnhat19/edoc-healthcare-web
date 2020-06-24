import React, { useState, useContext } from "react";
import cloudinary from "cloudinary";
import {
  Row,
  Col,
  Button,
  Input,
  FormFeedback,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";

import {
  getActivityRawTX,
  sendSignedActivityTX,
} from "../../../../services/api/doc";
import {
  CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_URL,
} from "../../../../services/api/constant";

import { useDropzone } from "react-dropzone";
import DescriptionTable from "./DescriptionTable";
import { UserContext } from "../../../../App";
import "../style.css";

const NewActivityModal = ({ toggle }: { toggle: () => void }) => {
  const [name, setName] = useState("");
  const [formNameError, setFormNameError] = useState("");
  const [recordingTime, setRecordingTime] = useState("");
  const [formRecordingTimeError, setFormRecordingTimeError] = useState("");
  const [recordingPerson, setRecordingPerson] = useState("");
  const [formRecordingPersonError, setFormRecordingPersonError] = useState("");
  const [recordingPlace, setRecordingPlace] = useState("");
  const [formRecordingPlaceError, setFormRecordingPlaceError] = useState("");
  const [status, setStatus] = useState("");
  const [formStatusError, setFormStatusError] = useState("");
  const [statusBackground, setStatusBackground] = useState("#666666");
  const [notes, setNotes] = useState("");
  const [formNotesError, setFormNotesError] = useState("");
  const [images, setImages] = useState(
    [] as { file: File | string; title: string }[]
  );
  const [formImagesError, setFormImagesError] = useState("");
  const [formImageTitleError, setFormImageTitleError] = useState("");
  const [description, setDescription] = useState([
    { key: "", value: "" },
  ] as DescriptionField[]);
  const [formDescriptionError, setFormDescriptionError] = useState("");

  const { token } = useContext(UserContext);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 2000,
  });

  const selectedFileHandler = (e: any) => {
    let newImages = [];
    for (let file of e.target.files) {
      newImages.push({ file, title: "" });
    }
    setFormImagesError("");
    setImages([...images, ...newImages]);
  };

  const imageTitleHandler = (event: any, index: number) => {
    const newImages = [...images];
    newImages[index].title = event.target.value;
    setImages(newImages);
  };

  const activityFormValidate = () => {
    let isValid = true;
    const INVALID = "không được để trống";
    if (name === "") {
      setFormNameError("Tên" + INVALID);
      isValid = false;
    }
    if (recordingTime === "") {
      setFormRecordingTimeError("Thời gian " + INVALID);
      isValid = false;
    }
    if (recordingPlace === "") {
      setFormRecordingPlaceError("Nơi cấp " + INVALID);
      isValid = false;
    }
    if (recordingPerson === "") {
      setFormRecordingPersonError("Người cấp " + INVALID);
      isValid = false;
    }
    if (notes === "") {
      setFormNotesError("Ghi chú " + INVALID);
      isValid = false;
    }
    if (status === "") {
      setFormStatusError("Trạng thái " + INVALID);
      isValid = false;
    }
    if (images.length === 0) {
      setFormImagesError("Phải tải lên hình ảnh");
      isValid = false;
    }
    if (images.length > 0) {
      images.forEach((file) => {
        if (file.title === "") {
          setFormImageTitleError("Tiêu đề ảnh " + INVALID);
          isValid = false;
        }
      });
    }
    description.forEach((des) => {
      if (des.key === "" || des.value) {
        setFormDescriptionError(INVALID);
        isValid = false;
      }
    });
    return isValid;
  };

  const filesUploadHandler = () => {
    console.log(images[0].file);
    console.log(URL.createObjectURL(images[0].file));
  };

  const submitHandler = () => {
    const isValid = activityFormValidate();
    if (!isValid) return;
    filesUploadHandler();
  };

  return (
    <>
      <ModalHeader toggle={toggle}>
        <b>Thêm hoạt động</b>
      </ModalHeader>
      <ModalBody>
        {/* <Row>
          <Col>

          </Col>
        </Row> */}
        <Row>
          {/* name */}
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
              onChange={(e) => setName(e.target.value)}
            />
            <FormFeedback>{formNameError}</FormFeedback>
          </Col>

          {/* recordingTime */}
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
            <Input
              type="text"
              name="recordingTime"
              value={recordingTime}
              invalid={recordingTime === "" && formRecordingTimeError !== ""}
              onChange={(e) => setRecordingTime(e.target.value)}
            />
            <FormFeedback>{formRecordingTimeError}</FormFeedback>
          </Col>
        </Row>

        <Row className="mt-4">
          {/* recordingPerson */}
          <Col
            xs="12"
            lg="2"
            className="d-flex justify-content-lg-end align-items-center"
          >
            Người Cấp
          </Col>
          <Col
            xs="12"
            lg="4"
            className="d-flex justify-content-lg-end align-items-center flex-column"
          >
            <Input
              type="text"
              name="recordingPerson"
              value={recordingPerson}
              invalid={
                recordingPerson === "" && formRecordingPersonError !== ""
              }
              onChange={(e) => setRecordingPerson(e.target.value)}
            />
            <FormFeedback>{formRecordingPersonError}</FormFeedback>
          </Col>

          {/* recordingPlace */}
          <Col
            xs="12"
            lg="2"
            className="d-flex justify-content-lg-end align-items-center"
          >
            Nơi cấp
          </Col>
          <Col
            xs="12"
            lg="4"
            className="d-flex justify-content-lg-end align-items-center flex-column"
          >
            <Input
              type="text"
              name="recordingPlace"
              value={recordingPlace}
              invalid={recordingPlace === "" && formRecordingPlaceError !== ""}
              onChange={(e) => setRecordingPlace(e.target.value)}
            />
            <FormFeedback>{formRecordingPlaceError}</FormFeedback>
          </Col>
        </Row>
        <Row className="mt-4">
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
              onChange={(e) => setNotes(e.target.value)}
            />
            <FormFeedback>{formNotesError}</FormFeedback>
          </Col>
        </Row>
        {/* Status section */}
        <Row className="mt-5">
          <Col
            className="d-flex justify-content-lg-end align-items-center"
            xs="12"
            lg="2"
          >
            <b>Trạng thái</b>
          </Col>
          <Col xs="12" lg="10" />
        </Row>
        <div className="divider" />

        <Row className="mt-4">
          {/* recordingPerson */}
          <Col
            xs="12"
            lg="2"
            className="d-flex justify-content-lg-end align-items-center"
          >
            Trạng thái
          </Col>
          <Col
            xs="12"
            lg="4"
            className="d-flex justify-content-lg-end align-items-center flex-column"
          >
            <Input
              type="text"
              name="status"
              value={status}
              invalid={status === "" && formStatusError !== ""}
              onChange={(e) => setStatus(e.target.value)}
            />
            <FormFeedback>{formStatusError}</FormFeedback>
          </Col>
          {/* recordingPlace */}
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
              onChange={(e) => setStatusBackground(e.target.value)}
            />
          </Col>
        </Row>

        {/* Images section */}
        <Row className="mt-5">
          <Col
            className="d-flex justify-content-lg-start align-items-center"
            xs="12"
            lg="12"
          >
            <div>
              <b>Hình ảnh</b>
            </div>
          </Col>
          <Col xs="12" lg="10" />
        </Row>
        <div className="divider" />
        <Row>
          <Col>
            <div>
              <Input
                invalid={images.length !== 0 && formImagesError !== ""}
                hidden
              />
              <FormFeedback>{formImagesError}</FormFeedback>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          {images.length > 0 &&
            images.map((image: any, idx) => (
              <Col key={`${idx}-images`} xs="6" lg="4" className="mt-4">
                <div>
                  <img
                    className="img-box border rounded-sm"
                    src={URL.createObjectURL(image.file)}
                    alt={image.file.name}
                  />
                </div>
                <div className="mt-2">
                  <Input
                    type="text"
                    placeholder="Tiêu đề"
                    value={image.title}
                    invalid={
                      images[idx].title === "" && formImageTitleError !== ""
                    }
                    onChange={(e) => imageTitleHandler(e, idx)}
                  />
                  <FormFeedback>{formImageTitleError}</FormFeedback>
                </div>
              </Col>
            ))}
          <Col
            xs="2"
            lg="4"
            className="d-flex justify-content-lg-start align-items-center flex-column mt-4"
          >
            <div>
              <b>Thêm ảnh mới</b>
            </div>
            <div className="dropzone d-block w-100 px-2 mt-2">
              <div {...getRootProps({ className: "dropzone-upload-wrapper" })}>
                <input
                  multiple
                  {...getInputProps()}
                  onChange={selectedFileHandler}
                />
                <div className="dropzone-inner-wrapper p-4">
                  <small className="py-2 text-black-50">(png/jpeg)</small>
                  <div className="mt-2">
                    <Button
                      color="primary"
                      className="hover-scale-sm d-block font-weight-bold btn-pill px-2"
                    >
                      <span className="px-2">Chọn tệp</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Description section */}
        <Row className="mt-4">
          <Col>
            <DescriptionTable
              formDescriptionError={formDescriptionError}
              descriptionUpdateHandler={(newDescription: DescriptionField[]) =>
                setDescription(newDescription)
              }
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Button color="danger" onClick={toggle}>
          Hủy
        </Button>{" "}
        <Button color="primary" onClick={submitHandler}>
          Tạo
        </Button>
      </ModalFooter>
    </>
  );
};

export default NewActivityModal;
