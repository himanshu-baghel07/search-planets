import axios from "axios";
import { URI } from "../constants/apiEndpoints";

/*
 Below are the methods to call API and fetch data.
 @params (object) - An object containing query parameters to be passed to the API
*/

const fetchData = async (url, params) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    return { error }; // Return the error object
  }
};

export const fetchPlanets = (params) => fetchData(URI.PLANETS, params);
export const fetchColors = (params) => fetchData(URI.COLORS, params);
export const fetchShapes = (params) => fetchData(URI.SHAPES, params);
export const fetchSizes = (params) => fetchData(URI.SIZES, params);
