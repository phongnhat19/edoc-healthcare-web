import axios from "axios";
import { API_ENDPOINT } from "./constant";
import { getIssueTimeFormat } from "../../utils/date";

const getAllDocs = ({
  page = 1,
  limit = 10,
  token = "",
}: {
  page: number;
  limit: number;
  token: string;
}) => {
  return axios
    .get(`${API_ENDPOINT}/docs`, {
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
        data: [] as Array<Doc>,
      };
      responseData.data = response.data.data.map((docObj: any) => {
        return {
          _id: docObj._id,
          name: docObj.name,
          dateCreated: new Date(docObj.createdAt),
          ownerID: docObj.owner._id,
          ownerName: docObj.owner.name,
          issuedPlace: docObj.issuedPlace,
          type: docObj.type,
          status: "ACTIVE",
        } as Doc;
      });
      return responseData;
    });
};

const getAllDocTypes = ({ token = "" }: { token: string }) => {
  return axios
    .get(`${API_ENDPOINT}/docs/types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

// TODO: complete this api
const getDocActivities = ({
  token = "",
  docId = "",
}: {
  token: string;
  docId: string;
}) => {
  return axios
    .get(`${API_ENDPOINT}/docs/activities`, {
      params: { docId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getDocById = ({
  token = "",
  docId = "",
}: {
  token: string;
  docId: string;
}) => {
  return axios
    .get(`${API_ENDPOINT}/docs/by-id`, {
      params: { id: docId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const { data } = response;
      return {
        _id: data._id,
        name: data.name,
        description: data.description,
        uri: data.uri,
        inputData: data.inputData,
        dateCreated: new Date(data.createdAt),
        owner: data.owner,
        issuedPlace: data.issuedPlace,
        issuedTime: new Date(data.issuedTime),
        issuer: data.issuer,
        type: data.type,
        docModel: data.docModel,
      };
    });
};

const getDocRawTX = async ({
  token,
  docModelId,
  name,
  uri,
  issuedPlace,
  issuedTime,
  owner,
  description,
  type,
  inputData,
}: {
  token: string;
  docModelId: string;
  name: string;
  issuedPlace: string;
  issuedTime: Date;
  owner: string;
  type: string;
  uri: string;
  description: string;
  inputData: FormValue[];
}) => {
  const response = await axios.post(
    `${API_ENDPOINT}/docs/get-raw-tx`,
    {
      docModelId,
      uri,
      name,
      no: "115",
      issuedTime: getIssueTimeFormat(issuedTime),
      description,
      owner,
      issuedPlace,
      type,
      isLocked: false,
      isTransferLocked: false,
      inputData,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return {
    sessionKey: response.data.sessionKey,
    rawTx: response.data.rawTx,
  };
};

const sendSignedDocTX = async ({
  token,
  sessionKey,
  signedTx,
}: {
  token: string;
  sessionKey: string;
  signedTx: string;
}) => {
  const response = await axios.post(
    `${API_ENDPOINT}/docs/send-signed-tx`,
    {
      sessionKey,
      signedTx,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export {
  getAllDocs,
  getAllDocTypes,
  getDocById,
  getDocRawTX,
  sendSignedDocTX,
  getDocActivities,
};
