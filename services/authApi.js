import { loginFailed, loginStart, loginSuccess } from "@/redux/authSlice";
import { DOMAIN } from "@/utils/setting/config";
import axios from "axios";
import Router from "next/router";

export const registerUser = async (user) => {
  try {
    await axios.post(`${DOMAIN}/auth/register`, user);
    Router.push("/login");
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${DOMAIN}/auth/login`, user);
    dispatch(loginSuccess(res.data));
    Router.push("/");
  } catch (err) {
    dispatch(loginFailed(err.response));
  }
};
