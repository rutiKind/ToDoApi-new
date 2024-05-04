import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5252/';

const apiUrl = "http://localhost:5252/"
const apiAdd="http://localhost:5252/add"
const apiDelete="http://localhost:5252/delete"
const apiUpdate="http://localhost:5252/updateC"

// צור מופע axios
const instance = axios.create();

// הוסף מיירט תגובה
instance.interceptors.response.use(
  (response) => {
    // החזר את התגובה אם היא הצליחה
    return response;
  },
  (error) => {
    // רשם את השגיאה 
    console.error(error);
    // זרוק את השגיאה 
    throw error;
  }
);

export default {
  getTasks: async () => {
    const result = await instance.get(apiUrl)
    return result.data;
  },

  //הוספת משימה
  addTask: async (name) => {
      const response = await instance.post(`${apiAdd}/${name}`);
      console.log(response.data);
    return {};
  },

  // סימון משימה כנעשתה
  setCompleted: async (id, isComplete) => {
      const response = await instance.put(`${apiUpdate}/${id}/${isComplete}`);
      console.log('setCompleted', { id });
    return {};
  },

  //מחיקת משימה
  deleteTask: async (name) => {
      const response = await instance.delete(`${apiDelete}/${name}`);
      console.log(response.data);
     console.log('deleteTask');
    return {};
  },
};





