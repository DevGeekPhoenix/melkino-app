import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";

interface IProgressProviderProps {
  children?: ReactNode;
}

const ProgressProvider = ({ children }: IProgressProviderProps) => {
  const router = useRouter();

  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());

    return () => {
      router.events.off("routeChangeStart", () => NProgress.start());
      router.events.off("routeChangeComplete", () => NProgress.done());
      router.events.off("routeChangeError", () => NProgress.done());
    };
  }, [router.events]);

  return <>{children}</>;
};

export default ProgressProvider;
