import axios from "axios";


const BASE_URL = "http://localhost:5000/api/"


  
  // const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  // const currentUser = user && JSON.parse(user)?.currentUser;
  const TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).currentUser
  )?.accessToken;


  // const TOKEN =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc4OWJiYzczMjZkMDBjOTU0YjE3NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5Mjk3ODI4OCwiZXhwIjoxNjkzMjM3NDg4fQ.Naxwjo9FR4m_wyd6nG60p67XOPLLMv5azQAR0-yqqpE";


export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers : {token :`Bearer ${TOKEN}`}
})