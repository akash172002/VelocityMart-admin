import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();

  const { id } = router.query;

  function goBack() {
    router.push("/orders");
  }

  async function deleteOrder() {
    await axios.delete("/api/orders?id=" + id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">Do you reall want to delete Order?</h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteOrder}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
