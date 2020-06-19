// import Select from "react-dropdown-select";
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const PermissionModal = ({
  isOpen,
  toggle,
  formID,
}: {
  isOpen: boolean;
  toggle: () => void;
  formID: string;
}) => {
  return (
    <Modal zIndex={2000} scrollable centered isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Cấp quyền sử dụng mẫu</ModalHeader>
      <ModalBody>{formID}</ModalBody>
      <ModalFooter>
        <Button color="danger" className="btn-link-dark mr-3" onClick={toggle}>
          Huỷ
        </Button>
        <Button color="primary" className="ml-auto">
          Cập nhật
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PermissionModal;
