import { DOMAIN } from "@/utils/setting/config";
import axios from "axios";

export const updateUser = async (id, params, accessToken) => {
  try {
    await axios.patch(`${DOMAIN}/users/${id}`, params, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (err) {
    console.log(err.data);
  }
};
