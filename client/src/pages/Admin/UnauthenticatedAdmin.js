import { Routes, Route } from "react-router-dom";
import LoginAdminPage from "./LoginAdminPage";
import AdminError from "./AdminErrorPage";

function UnauthenticatedAdmin() {
  return (
    <Routes>
      <Route path="/" element={<LoginAdminPage />} />
      <Route path="*" element={<AdminError />} />
    </Routes>
  );
}

export default UnauthenticatedAdmin;
