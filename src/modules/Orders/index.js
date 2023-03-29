import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

//firebase
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue, get } from "firebase/database";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // get order from firebase // orders zones
  const ordersRef = ref(db, "order_Zones");
  useEffect(() => {
    onValue(ordersRef, (snapshot) => {
      // setOrders([]);
      const data = snapshot.exportVal();

      // console.log("data entries", Object.entries(data));
      // console.log("orders", orders);

      setOrders(Object.entries(data));
    });
  }, []);
  // console.log("orders", orders);

  const navigate = useNavigate();

  // to get time passed since the order was placed
  function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    if (diff < msPerMinute) {
      return Math.round(diff / 1000) + " seconds ago";
    } else if (diff < msPerHour) {
      return Math.round(diff / msPerMinute) + " minutes ago";
    } else if (diff < msPerDay) {
      return Math.round(diff / msPerHour) + " hours ago";
    } else if (diff < msPerMonth) {
      return Math.round(diff / msPerDay) + " days ago";
    } else if (diff < msPerYear) {
      return Math.round(diff / msPerMonth) + " months ago";
    } else {
      return Math.round(diff / msPerYear) + " years ago";
    }
  }

  // to get the status
  function getStatus(obj) {
    for (const key in obj) {
      if (obj[key] === true) {
        return key;
      }
    }
  }

  return (
    <Card title={"Orders"} style={{ margin: 20 }}>
      <table>
        <thead>
          <tr>
            <th style={{ width: "14rem" }}>Order ID</th>
            <th style={{ width: "10rem" }}>Created </th>
            <th style={{ width: "10rem" }}>Customer Address</th>
            <th style={{ width: "10rem" }}>Price</th>
            <th style={{ width: "10rem" }}>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) =>
            Object.entries(item[1]).map((ord) => (
              <>
                <tr key={ord[0]}>
                  <td>{ord[0]}</td>
                  <td style={{ textAlign: "center" }}>
                    {getTimeAgo(ord[1].createdAt)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {ord[1].orderedFromCustomer.postalCode}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {ord[1].items[0].price}
                  </td>
                  <td
                    style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => navigate(`order/${item[0]}/${ord[0]}`)}
                  >
                    {getStatus(ord[1].status)}
                  </td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default Orders;
