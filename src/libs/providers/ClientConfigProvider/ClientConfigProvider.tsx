import type { ClientConfigProviderProps } from "./ClientConfigProvider.types.";
import { useAppDispatch } from "../StateManagerProvider/selectors";
import { setIsDark } from "../StateManagerProvider/App.reducer";

// Set store client config from cookies
const ClientConfigProvider = ({
  clientConfig,
  children,
}: ClientConfigProviderProps) => {
  const dispatch = useAppDispatch();

  const isDark = Boolean(clientConfig.theme === "dark");

  dispatch(setIsDark(isDark));

  return <>{children}</>;
};

export default ClientConfigProvider;
