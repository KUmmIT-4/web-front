import { Routes, Route, BrowserRouter } from "react-router-dom";
import path from "./constants/path"; // path.tsx에서 라우트 정보 import
import type { RouteConfig } from "./types/router"; // RouteConfig 타입 import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창이 포커스될 때 자동으로 다시 가져오지 않도록 설정
      retry: false, // 실패 시 재시도하지 않도록 설정
    },
  },
});

// master, renderRoutes 함수에 타입 적용
const renderRoutes = (routesObj: { [key: string]: RouteConfig }) => {
  return Object.values(routesObj).map((route, idx) => {
    if (route.children) {
      // 중첩 라우트 처리
      return (
        <Route path={route.path} key={route.path || idx}>
          {/* master, index를 추가하여 review route에서 ReviewDetail로 이동할 수 있도록 수정 */}
          <Route index element={route.element} />
          {route.children.map((child: RouteConfig, cidx: number) => (
            <Route path={child.path} element={child.element} key={child.path || cidx} />
          ))}
        </Route>
      );
    }
    return (
      <Route path={route.path} element={route.element} key={route.path || idx} />
    );
  });
};

const Router = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      <Routes>
        {/* path.tsx에서 정의한 라우트 정보를 기반으로 동적으로 Route 생성 */}
        {renderRoutes(path)}
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Router;
