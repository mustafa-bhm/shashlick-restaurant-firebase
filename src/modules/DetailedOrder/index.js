import { Card, Descriptions, Divider, List, Button } from "antd";
import { useParams } from "react-router-dom";
import { get, onValue, ref, update } from "firebase/database";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const DetailedOrder = () => {
  const { id } = useParams();
  const { zone } = useParams();
  const [order, setOrder] = useState([]);
  const [streetName, setStreetName] = useState();
  const [customerName, setCustomerName] = useState();
  const [streetNumber, setStreetNumber] = useState();
  const [postalCode, setPostalCode] = useState();
  const [dishTitle, setDishTitle] = useState();
  const [dishPrice, setDishPrice] = useState();
  const [orderStatus, setOrderStatus] = useState({});

  // get order from firebase // orders zones
  const ordersRef = ref(db, `order Zones/${zone}/${id}`);
  useEffect(() => {
    onValue(ordersRef, (snapshot) => {
      const data = snapshot.exportVal();
      let dataEntries = Object.entries(data);
      setCustomerName(dataEntries[4][1].firstName);
      setStreetNumber(dataEntries[4][1].streetNumber);
      setStreetName(dataEntries[4][1].streetName);
      setPostalCode(dataEntries[4][1].postalCode);
      setDishTitle(dataEntries[3][1][0].title);
      setDishPrice(dataEntries[3][1][0].price);
      setOrderStatus(dataEntries[6][1]);
    });
  }, []);

  // *** Update order status *** ///
  const acceptOrder = () => {
    // 1 = >  change ordered : true to false
    orderStatus.ordered = false;

    // 2 => add acceptedByRest: true
    orderStatus["acceptedByRest"] = true;

    // 3 => push these changes to the database
    update(ordersRef, { status: orderStatus })
      .then(console.log("Status updated successfully !"))
      .catch((error) => console.log(error));
  };
  const declineOrder = () => {
    orderStatus.ordered = false;
    orderStatus.declinedByRest = true;
    update(ordersRef, { status: orderStatus })
      .then(console.log("Status updated successfully !"))
      .catch((error) => console.log(error));
  };
  const foodIsDone = () => {
    orderStatus.acceptedByRest = false;
    orderStatus.prepared = true;
    update(ordersRef, { status: orderStatus })
      .then(console.log("Status updated successfully !"))
      .catch((error) => console.log(error));
  };
  return (
    <Card title={`Order ${id}`} style={{ margin: 20 }}>
      <Descriptions bordered column={{ lg: 1, md: 1, sm: 1 }}>
        <Descriptions.Item label="Customer">{customerName}</Descriptions.Item>
        <Descriptions.Item label="Customer Address">
          {streetNumber} {streetName}
          {postalCode}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <div style={styles.dishes}>
        <div style={{ fontWeight: "bold" }}>{dishTitle}</div>
        <div>{dishPrice}</div>
      </div>
      <Divider />
      <div style={styles.totalSumContainer}>
        <h2>Total:</h2>
        <h2 style={styles.totalPrice}>{dishPrice}</h2>
      </div>
      <Divider />

      <div style={styles.buttonsContainer}>
        {orderStatus.ordered === true && (
          <>
            <Button
              block
              // type="primary"
              size="large"
              // style={styles.button}
              style={{ background: "red", borderColor: "yellow" }}
              onClick={declineOrder}
            >
              Decline Order
            </Button>
            <Button
              block
              type="primary"
              size="large"
              style={styles.button}
              onClick={acceptOrder}
            >
              Accept Order
            </Button>
          </>
        )}
      </div>
      {orderStatus.acceptedByRest === true && (
        <Button block type="primary" size="large" onClick={foodIsDone}>
          Food Is Done
        </Button>
      )}
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
  buttonD: {
    marginRight: 20,
    marginLeft: 20,
  },
  dishes: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default DetailedOrder;
