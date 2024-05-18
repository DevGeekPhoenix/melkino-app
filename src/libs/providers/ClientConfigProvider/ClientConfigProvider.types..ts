import { ReactNode } from "react";

export interface ClientConfigProviderProps {
  clientConfig: { theme: string };
  children: ReactNode;
}
