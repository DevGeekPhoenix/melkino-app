import { useAppSelector } from "./selectors";

export const useDarkSelector = () => {
  const isDarkState = useAppSelector((state) => state.app.isDark);
  return isDarkState;
};
