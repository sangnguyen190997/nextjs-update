import Head from "next/head";
import Warning from "./components/alerts/warnig";
import HomeLayout from "./components/Home/HomeLayout";
import Page from "./components/Home/HomeLayout";
import DefaultLayout from "./components/Layout/DefaultLayout";

export default function Home() {
  return (
    <HomeLayout>
      {process.env.NODE_ENV === "production" && (
        <Warning message="This is not a real e-commerce, it is just a code exercise." />
      )}
    </HomeLayout>
  );
}
