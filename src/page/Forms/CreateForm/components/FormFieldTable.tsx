import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "reactstrap";
import { FORM_FIELD_TYPE } from "../../../../services/api/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WithContext as ReactTags } from "react-tag-input";
import {
  faSave,
  faTimes,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const FormFieldTable = ({
  formFields,
  updateFormField,
  addFormField,
  deleteFormField,
}: {
  formFields: {
    label: string;
    code: string;
    type: string;
    option: string[];
    default: string;
    editing: boolean;
  }[];
  updateFormField: (
    index: number,
    newValue: {
      label: string;
      code: string;
      type: string;
      option: string[];
      default: string;
      editing: boolean;
    }
  ) => void;
  addFormField: () => void;
  deleteFormField: (index: number) => void;
}) => {
  const [currentFormFields, setCurrentFormFields] = useState(formFields);

  const updateCurrentField = (index: number, field: string, newValue: any) => {
    const newFormFields = [...currentFormFields];
    (newFormFields[index] as any)[field] = newValue;
    setCurrentFormFields(newFormFields);
  };

  useEffect(() => {
    setCurrentFormFields(formFields);
  }, [formFields]);

  const renderOption = (
    field: {
      label: string;
      code: string;
      type: string;
      option: string[];
      default: string;
      editing: boolean;
    },
    fieldIndex: number
  ) => {
    if (field.type === "string") return null;
    return (
      <ReactTags
        placeholder="Thêm lựa chọn (bấm Enter để thêm)"
        inputFieldPosition="top"
        tags={field.option.map((field) => {
          return { id: field, text: field };
        })}
        handleAddition={(newOption) => {
          const newOptionList = [...field.option].map((field) => {
            return { id: field, text: field };
          });
          newOptionList.push(newOption);
          updateCurrentField(
            fieldIndex,
            "option",
            newOptionList.map((option) => option.id)
          );
        }}
        handleDelete={(optionIndex) => {
          const newOptionList = [...field.option];
          newOptionList.splice(optionIndex, 1);
          updateCurrentField(fieldIndex, "option", newOptionList);
        }}
      />
    );
  };

  return (
    <div className="table-responsive-md">
      <Table className="text-nowrap mb-0">
        <thead className="thead-light">
          <tr>
            <th>Tên field</th>
            <th>Loại</th>
            <th>Mã</th>
            <th>Option</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td colSpan={5}>
              <Button color="primary" size="sm" onClick={addFormField}>
                Thêm field
              </Button>
            </td>
          </tr>
          {currentFormFields.map((field, fieldIndex) => {
            return (
              <tr key={`field-${fieldIndex}`}>
                <td>
                  {field.editing ? (
                    <Input
                      bsSize="sm"
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        updateCurrentField(fieldIndex, "label", e.target.value)
                      }
                    />
                  ) : (
                    <b>{field.label}</b>
                  )}
                </td>
                <td>
                  {field.editing ? (
                    <Input
                      type="select"
                      bsSize="sm"
                      value={field.type}
                      onChange={(e) => {
                        updateCurrentField(fieldIndex, "type", e.target.value);
                      }}
                    >
                      <option value={FORM_FIELD_TYPE.STRING}>
                        {FORM_FIELD_TYPE.STRING}
                      </option>
                      <option value={FORM_FIELD_TYPE.SINGLE_CHOICE}>
                        {FORM_FIELD_TYPE.SINGLE_CHOICE}
                      </option>
                    </Input>
                  ) : (
                    <div className="align-box-row">{field.type}</div>
                  )}
                </td>
                <td>
                  {field.editing ? (
                    <Input
                      bsSize="sm"
                      type="text"
                      value={field.code}
                      onChange={(e) =>
                        updateCurrentField(fieldIndex, "code", e.target.value)
                      }
                    />
                  ) : (
                    <div className="align-box-row">{field.code}</div>
                  )}
                </td>
                <td>
                  {field.editing ? (
                    renderOption(field, fieldIndex)
                  ) : (
                    <b>{field.option.join(",")}</b>
                  )}
                </td>
                <td className="d-flex justify-content-center">
                  {field.editing ? (
                    <div
                      className="d-flex justify-content-between"
                      style={{ width: 70 }}
                    >
                      <Button
                        size="sm"
                        color="info"
                        className="d-30 p-0 btn-icon"
                        onClick={() => {
                          updateFormField(fieldIndex, {
                            ...currentFormFields[fieldIndex],
                            ...{
                              editing: false,
                            },
                          });
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faSave}
                          className="font-size-lg"
                        />
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        className="d-30 p-0 btn-icon"
                        onClick={() => {
                          updateFormField(fieldIndex, {
                            ...formFields[fieldIndex],
                            ...{
                              editing: false,
                            },
                          });
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="font-size-lg"
                        />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-between"
                      style={{ width: 70 }}
                    >
                      <Button
                        size="sm"
                        color="primary"
                        className="d-30 p-0 btn-icon"
                        onClick={() => {
                          updateFormField(fieldIndex, {
                            ...formFields[fieldIndex],
                            ...{
                              editing: true,
                            },
                          });
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          className="font-size-lg"
                        />
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        className="d-30 p-0 btn-icon"
                        onClick={() => deleteFormField(fieldIndex)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="font-size-lg"
                        />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default FormFieldTable;
