import axios from "axios";
import { API_CONFIG } from "./config";
import { setupInterceptors } from "./interceptors";

const apiClient = axios.create(API_CONFIG);

// Setup request/response interceptors
setupInterceptors(apiClient);

export default apiClient;
