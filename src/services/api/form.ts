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
        data: [] as Form[],
      };
      responseData.data = response.data.data.map((formObj: any) => {
        return {
          _id: formObj._id,
          name: formObj.name,
          dateCreated: new Date(formObj.createdAt),
          organization: formObj.organization,
          modelUI: formObj.modelUI,
          inputFields: formObj.inputFields,
          blockchainId: formObj.blockchainId,
        } as Form;
      });
      return responseData;
    });
};

const getFormDetail = ({
  formID,
  token,
}: {
  formID: string;
  token: string;
}) => {
  return axios
    .get(`${API_ENDPOINT}/docmodels/by-id`, {
      params: { id: formID },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return {
        _id: response.data._id,
        name: response.data.name,
        symbol: response.data.symbol,
        blockchainId: response.data.blockchainId,
        dateCreated: new Date(response.data.createdAt),
        organization: response.data.organization,
        modelUI: response.data.modelUI,
        inputFields: response.data.inputFields,
        grantedFor: response.data.grantedFor,
      } as Form;
    });
};

const grantFormAccess = ({
  docModelId,
  userIDs,
  token,
}: {
  docModelId: string;
  userIDs: string[];
  token: string;
}) => {
  if (userIDs.length === 0) return Promise.resolve(true);
  return axios
    .post(
      `${API_ENDPOINT}/docmodels/grant`,
      {
        docModelId: docModelId,
        users: userIDs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => true);
};

const revokeFormAccess = ({
  docModelId,
  userIDs,
  token,
}: {
  docModelId: string;
  userIDs: string[];
  token: string;
}) => {
  if (userIDs.length === 0) return Promise.resolve(true);
  return axios
    .post(
      `${API_ENDPOINT}/docmodels/revoke`,
      {
        docModelId: docModelId,
        users: userIDs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => true);
};

const getFormRawTX = ({
  token,
  modelUI,
  name,
  symbol,
  inputFields,
  organization,
}: {
  token: string;
  modelUI: string;
  name: string;
  symbol: string;
  inputFields: FormField[];
  organization?: string;
}) => {
  const requestData: Record<string, any> = {
    name,
    symbol,
    modelUI,
    inputFields,
  };
  if (organization) requestData.organization = organization;
  return axios
    .post(`${API_ENDPOINT}/docmodels/get-raw-tx`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
      return response;
    });
};

export {
  getAllForms,
  FORM_FIELD_TYPE,
  getFormRawTX,
  sendSignedFormTX,
  getFormDetail,
  grantFormAccess,
  revokeFormAccess,
};
