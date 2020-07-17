import React from "react";
import { Button, Input, Table, FormFeedback } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const DescriptionTable = ({
  descriptions,
  formDescriptionError,
  removeDescription,
  addDescription,
  setDescriptions,
}: {
  descriptions: DescriptionField[];
  formDescriptionError: string;
  setDescriptions: (descriptions: DescriptionField[]) => void;
  addDescription: () => void;
  removeDescription: (index: number) => void;
}) => {
  const descriptionHandler = (des: DescriptionField, index: number) => {
    let newDescriptions = [...descriptions];
    newDescriptions[index] = des;
    setDescriptions(newDescriptions);
  };

  return (
    <div className="table-responsive-md">
      <Table className="text-nowrap mb-0">
        <thead className="thead-light">
          <tr>
            <th>Thông tin</th>
            <th>Giá trị</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td colSpan={5}>
              <Button color="primary" size="sm" onClick={addDescription}>
                Thêm field
              </Button>
            </td>
          </tr>

          {descriptions.length > 0 &&
            descriptions.map((des, idx) => (
              <tr key={`activity-description-${idx}`}>
                <td>
                  <div className="d-flex flex-column justify-content-start">
                    <Input
                      key={`key-${idx}`}
                      name="key"
                      value={des.key}
                      invalid={des.key === "" && formDescriptionError !== ""}
                      onChange={(e) =>
                        descriptionHandler(
                          { key: e.target.value, value: des.value },
                          idx
                        )
                      }
                    />
                    <FormFeedback>{formDescriptionError}</FormFeedback>
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column justify-content-start">
                    <Input
                      key={`key-${idx}`}
                      name="value"
                      value={des.value}
                      invalid={des.value === "" && formDescriptionError !== ""}
                      onChange={(e) =>
                        descriptionHandler(
                          { key: des.key, value: e.target.value },
                          idx
                        )
                      }
                    />
                    <FormFeedback>{formDescriptionError}</FormFeedback>
                  </div>
                </td>
                <td>
                  {" "}
                  <Button
                    size="sm"
                    color="danger"
                    className="d-30 p-0 btn-icon"
                    onClick={() => removeDescription(idx)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="font-size-lg" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DescriptionTable;
