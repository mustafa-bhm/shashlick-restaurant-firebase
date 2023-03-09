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

  const tableColumns = [
    {
      title: "Order ID",
      dataIndex: "orderID",
      key: "orderID",
    },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} $`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderOrderStatus,
    },
  ];

  return (
    // <Card title={"Orders"} style={{ margin: 20 }}>
    //   {/* <Table
    //     dataSource={orders}
    //     columns={tableColumns}
    //     rowKey="orderID"
    //     onRow={(orderItem) => ({
    //       onClick: () => navigate(`order/${orderItem.orderID}`),
    //     })}
    //   /> */}

    // </Card>;

    <div>
      orders
      {orders.map((order, key) => {
        return (
          <>
            <p>order ID {order[0]}</p>
            <p>created At {order[1].createdAt}</p>
            <p>Delivery Address {order[1].orderedFromCustomer.streetName}</p>
            <p>Price {order[1].createdAt}</p>
            <p>Status {order[1].createdAt}</p>
          </>
        );
      })}
    </div>
  );
};

export default Orders;
