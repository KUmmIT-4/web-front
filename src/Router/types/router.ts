import type { ReactElement } from "react";

// master, RouteConfig 타입을 정의합니다. children은 재귀적으로 RouteConfig 배열을 가질 수 있습니다.
export interface RouteConfig {
  path: string;
  element: ReactElement;
  children?: RouteConfig[];
}
