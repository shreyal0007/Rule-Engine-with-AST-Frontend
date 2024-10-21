import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: "https://rule-engine-with-ast-backend.onrender.com/api/rules", // Make sure this matches your backend
});

const BASE_URL = "https://rule-engine-with-ast-backend.onrender.com/api/rules";

// Function to create a rule
export const createRule = async (ruleString) => {
  try {
    const response = await api.post("/create", { ruleString });
    console.log(response);
    if (response && response.data) {
      console.log("Created AST:", response.data);
      return response; // Return the full response
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("Error creating rule:", error.message || error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// Function to fetch existing rules
export const fetchRules = async () => {
  try {
    const response = await api.get("/");

    if (response && response.data) {
      // Ensure response and data exist
      return response.data; // Return the rules data
    } else {
      throw new Error("No data found in the response");
    }
  } catch (error) {
    console.error("Error fetching rules:", error.message || error);
    throw error; // Re-throw error for the caller to handle
  }
};

export const combineRules = async (rules) => {
  try {
    const response = await axios.post(`${BASE_URL}/combine`, { rules });
    console.log("combine res-", response.data.combinedAST);
    // Check if the response contains combinedAST
    if (response && response.data) {
      console.log("Combined AST:", response.data.combinedAST);
      return response.data; // Return the full response for further processing
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("Error combining rules:", error.message || error);
    throw error; // Re-throw the error for the caller to handle
  }
};

  export const evaluateRule = async (data, combinedAST) => {
    try {
      // Combine data and AST into the request body
      const requestBody = {
        userData: data,
        ast: combinedAST,
      };

      const response = await axios.post(`${BASE_URL}/evaluate`, requestBody);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error evaluating rule:", error);
      return null;
    }
  };
