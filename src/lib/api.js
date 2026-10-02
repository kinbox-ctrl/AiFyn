import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL || ""}/api`,
  timeout: 20000,
});

export const submitLead = (data) => api.post("/leads", data).then((r) => r.data);

export const adminLogin = (password) =>
  api.post("/admin/login", { password }).then((r) => r.data);

export const fetchLeads = (token) =>
  api.get("/admin/leads", { headers: { "X-Admin-Token": token } }).then((r) => r.data);

export const exportCsv = async (token) => {
  const res = await api.get("/admin/leads/export", {
    headers: { "X-Admin-Token": token },
    responseType: "blob",
  });
  const url = URL.createObjectURL(res.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aifyn-leads.csv";
  a.click();
  URL.revokeObjectURL(url);
};