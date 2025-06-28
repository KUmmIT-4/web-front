import Introduction from "@/pages/Introduction"
import Login from "@/pages/Login"
import Profile from "@/pages/Profile"
import ProfileEdit from "@/pages/ProfileEdit"
import Quiz from "@/pages/Quiz"
import Rank from "@/pages/Rank"
import Register from "@/pages/Register"
import Review from "@/pages/Review"
import ReviewDetail from "@/pages/ReviewDetail" // 추가: review/:quizNum용
import NotFound from "@/pages/404" // 404 라우트 추가
import Test from "@/pages/Test"
import Home from "@/pages/Home" // home 라우트 추가
import type { RouteConfig } from "../types/router"; // RouteConfig 타입 import

// master, 중첩 라우팅 및 404 라우트까지 포함한 구조로 확장하였습니다.
const path: { [key: string]: RouteConfig } = {
  index: { path: '/', element: <Introduction /> },
  login: { path: '/log', element: <Login /> },
  register: { path: '/register', element: <Register /> },
  home: { path: '/home', element: <Home /> }, // home 라우트 추가
  quiz: { path: '/quiz', element: <Quiz /> },
  review: {
    path: 'review',
    element: <Review />,
    children: [
      {
        path: ':quizNum',
        element: <ReviewDetail />,
      },
    ],
  },
  rank: { path: '/rank', element: <Rank /> },
  profile: { path: '/profile', element: <Profile /> },
  profile_edit: { path: '/profile/edit', element: <ProfileEdit /> },
  test: { path: '/test', element: <Test /> },
  notfound: { path: '*', element: <NotFound /> }, // 404 라우트
};

export default path;
