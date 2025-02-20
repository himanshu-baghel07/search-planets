import axios from "axios";
import { URI } from "../constants/apiEndpoints";

/*
 Below are the methods to call API and fetch data.
 @params (object) - An object containing query parameters to be passed to the API
*/

export const fetchPlanets = async (params) => {
  const response = await axios.get(URI.PLANETS, { params });
  return response.data;
};

export const fetchColors = async (params) => {
  const response = await axios.get(URI.COLORS, { params });
  return response.data;
};

export const fetchShapes = async (params) => {
  const response = await axios.get(URI.SHAPES, { params });
  return response.data;
};

export const fetchSizes = async (params) => {
  const response = await axios.get(URI.SIZES, { params });
  return response.data;
};
