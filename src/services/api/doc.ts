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

<<<<<<< HEAD
const getDocActivities = ({token = "", docId = ""} : {token: string, docId: string}) => {
  return axios
    .get(`${API_ENDPOINT}/docs/activities`, {
      headers: {
        params: {docId},
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(response);
    });
}

export { getAllDocs, getAlDocTypes, getDocActivities };
=======
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

export { getAllDocs, getAllDocTypes, getDocRawTX, sendSignedDocTX };
>>>>>>> d5872e08b6f96128ebd9c3da2be0f345035d2f1d
