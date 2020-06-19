import { toast, ToastContainer } from "react-toastify";
import React, { useEffect, useContext, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { getAllUsers } from "../../../services/api/user";
import { UserContext } from "../../../App";
import {
  getFormDetail,
  revokeFormAccess,
  grantFormAccess,
} from "../../../services/api/form";
import Select from "react-dropdown-select";
import { ClipLoader } from "react-spinners";

const PermissionModal = ({
  isOpen,
  toggle,
  formID,
}: {
  isOpen: boolean;
  toggle: () => void;
  formID: string;
}) => {
  const { token } = useContext(UserContext);
  const [userList, setUserList] = useState([] as User[]);
  const [userWithPermission, setUserWithPermission] = useState([] as User[]);
  const [initUserWithPermission, setInitUserWithPermission] = useState(
    [] as string[]
  );
  const [formBlockchainID, setFormBlockchainID] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isOpen) setLoading(true);
  }, [isOpen]);

  useEffect(() => {
    setLoading(true);
    getAllUsers({ page: 1, limit: 100, token }).then(({ data }) => {
      setUserList(data);
    });
  }, [token]);

  useEffect(() => {
    formID &&
      getFormDetail({ formID, token }).then((form) => {
        setInitUserWithPermission([...form.grantedFor]);
        const userObjList = form.grantedFor.map((userID) => {
          return userList.filter((user) => user._id === userID)[0];
        });
        setUserWithPermission(userObjList);
        setFormBlockchainID(form.blockchainId);
        setLoading(false);
      });
  }, [formID, token, userList]);

  const handleSubmit = () => {
    setFetching(true);
    const userIDToRemove = initUserWithPermission.filter((userID) => {
      return userWithPermission.every((userObj) => userObj._id !== userID);
    });
    const userIDToAdd = userWithPermission
      .filter((userObj) => {
        return initUserWithPermission.every((userID) => userID !== userObj._id);
      })
      .map((userObj) => userObj._id);

    revokeFormAccess({ formBlockchainID, userIDs: userIDToRemove, token })
      .then(() =>
        grantFormAccess({ formBlockchainID, userIDs: userIDToAdd, token })
      )
      .then(() => {
        toast.success("Cấp quyền thành công");
        setFetching(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        setFetching(false);
      });
  };

  return (
    <Modal zIndex={2000} scrollable centered isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Cấp quyền sử dụng mẫu</ModalHeader>
      <ModalBody style={{ minHeight: "300px" }}>
        <ToastContainer />
        {loading ? (
          <div className="d-flex align-item-center justify-content-center">
            <ClipLoader />
          </div>
        ) : (
          <Select
            options={userList}
            placeholder="Tìm user..."
            addPlaceholder="Chọn user để cấp quyền"
            searchable={true}
            multi={true}
            labelField="name"
            valueField="_id"
            searchBy="name"
            values={userWithPermission}
            onChange={setUserWithPermission}
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          disabled={fetching}
          className="btn-link-dark mr-3"
          onClick={toggle}
        >
          Đóng
        </Button>
        <Button
          color="primary"
          className="ml-auto"
          onClick={handleSubmit}
          disabled={fetching}
        >
          {fetching ? (
            <span
              className="btn-wrapper--icon spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Cập nhật"
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PermissionModal;
