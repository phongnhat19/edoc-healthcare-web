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
  label: string;
  name: string;
  type: FormFieldType;
  options?: string[];
}

interface FormValue {
  name: string;
  value: string;
}

interface TableFormField {
  label: string;
  code: string;
  type: string;
  option: string[];
  default: string;
  editing: boolean;
}

interface Organization {
  _id: string;
  name: string;
}

interface Form {
  _id: string;
  name: string;
  symbol: string;
  blockchainId: string;
  dateCreated: Date;
  organization: Organization;
  modelUI: string;
  inputFields: FormField[];
  grantedFor: string[];
}

interface DocOwner {
  _id: string;
  name: string;
}

// Doc type definition

interface InputData {
  _id?: string;
  name?: string;
  value?: string;
}

interface DocModel {
  _id: string | "";
  modelUI?: string | "";
  inputFields: FormField[];
}

interface Person {
  _id?: string;
  name?: string;
}
interface Doc {
  _id: string;
  blockchainId: string;
  name?: string;
  description?: string;
  issuedPlace?: string;
  type?: string;
  uri?: string;
  owner?: Person;
  issuer?: Person;
  docModel?: DocModel;
  inputData?: InputData[];
  issuedTime?: Date;
  dateCreated: Date;
  status: ActivityStatus;
  activities: any[] | [];
}

// Activity type definition
type ActivityStatus = "ACTIVE";

interface ImageField {
  title: string;
  url: string;
}

interface StatusField {
  name: string;
  backgroundColor: string;
}
interface DescriptionField {
  key: string;
  value: string;
}
interface NewActivityForm {
  docId: string;
  name: string;
  recordingTime: string;
  recordingPerson: string;
  recordingPlace: string;
  status: StatusField;
  images: ImageField[];
  note: string;
  description: DescriptionField[];
}
