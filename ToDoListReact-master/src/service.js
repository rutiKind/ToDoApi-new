import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_ToDoApi;

//const apiUrl = process.env.REACT_APP_ToDoApi
const apiUrl = "https://localhost:7100";
const apiAdd = `${apiUrl}/add`;
const apiDelete = `${apiUrl}/delete`;
const apiUpdate = `${apiUrl}/updateC`;

// צור מופע axios
axios.interceptors.request.use(
  function (config) {
    console.log(apiUrl);
    console.log("config", config);
    return config;
  },
  function (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
);
// הוסף מיירט תגובה
axios.interceptors.response.use(
  function (res) {
    console.log("res", res);
    return res;
  },
  function (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    debugger;
    const result = await axios.get(apiUrl);
    console.log(result);
    return result.data;
  },

  //הוספת משימה
  addTask: async (name) => {
    const response = await axios.post(`${apiAdd}/${name}`);
    console.log(response.data);
    return {};
  },

  // סימון משימה כנעשתה
  setCompleted: async (id, isComplete) => {
    const response = await axios.put(`${apiUpdate}/${id}`, null, {
      params: {
        complete: isComplete,
      },
    });
    console.log("setCompleted", { id });
    return {};
  },

  //מחיקת משימה
  deleteTask: async (name) => {
    const response = await axios.delete(`${apiDelete}/${name}`);
    console.log(response.data);
    console.log("deleteTask");
    return {};
  },
};
