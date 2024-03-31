import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Order } from "@/models/Order";
import { subHours } from "date-fns";

export default function HomeStats() {
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="my-4">
        <Spinner />
      </div>
    );
  }

  const ordersToday = order.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24)
  );
  const ordersWeek = order.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7)
  );
  const ordersMonth = order.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30)
  );

  function orederTotal(orders) {
    let sum = 0;

    orders.forEach((order) => {
      const { line_items } = order;
      line_items.forEach((li) => {
        const lineSum = (li.quantity * li.price_data.unit_amount) / 100;
        sum += lineSum;
      });
    });

    return new Intl.NumberFormat("INR").format(sum);
  }

  return (
    <div className="">
      <h2>Orders</h2>
      <div className="tile-grid">
        <div className="tile ">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">{ordersToday.length}</div>
          <div className="tile-disc">{ordersToday.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">{ordersWeek.length}</div>
          <div className="tile-disc">{ordersWeek.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">{ordersMonth.length}</div>
          <div className="tile-disc">{ordersMonth.length} orders today</div>
        </div>
      </div>

      <h2>Revenue</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="tile ">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">₹{orederTotal(ordersToday)}</div>
          <div className="tile-disc">{ordersToday.length} orders today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">₹{orederTotal(ordersWeek)}</div>
          <div className="tile-disc">{ordersWeek.length} orders week</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">₹{orederTotal(ordersMonth)}</div>
          <div className="tile-disc">{ordersMonth.length} orders month</div>
        </div>
      </div>
    </div>
  );
}
