// clsx は、false や undefined などの値を無視してクラス名を結合するユーティリティ
import { clsx, type ClassValue } from "clsx";

// tailwind-merge は、Tailwind CSS の競合するクラス名（例: p-2 と p-4）を後のものに自動で置き換えるライブラリ
import { twMerge } from "tailwind-merge";

/**
 * クラス名を動的に組み立てつつ、
 * Tailwind CSS の競合クラスを自動で最適化するための関数。
 *
 * @param inputs - 任意のクラス名（文字列、条件付き、オブジェクトなど）を受け取る
 * @returns 最終的に整形された1つのクラス名文字列
 *
 * 使用例:
 *   cn("p-2", condition && "p-4", "text-sm")
 *   → "p-4 text-sm"（p-2 は除去され、重複解消される）
 */
export const cn = (...inputs: ClassValue[]) => {
    // clsx で条件付きクラス名などを結合 → twMerge で Tailwind の競合クラスをマージ
    return twMerge(clsx(...inputs));
};
