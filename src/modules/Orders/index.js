import orders from "../../assets/data/orders.json";
import { Card, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

const Orders = () => {
  // get order from firebase
  const getOrders = () => {
    const ordersRef = ref(db, "orders");
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };
  getOrders();

  ///
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
    <Card title={"Orders"} style={{ margin: 20 }}>
      <Table
        dataSource={orders}
        columns={tableColumns}
        rowKey="orderID"
        onRow={(orderItem) => ({
          onClick: () => navigate(`order/${orderItem.orderID}`),
        })}
      />
    </Card>
  );
};

export default Orders;
