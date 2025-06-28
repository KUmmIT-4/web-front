import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 티어 이름 영문 -> 한글 매핑
 * 예: BRONZE -> 브론즈, SILVER -> 실버, GOLD -> 골드
 * 사용 방법
 * ```typescript
 * import { tierNames } from "@/lib/utils";
 * const tierName = tierNames["BRONZE"]; // "브론즈"
 * ```
 */
export const tierNames: Record<string, string> = {
  BRONZE: "브론즈",
  SILVER: "실버",
  GOLD: "골드",
};

/**
 * 티어 이름 영문 외자 -> 한글 매핑
 * 예: BRONZE -> B, SILVER -> S, GOLD -> G
 * 사용 방법
 * ```typescript
 * import { tierShortNames } from "@/lib/utils";
 * const shortName = tierShortNames["B"]; // "브론즈"
 * ```
 */
export const tierShortNames: Record<string, string> = {
  B: "브론즈",
  S: "실버",
  G: "골드",
};
