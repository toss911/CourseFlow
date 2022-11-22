import "./App.css";
import { useAuth } from "./contexts/authentication.js";
import AuthenticatedAdmin from "./pages/Admin/AuthenticatedAdmin.js";
import UnauthenticatedAdmin from "./pages/Admin/UnauthenticatedAdmin";

function AppAdmin() {
  const { isAdminAuthenticated } = useAuth();
  console.log(isAdminAuthenticated);
  return (
    <>
    { isAdminAuthenticated ? <AuthenticatedAdmin/> : <UnauthenticatedAdmin/> }
    </>
    );
}

export default AppAdmin;