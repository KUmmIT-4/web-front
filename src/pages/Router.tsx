import { Routes, Route, BrowserRouter } from "react-router-dom";
import Introduction from "./Introduction";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Problem from "./Problem";
import Review from "./Review";
import Rank from "./Rank";
import Profile from "./Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/log" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/prob" element={<Problem />} />
        <Route path="/review" element={<Review />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
