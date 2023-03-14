import React, { useState } from "react";
import { Form, Input, Card, Button, message } from "antd";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { async } from "@firebase/util";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";

const Settings = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [restaurant, setRestaurant] = useState({});
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  const getAddressLatLng = async (address) => {
    setAddress(address);
    const geocodedByAddress = await geocodeByAddress(address.label);
    const latLng = await getLatLng(geocodedByAddress[0]);
    setCoordinates(latLng);
  };

  const createNewRestaurant = () => {
    const reference = ref(db, "restaurants/");

    let newRestaurant = {
      name: name,
      image:
        "https://cdn.oliverbonacininetwork.com/uploads/sites/42/2022/04/Canoe-Interior-Evening-Vibes-5170.jpg",
      deliveryFee: 0,
      minDeliveryTime: 15,
      maxDeliveryTime: 120,
      address: address.label,
      lat: coordinates.lat,
      lng: coordinates.lng,
    };
    set(reference, newRestaurant);

    setRestaurant(newRestaurant);

    message.success("Restaurant has been created !");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
