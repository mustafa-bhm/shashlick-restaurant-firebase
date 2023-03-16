import React, { useState } from "react";
import { Form, Input, Card, Button, message } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [restName, setRestName] = useState("");
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [restaurant, setRestaurant] = useState("");
  const [deliveryFees, setDeliveryFees] = useState("");
  const [minDeliveryTime, setminDeliveryTime] = useState("");
  const [maxDeliveryTime, setmaxDeliveryTime] = useState("");
  const [userName, setUserName] = useState("");
  const [restImage, setRestImage] = useState("");

  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  // console.log("uuid", uuidv4());

  const getAddressLatLng = async (address) => {
    setAddress(address);
    const geocodedByAddress = await geocodeByAddress(address.label);
    const latLng = await getLatLng(geocodedByAddress[0]);
    setCoordinates(latLng);
  };

  const createNewRestaurant = async () => {
    let restaurantProfile = {
      Id: uuidv4(),
      name: restName,
      image: restImage,
      deliveryFee: deliveryFees,
      minDeliveryTime: minDeliveryTime,
      maxDeliveryTime: maxDeliveryTime,
      address: address.label,
      lat: coordinates.lat,
      lng: coordinates.lng,
      user: userName,
    };

    set(ref(db, `/restaurants/${restaurantProfile.Id}`), {
      restaurantProfile,
      createdAt: new Date().toString(),
    }).catch((err) => {
      console.log("err", err);
    });
    setRestaurant(restaurantProfile);
    message.success("Restaurant has been created !");
    navigate("/");
  };

  return (
    <Card title="Restaurant Details" style={{ margin: 20 }}>
      <Form
        layout="vertical"
        wrapperCol={{ span: 8 }}
        onFinish={createNewRestaurant}
      >
        <Form.Item label="Restaurant Name" required>
          <Input
            placeholder="Enter restaurant name here"
            value={restName}
            onChange={(e) => setRestName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Delivery fees " required>
          <Input
            placeholder="Enter delivery fees"
            value={deliveryFees}
            onChange={(e) => setDeliveryFees(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Min delivery time in min " required>
          <Input
            placeholder="Enter min delivery time"
            value={minDeliveryTime}
            onChange={(e) => setminDeliveryTime(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Max Delivery time in min" required>
          <Input
            placeholder="Enter Max Delivery time"
            value={maxDeliveryTime}
            onChange={(e) => setmaxDeliveryTime(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="User's name" required>
          <Input
            placeholder="Enter your user's name here"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Restaurant Image" required>
          <Input
            placeholder="Enter your restaurant image link here"
            value={restImage}
            onChange={(e) => setRestImage(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Restaurant Address" required>
          <GooglePlacesAutocomplete
            apiKey={API_KEY}
            selectProps={{
              value: address,
              onChange: getAddressLatLng,
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <span>
        {coordinates?.lat} - {coordinates?.lng}
      </span>
    </Card>
  );
};

export default Settings;
