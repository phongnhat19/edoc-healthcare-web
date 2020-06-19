import axios from "axios";
import { API_ENDPOINT } from "./constant";

const ROLE_MAPPER = {
  "0": "admin",
  "1": "organization",
  "2": "staff",
  "3": "personal user",
};

const getAllUsers = async ({
  page = 1,
  limit = 10,
  token = "",
}: {
  page: number;
  limit: number;
  token: string;
}) => {
  return axios
    .get(`${API_ENDPOINT}/users`, {
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
        data: [] as Array<User>,
      };
      responseData.data = response.data.data.map((userObj: any) => {
        return {
          _id: userObj._id,
          name: userObj.name,
          email: userObj.name,
          role: (ROLE_MAPPER as any)[userObj.role],
        } as User;
      });
      return responseData;
    });
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios
    .post(`${API_ENDPOINT}/users/sign-in`, {
      email,
      password,
    })
    .then((response) => {
      return {
        token: response.data.token,
        userData: {
          _id: response.data.user._id,
          email: response.data.user.email,
          name: response.data.user.name,
          privateEncrypted: response.data.user.privateEncrypted,
          seedEncrypted: response.data.user.seedEncrypted,
          bcAddress: response.data.user.bcAddress,
          avatar:
            "https://res.cloudinary.com/gophuot/image/upload/c_scale,w_70/v1582566632/vu9otmrwzilrqlhqzjnr.jpg",
          role: (ROLE_MAPPER as any)[response.data.user.role],
        },
      };
    });
};

const updateProfile = async ({
  name,
  token,
}: {
  name?: string;
  token: string;
}) => {
  return axios
    .patch(
      `${API_ENDPOINT}/users/update`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return {
        _id: response.data._id,
        email: response.data.email,
        name: response.data.name,
        privateEncrypted: response.data.user.privateEncrypted,
        seedEncrypted: response.data.user.seedEncrypted,
        bcAddress: response.data.user.bcAddress,
        avatar:
          "https://res.cloudinary.com/gophuot/image/upload/c_scale,w_70/v1582566632/vu9otmrwzilrqlhqzjnr.jpg",
        role: (ROLE_MAPPER as any)[response.data.user.role],
      };
    });
};

export { login, getAllUsers, updateProfile };
