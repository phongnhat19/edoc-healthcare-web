import React, { useState } from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink as NavLinkStrap,
} from "reactstrap";
import clsx from "clsx";
import ReactQuill from "react-quill";
import FormFieldTable from "./FormFieldTable";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const FormTab = ({
  modelUI,
  setModelUI,
  formFields,
  setFormFields,
}: {
  modelUI: string;
  setModelUI: (newModelUI: string) => void;
  formFields: TableFormField[];
  setFormFields: (newFormFields: TableFormField[]) => void;
}) => {
  const [activeTab, setActiveTab] = useState("modelUI");

  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const updateFormField = (
    index: number,
    newValue: {
      label: string;
      code: string;
      type: string;
      option: string[];
      default: string;
      editing: boolean;
    }
  ) => {
    const newFormFields = [...formFields];
    newFormFields[index] = newValue;
    setFormFields(newFormFields);
  };

  const addFormField = () => {
    const newFormFields = [
      ...[
        {
          label: "",
          code: "",
          type: "string",
          option: [] as string[],
          default: "",
          editing: true,
        },
      ],
      ...formFields,
    ];
    setFormFields(newFormFields);
  };

  const deleteFormField = (index: number) => {
    const newFormFields = [...formFields];
    newFormFields.splice(index, 1);
    setFormFields(newFormFields);
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center mt-3">
        <Col span={12}>
          <Nav tabs>
            <NavItem>
              <NavLinkStrap
                className={clsx({ active: activeTab === "modelUI" })}
                onClick={() => {
                  toggle("modelUI");
                }}
              >
                Mẫu
              </NavLinkStrap>
            </NavItem>
            <NavItem>
              <NavLinkStrap
                className={clsx({ active: activeTab === "inputFields" })}
                onClick={() => {
                  toggle("inputFields");
                }}
              >
                Thông tin cần thiết
              </NavLinkStrap>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col span={12}>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="modelUI">
              <ReactQuill
                theme="snow"
                value={modelUI}
                onChange={setModelUI}
                placeholder="Example placeholder..."
                modules={{ toolbar: toolbarOptions }}
              />
            </TabPane>
            <TabPane tabId="inputFields">
              <FormFieldTable
                updateFormField={updateFormField}
                formFields={formFields}
                addFormField={addFormField}
                deleteFormField={deleteFormField}
              />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormTab;
