import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/domains/Home"));

type HomePageProps = {};

const HomePage: NextPage<HomePageProps> = ({}) => {
  return <Home />;
};

HomePage.prototype = {
  pageConfig: {
    pageTitleKey: "homepage",
  },
};

export default HomePage;
