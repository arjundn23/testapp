import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/LoginPage/Login";
import FileBrowser from "./pages/FileBrowserPage/FileBrowser";
import AddFile from "./pages/AddFilePage/AddFile";
import ViewFile from "./pages/ViewFilePage/ViewFile";
import Register from "./pages/RegisterPage/Register";
import Info from "./pages/InfoPage/Info";
import Delete from "./pages/DeletePage/Delete";
import Link from "./pages/LinkPage/Link";
import CategoryPage from "./pages/CategoryPage/CategoryPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const parsedUserInfo = JSON.parse(storedUserInfo);
    if(parsedUserInfo){
      const id = parsedUserInfo._id;
      if(id){
        setIsAuth(true);
      }
      else {
        setIsAuth(false);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Define the login route */}
        <Route path="/" element={<Login />} />
        <Route path="/filebrowse" element={isAuth ? <FileBrowser /> : <Navigate to={"/"}/>} />
        <Route path="/addfile" element={isAuth ? <AddFile /> : <Navigate to={"/"}/>} />
        <Route path="/viewfile" element={isAuth ? <ViewFile /> : <Navigate to={"/"}/>} />
        <Route path="/register" element={isAuth ? <Register /> : <Navigate to={"/"}/>} />
        <Route path="/info" element={isAuth ? <Info /> : <Navigate to={"/"}/>} />
        <Route path="/delete" element={isAuth ? <Delete /> : <Navigate to={"/"}/>} />
        <Route path="/link" element={<Link />} />
        <Route path="/category/:category" element={isAuth ? <CategoryPage /> : <Navigate to={"/"}/>} />

        {/* Redirect any undefined routes to /login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
