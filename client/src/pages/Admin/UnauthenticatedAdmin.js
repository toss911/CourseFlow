import { Routes, Route } from "react-router-dom";
import LoginAdminPage from "./LoginAdminPage";

function UnauthenticatedAdmin(){
    return(
    <Routes>
        <Route path="/" element ={<LoginAdminPage/>}/>
    </Routes>
    );
}

export default UnauthenticatedAdmin;