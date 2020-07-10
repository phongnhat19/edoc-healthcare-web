interface DocDetail {
  _id: string;
  name: string;
  description: string;
  uri: string;
  inputData: [];
  dateCreated: Date;
  owner: string;
  issuedPlace: string;
  issuedTime: Date;
  issuer: string;
  type: string;
  docModel: DocModel;
  activities: any;
}
