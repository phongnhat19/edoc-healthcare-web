import axios from "axios";
import { API_ENDPOINT } from "./constant";

const FORM_FIELD_TYPE = {
  STRING: "string",
  SINGLE_CHOICE: "singleChoice",
};

const getAllForms = ({
  page = 1,
  limit = 10,
  token = "",
}: {
  page: number;
  limit: number;
  token: string;
}) => {
  return axios
    .get(`${API_ENDPOINT}/docmodels`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const responseData = {
        totalItems: response.data.totalItems,
        totalPages: response.data.totalPages,
        page: response.data.page,
        limit: response.data.limit,
        data: [] as Array<Form>,
      };
      responseData.data = response.data.data.map((formObj: any) => {
        return {
          _id: formObj._id,
          name: formObj.name,
          dateCreated: new Date(formObj.createdAt),
          organizationID: formObj.organization._id,
          organizationName: formObj.organization.name,
          modelUI: formObj.modelUI,
          inputFields: formObj.inputFields,
        } as Form;
      });
      return responseData;
    });
};

const getFormRawTX = ({
  token,
  modelUI,
  name,
  symbol,
  inputFields,
}: {
  token: string;
  modelUI: string;
  name: string;
  symbol: string;
  inputFields: FormField[];
}) => {
  return axios
    .post(
      `${API_ENDPOINT}/docmodels/get-raw-tx`,
      {
        name,
        symbol,
        modelUI,
        inputFields,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return {
        sessionKey: response.data.sessionKey,
        rawTx: response.data.rawTx,
      };
    });
};

const sendSignedFormTX = ({
  token,
  sessionKey,
  signedTx,
}: {
  token: string;
  sessionKey: string;
  signedTx: string;
}) => {
  return axios
    .post(
      `${API_ENDPOINT}/docmodels/send-signed-tx`,
      {
        sessionKey,
        signedTx,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      return response;
    });
};

export { getAllForms, FORM_FIELD_TYPE, getFormRawTX, sendSignedFormTX };
