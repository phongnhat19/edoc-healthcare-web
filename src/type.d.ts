// User type definition
interface User {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  seedEncrypted: string;
  privateEncrypted: string;
  bcAddress: string;
  organizationName?: string;
  organizationID?: string;
  role: string;
}

// Form type definition
type FormFieldType = "string" | "singleChoice";

interface FormField {
  name: string;
  type: FormFieldType;
  options?: string[];
}

interface TableFormField {
  label: string;
  code: string;
  type: string;
  option: string[];
  default: string;
  editing: boolean;
}

interface Form {
  _id: string;
  name: string;
  dateCreated: Date;
  organizationName: string;
  organizationID: string;
  modelUI: string;
  inputFields: [FormField];
}

// Doc type definition
interface Doc {
  _id: string;
  name: string;
  issuedPlace: string;
  type: string;
  ownerID: string;
  ownerName: string;
  dateCreated: Date;
  status: ActivityStatus;
}

// Activity type definition
type ActivityStatus = "ACTIVE";
