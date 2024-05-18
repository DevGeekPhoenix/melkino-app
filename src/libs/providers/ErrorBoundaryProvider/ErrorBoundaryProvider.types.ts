import { ReactNode } from "react";

export interface ErrorBoundaryProviderState {
  hasError?: boolean;
}

export interface ErrorBoundaryProviderProps {
  children: ReactNode;
}
export interface ErrorPageProps {
  handle?: () => void;
}
