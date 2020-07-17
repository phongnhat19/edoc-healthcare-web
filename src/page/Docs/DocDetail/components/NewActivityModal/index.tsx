import React, { useState, useContext } from "react";
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
import ActivityName from "./ActivityName";
import Swal from "sweetalert2";

import {
  getActivityRawTX,
  sendSignedActivityTX,
} from "../../../../../services/api/doc";

import { useDropzone } from "react-dropzone";
import DescriptionTable from "./DescriptionTable";
import { UserContext } from "../../../../../App";
import "../../style.css";
import ActivityTime from "./ActivityTime";
import ActivityRecordingPerson from "./ActivityRecordingPerson";
import ActivityRecordingPlace from "./ActivityRecordingPlace";
import ActivityNote from "./ActivityNote";
import ActivityStatus from "./ActivityStatus";
import ActivityStatusBackground from "./ActivityStatusBackground";
import { useParams } from "react-router";
import { getDocById } from "../../../../../services/api/doc";
import {
  symDecrypt,
  getClientPassphrase,
  getSignedTx,
} from "../../../../../utils/blockchain";

const NewActivityModal = ({ toggle }: { toggle: () => void }) => {
  const { docId } = useParams();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [formNameError, setFormNameError] = useState("");
  const [recordingTime, setRecordingTime] = useState(new Date());
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
    [] as ImageField[]
  );
  const [formImagesError, setFormImagesError] = useState("");
  const [formImageTitleError, setFormImageTitleError] = useState("");

  const [descriptions, setDescriptions] = useState([
    { key: "", value: "" },
  ] as DescriptionField[]);
  const [formDescriptionError, setFormDescriptionError] = useState("");

  const addDescription = () => {
    const newDescriptions = [...descriptions, { key: "", value: "" }];
    setDescriptions(newDescriptions);
  };

  const removeDescription = (index: number) => {
    if (descriptions.length === 1) return;
    const newDescriptions = descriptions.filter((des, idx) => idx !== index);
    setDescriptions(newDescriptions);
  };

  const { token, userData } = useContext(UserContext);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    maxSize: 2000,
  });

  const imageFileChangeHandler = async (e: any) => {
    let newImages: ImageField[] = [...images];
    const files = e.target.files;
    if (files.length > 0) {
      for (let file of e.target.files) {
        const base64 = (await toBase64(file)) as string;
        newImages.push({ data: base64, title: "" });
      }
      setImages(newImages);
    }
  };

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const imageTitleHandler = (event: any, index: number) => {
    const newImages = [...images];
    newImages[index].title = event.target.value;
    setImages(newImages);
  };

  const validate = () => {
    let isValid = true;
    const INVALID = "không được để trống";
    if (name === "") {
      setFormNameError("Tên " + INVALID);
      isValid = false;
    }
    if (notes === "") {
      setFormNotesError("Ghi chú " + INVALID);
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
    descriptions.forEach((des) => {
      if (des.key === "" || !des.value) {
        setFormDescriptionError(INVALID);
        isValid = false;
      }
    });
    return isValid;
  };

  const submitHandler = async () => {
    const isValid = validate();
    if (!isValid) return;

    const docDetail = await getDocById({ docId, token });
    const activityForm = {
      docId: docDetail.blockchainId,
      name,
      recordingTime: recordingTime.toUTCString(),
      recordingPerson,
      recordingPlace,
      status: {
        name: status,
        backgroundColor: statusBackground,
      },
      images,
      note: notes,
      description: descriptions,
    };

    setCreating(true);
    try {
      const { rawTx, sessionKey } = await getActivityRawTX({
        token,
        activityForm,
      });
      const decryptedPrivateKey = symDecrypt(
        userData.privateEncrypted,
        getClientPassphrase(userData._id)
      );
      const signedTx = getSignedTx(rawTx, decryptedPrivateKey);
      await sendSignedActivityTX({ token, sessionKey, signedTx });
      setCreating(false);
      toggle();
      Swal.fire({
        title: "Thành công",
        text: "Hoạt động mới đã được thêm.",
        type: "success",
        confirmButtonText: "OK",
      }).then(() => window.location.reload());
    } catch (error) {
      setCreating(false);
      Swal.fire({
        title: "Oops",
        text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        type: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  return (
    <>
      <ModalHeader toggle={toggle}>
        <b>Thêm hoạt động</b>
      </ModalHeader>
      <ModalBody>
        <Row>
          <ActivityName
            name={name}
            formNameError={formNameError}
            onChange={(e) => setName(e.target.value)}
          />
          <ActivityTime
            recordingTime={recordingTime}
            onChange={(newDate) => newDate && setRecordingTime(newDate)}
          />
        </Row>

        <Row className="mt-4">
          <ActivityRecordingPerson
            recordingPerson={recordingPerson}
            formRecordingPersonError={formRecordingPersonError}
            onChange={(e) => setRecordingPerson(e.target.value)}
          />
          <ActivityRecordingPlace
            recordingPlace={recordingPlace}
            formRecordingPlaceError={formRecordingPlaceError}
            onChange={(e) => setRecordingPlace(e.target.value)}
          />
        </Row>
        <Row className="mt-4">
          <ActivityNote
            formNotesError={formNotesError}
            notes={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Row>
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
          <ActivityStatus
            status={status}
            formStatusError={formStatusError}
            onChange={(e) => setStatus(e.target.value)}
          />
          <ActivityStatusBackground
            statusBackground={statusBackground}
            onChange={(e) => setStatusBackground(e.target.value)}
          />
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
            images.map((image, idx) => (
              <Col key={`${idx}-images`} xs="6" lg="4" className="mt-4">
                <div>
                  <img
                    className="img-box border rounded-sm"
                    src={image.data}
                    alt={`activity-${idx}`}
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
                  onChange={imageFileChangeHandler}
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
              removeDescription={removeDescription}
              descriptions={descriptions}
              addDescription={addDescription}
              formDescriptionError={formDescriptionError}
              setDescriptions={(newDescription: DescriptionField[]) =>
                setDescriptions(newDescription)
              }
            />
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-end">
        <Button color="danger" onClick={toggle} disabled={creating}>
          Hủy
        </Button>{" "}
        <Button color="primary" onClick={submitHandler} disabled={creating}>
          {creating ? (
            <span
              className="btn-wrapper--icon spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Tạo"
          )}
        </Button>
      </ModalFooter>
    </>
  );
};

export default NewActivityModal;
