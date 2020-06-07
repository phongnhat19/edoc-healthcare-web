import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faAngleDoubleLeft,
  faChevronLeft,
  faAngleDoubleRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  CustomInput,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
} from "reactstrap";

const DocListPage = () => {
  return (
    <div className="app-inner-content-layout">
      <div className="app-inner-content-layout--main">
        <div className="table-responsive-md">
          <Table className="text-nowrap mb-0">
            <thead className="thead-light">
              <tr>
                <th className="text-center" style={{ width: "5%" }}>
                  <CustomInput
                    type="checkbox"
                    id="CustomCheckbox3"
                    className="align-self-start"
                    label="&nbsp;"
                  />
                </th>
                <th>Tên hồ sơ</th>
                <th>Ngày tạo</th>
                <th className="text-center" style={{ width: "20%" }}>
                  Trạng thái
                </th>
                <th>Nơi tạo</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="text-center">
                  <CustomInput
                    type="checkbox"
                    id="doc-1"
                    className="align-self-start"
                    label="&nbsp;"
                  />
                </td>
                <td>
                  <b>Lê Văn Sin</b>
                  <span className="text-black-50 d-block">Hồ sơ Covid-19</span>
                </td>
                <td>
                  <div className="align-box-row">01/06/2020</div>
                </td>
                <td className="text-center">
                  <Badge color="success" className="h-auto py-0 px-3">
                    Đã xác nhận
                  </Badge>
                </td>
                <td>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold text-black"
                    title="..."
                  >
                    Bệnh viện Củ Chi
                  </a>
                </td>
                <td className="text-center">
                  <div>
                    <Button
                      size="sm"
                      color="neutral-first"
                      className="d-30 btn-pill p-0 btn-icon"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="font-size-lg"
                      />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-center">
                  <CustomInput
                    type="checkbox"
                    id="doc-2"
                    className="align-self-start"
                    label="&nbsp;"
                  />
                </td>
                <td>
                  <b>Lê Văn Sin</b>
                  <span className="text-black-50 d-block">
                    Hồ sơ xét nghiệm HIV
                  </span>
                </td>
                <td>
                  <div className="align-box-row">01/06/2020</div>
                </td>
                <td className="text-center">
                  <Badge color="success" className="h-auto py-0 px-3">
                    Đã xác nhận
                  </Badge>
                </td>
                <td>
                  <a
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="font-weight-bold text-black"
                    title="..."
                  >
                    Viện huyết học
                  </a>
                </td>
                <td className="text-center">
                  <div>
                    <Button
                      size="sm"
                      color="neutral-first"
                      className="d-30 btn-pill p-0 btn-icon"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="font-size-lg"
                      />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="divider" />
        <div className="divider" />
        <div className="p-3 d-flex justify-content-center">
          <Pagination className="pagination-first">
            <PaginationItem disabled>
              <PaginationLink
                first
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink
                previous
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#/" onClick={(e) => e.preventDefault()}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                next
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                href="#/"
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default DocListPage;
