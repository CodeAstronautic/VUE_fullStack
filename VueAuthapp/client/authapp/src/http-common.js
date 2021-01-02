import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4040/post",
  headers: {
    "Content-type": "application/json"
  }
});
