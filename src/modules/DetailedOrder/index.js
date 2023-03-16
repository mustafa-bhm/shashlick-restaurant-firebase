import { Card, Descriptions, Divider, List, Button } from "antd";
import dishes from "../../assets/data/dishes.json";
import { useParams } from "react-router-dom";
import { get, onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const DetailedOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  // fetch order details by order id from firebase
  const ordersRef = ref(db, `orders/${id}`);
  useEffect(() => {
    get(ordersRef).then((snapshot) => {
      const data = snapshot.val();
      // console.log("Order details:", data);
      setOrder(data);
    });
  }, []);

  // console.log("order", order?.items[0]?.title);

  return (
    <Card title={`Order ${id}`} style={{ margin: 20 }}>
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Customer">
          {order?.orderedFromCustomer.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          {order?.orderedFromCustomer.streetName},
          {order?.orderedFromCustomer.streetNumber},
          {order?.orderedFromCustomer.postalCode}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <div style={styles.dishes}>
        <div style={{ fontWeight: "bold" }}>{order?.items[0].title}</div>
        <div>{order?.items[0].price}</div>
      </div>
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>{order?.items[0]?.price}</h2>
      </div>
      <Divider />
      <div style={styles.buttonsContainer}>
        <Button block type="danger" size="large" style={styles.button}>
          Decline Order
        </Button>
        <Button block type="primary" size="large" style={styles.button}>
          Accept Order
        </Button>
      </div>
      <Button block type="primary" size="large">
        Food Is Done
      </Button>
    </Card>
  );
};

const styles = {
  totalSumContainer: {
    flexDirection: "row",
    display: "flex",
  },
  totalPrice: {
    marginLeft: "auto",
    fontWeight: "bold",
  },
  buttonsContainer: {
    display: "flex",
    paddingBottom: 30,
  },
  button: {
    marginRight: 20,
    marginLeft: 20,
  },
  dishes: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default DetailedOrder;
