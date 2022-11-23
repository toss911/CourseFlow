import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminError() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin");
  }, []);
}

export default AdminError;
