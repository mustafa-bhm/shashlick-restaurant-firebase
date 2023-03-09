// import orders from "../../assets/data/orders.json";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

//firebase
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue, get } from "firebase/database";

const Orders = () => {
  const [orders, setOrders] = useState({});

  // get order from firebase
  const getOrders = () => {
    const ordersRef = ref(db, "orders");
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.exportVal();
      const dataEntries = Object.entries(data);

      console.log("entries 1st id", dataEntries);
      console.log("entries 1st id", dataEntries[0][0]);
      console.log("entries 1st created at", dataEntries[0][1].createdAt);
      console.log("entries 1st dish title", dataEntries[0][1].items[0].title);
      console.log(
        "entries customer street name ",
        dataEntries[0][1].orderedFromCustomer.streetName
      );
      console.log(
        "entries customer street number ",
        dataEntries[0][1].orderedFromCustomer.streetNumber
      );
      console.log(
        "entries customer street postal code ",
        dataEntries[0][1].orderedFromCustomer.postalCode
      );
      console.log("entries price", dataEntries[0][1].items[0].price);
      console.log("entries status", dataEntries[0][1].status.ordered);
      setOrders(dataEntries);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

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
          </>
        );
      })}
    </div>
  );
};

export default Orders;
