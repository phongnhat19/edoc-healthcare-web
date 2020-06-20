import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faChevronLeft,
  faAngleDoubleRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
} from "reactstrap";
import { ClipLoader } from "react-spinners";

import { getAllForms } from "../../../services/api/form";
import { UserContext } from "../../../App";
import { getFormattedDate } from "../../../utils/date";
import { Link } from "react-router-dom";
import PermissionModal from "./PermissionModal";

const FORM_LIMIT = 10;

const FormListPage = () => {
  const [loading, setLoading] = useState(true);
  const [formList, setFormList] = useState([] as Array<Form>);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { token } = useContext(UserContext);

  useEffect(() => {
    getAllForms({ page, limit: FORM_LIMIT, token }).then((response) => {
      setFormList(response.data);
      setTotalPage(response.totalPages);
      setTotalItem(response.totalItems);
      setLoading(false);
    });
  }, [page, token]);

  const renderPaging = () => {
    const pagingComponents = [];
    for (let index = 1; index <= totalPage; index++) {
      pagingComponents.push(
        <PaginationItem active={page === index} key={`page-${index}`}>
          <PaginationLink href="#/" onClick={() => setPage(index)}>
            {index}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pagingComponents;
  };

  const renderTotalForm = () => {
    return `${(page - 1) * FORM_LIMIT + formList.length}/${totalItem}`;
  };

  return (
    <div className="app-inner-content-layout">
      <PermissionModal
        isOpen={showPermissionModal}
        toggle={() => setShowPermissionModal(!showPermissionModal)}
        formID={formList[selectedIndex] ? formList[selectedIndex]._id : ""}
      />
      <div className="app-inner-content-layout--main">
        <div className="d-flex align-items-center justify-content-between">
          <h4>Danh sách mẫu ({renderTotalForm()})</h4>
          <Link to="/forms/create">
            <Button color="primary" size="sm">
              Thêm mẫu
            </Button>
          </Link>
        </div>
        <div className="table-responsive-md d-flex justify-content-center mt-3">
          {loading ? (
            <ClipLoader />
          ) : (
            <Table className="text-nowrap mb-0">
              <thead className="thead-light">
                <tr>
                  <th>Tên mẫu</th>
                  <th>Ngày tạo</th>
                  <th>Người tạo</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {formList.map((formData: Form, formIndex: number) => {
                  return (
                    <tr key={`form-${formIndex}`}>
                      <td>
                        <Link to={`/forms/detail/${formData._id}`}>
                          <b>{formData.name}</b>
                        </Link>
                        {/* <span className="text-black-50 d-block">Y tế</span> */}
                      </td>
                      <td>
                        <div className="align-box-row">
                          {getFormattedDate(formData.dateCreated)}
                        </div>
                      </td>
                      <td>
                        <a
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="font-weight-bold text-black"
                          title="..."
                        >
                          {formData.organization.name}
                        </a>
                      </td>
                      <td className="text-center p-3">
                        <Button
                          size="sm"
                          color="info"
                          onClick={() => {
                            setSelectedIndex(formIndex);
                            setShowPermissionModal(true);
                          }}
                        >
                          Phân quyền
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
        <div className="divider" />
        <div className="divider" />
        <div className="p-3 d-flex justify-content-center mt-3">
          <Pagination className="pagination-first">
            <PaginationItem disabled={page === 1}>
              <PaginationLink first href="#/" onClick={() => setPage(1)}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={page === 1}>
              <PaginationLink
                previous
                href="#/"
                onClick={() => setPage(page - 1)}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </PaginationLink>
            </PaginationItem>
            {renderPaging()}
            <PaginationItem disabled={page === totalPage}>
              <PaginationLink next href="#/" onClick={() => setPage(page + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={page === totalPage}>
              <PaginationLink last href="#/" onClick={() => setPage(totalPage)}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default FormListPage;
