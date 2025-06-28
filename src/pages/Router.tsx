import { Routes, Route, BrowserRouter } from "react-router-dom";
import Introduction from "./Introduction";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Problem from "./Problem";
import Review from "./Review";
import Rank from "./Rank";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
import ReviewProb from "./ReviewProb";
import NotFound from "./404";
import Test from "./Test";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/log" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/prob" element={<Problem />} />
        <Route path="review">
          <Route index element={<Review />} />
          <Route path=":probNum" element={<ReviewProb />} />
        </Route>
        <Route path="/rank" element={<Rank />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<ProfileEdit />} />

        {/* test page */}
        <Route path="/test" element={<Test />} />

        {/* error pages */}
        {/* 404 error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
