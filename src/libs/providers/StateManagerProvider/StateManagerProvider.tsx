import type { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

const StateManagerProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

export default StateManagerProvider;
