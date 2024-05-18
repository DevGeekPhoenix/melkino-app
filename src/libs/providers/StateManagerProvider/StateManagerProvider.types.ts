import type { ReactNode } from "react";

export interface AppProviderProps {
  children: ReactNode;
}

export type AppReducerInitialStateType = {
  isDark: boolean;
};
