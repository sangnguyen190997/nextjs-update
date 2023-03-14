import { useRouter } from "next/router";

import Page from "../components/Home/HomeLayout";
import DefaultLayout from "../components/Layout/DefaultLayout";
import ProductSection from "../components/productSection";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  return (
    <DefaultLayout>
      <ProductSection category={category} />
    </DefaultLayout>
  );
}
