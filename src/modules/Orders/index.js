// import orders from "../../assets/data/orders.json";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

//firebase
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue, get } from "firebase/database";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // get order from firebase
  const ordersRef = ref(db, "orders");
  useEffect(() => {
    onValue(ordersRef, (snapshot) => {
      setOrders([]);
      const data = snapshot.exportVal();
      // setOrders(Object.entries(data));
      setOrders(Object.entries(data));
    });
  }, []);

  console.log("ordersss", orders);
  const navigate = useNavigate();

  const renderOrderStatus = (orderStatus) => {
    if (orderStatus === "Accepted") {
      return <Tag color={"green"}>{orderStatus}</Tag>;
    }
    if (orderStatus === "Pending") {
      return <Tag color={"orange"}>{orderStatus}</Tag>;
    }
    if (orderStatus === "Declined") {
      return <Tag color={"red"}>{orderStatus}</Tag>;
    }
  };

  // console.log("entries price", dataEntries[0][1].items[0].price);
  console.log(orders);
  return (
    <Card title={"Orders"} style={{ margin: 20 }}>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created At</th>
            <th>Address</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order[0]}>
              <td>{order[0]}</td>
              <td>{order[1].createdAt}</td>
              <td>
                {order[1].orderedFromCustomer.streetName}{" "}
                {order[1].orderedFromCustomer.postalCode}
              </td>
              <td>{order[1].items[0].price} </td>
              <td>status</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Orders;
