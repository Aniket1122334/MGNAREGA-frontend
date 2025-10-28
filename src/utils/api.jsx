import axios from "axios";

//Base URL
const API = axios.create({
  baseURL: "https://mgnarega-backend.onrender.com/",
});

export const fetchAllData = async () => {
  try {
    const res = await API.get("/api/data");
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching all data:", err);
    throw err;
  }
};
