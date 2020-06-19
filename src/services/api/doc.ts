import axios from "axios";
import { API_ENDPOINT } from "./constant";

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

const getAlDocTypes = ({ token = "" }: { token: string }) => {
  return axios
    .get(`${API_ENDPOINT}/docs/types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export { getAllDocs, getAlDocTypes };
