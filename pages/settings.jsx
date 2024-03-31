import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function SettingsPage({ swal }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [featuredProductId, setFeaturedProductId] = useState("");

  const [shippingFee, setShippingFee] = useState("");

  async function saveSettings() {
    setLoading(true);
    await axios.put("/api/setting", {
      name: "featuredProductId",
      value: featuredProductId,
    });
    await axios.put("/api/setting", {
      name: "shippingFee",
      value: shippingFee,
    });
    setLoading(false);
    await swal.fire({
      title: "Setting saved",
      icon: "success",
    });
  }

  useEffect(() => {
    setLoading(true);
    fetchAll().then(() => {
      setLoading(false);
    });
  }, []);

  async function fetchAll() {
    await axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
    await axios.get("/api/setting?name=featuredProductId").then((res) => {
      setFeaturedProductId(res.data.value);
    });

    await axios.get("/api/setting?name=shippingFee").then((res) => {
      setShippingFee(res.data.value);
    });
  }

  return (
    <Layout>
      <h1>Your e-commerce store setting</h1>
      {loading && <Spinner />}
      {!loading && (
        <>
          <label>Featured Product</label>
          <select
            value={featuredProductId}
            onChange={(e) => setFeaturedProductId(e.target.value)}
          >
            {products.length > 0 &&
              products.map((product) => (
                <option value={product._id} key={product._id}>
                  {product.title}
                </option>
              ))}
          </select>
          <label>Shipping price</label>
          <input
            type="number"
            value={shippingFee}
            onChange={(e) => setShippingFee(e.target.value)}
          />
          <div>
            <button onClick={saveSettings} className="btn-primary">
              Save settings
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }) => <SettingsPage swal={swal} />);
