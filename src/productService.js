import axios from "axios";
import {
  setAllProducts,
  setDateProducts,
  setTopProducts,
  setLastSeenProducts,
  setInterestProducts,
} from "./redux/features/productsSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;
const obj = localStorage.getItem("persist:root");
const userToken = JSON.parse(obj)?.token;

const authorization = userToken ? `Bearer ${JSON.parse(userToken)}` : undefined;

if (
  authorization &&
  authorization !== "Bearer null" &&
  authorization !== "Bearer "
) {
  axios.defaults.headers.common["Authorization"] = authorization;
  // console.log(axios.defaults.headers.common["Authorization"]);
}

// const headers = userToken ? {
//   Authorization: `Bearer ${JSON.parse(userToken)}`,
// } : {};
// console.log(headers);

// products
export const getProductsAll = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/product`);
    dispatch(setAllProducts(response.data.products));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const getProductsWithDateFilter = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/product/?filter=date`);
    dispatch(setDateProducts(response.data.products));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const getProductsWithTopFilter = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/product/?filter=top`);
    dispatch(setTopProducts(response.data.products));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const getProductsWithLast_seenFilter = async (dispatch, user) => {
  try {
    let response;
    if (user?.isLoggedIn) {
      response = await axios.get(
        `${baseUrl}/product/?filter=last_seen&userId=${user.userdata?.id}`
      );
    } else {
      response = await axios.get(`${baseUrl}/product/?filter=last_seen`);
    }
    dispatch(setLastSeenProducts(response.data.products));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const getProductsWithInterestFilter = async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/product/?filter=interest`);
    dispatch(setInterestProducts(response.data.products));
  } catch (error) {
    console.error("Error:", error.message);
  }
};
// products end
