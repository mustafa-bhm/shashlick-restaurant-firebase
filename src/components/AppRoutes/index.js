import DetailedOrder from "../../modules/DetailedOrder";
import Orders from "../../modules/Orders";
import RestaurantMenu from "../../modules/RestaurantMenu";
import CreateMenuItem from "../../modules/CreateMenuItem";
import OrderHistory from "../../modules/OrderHisotry";
import Settings from "../../modules/Settings";
import Login from "../../modules/LoginForm";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="order/:zone/:id" element={<DetailedOrder />} />
      <Route path="menu" element={<RestaurantMenu />} />
      <Route path="menu/create" element={<CreateMenuItem />} />
      <Route path="order-history" element={<OrderHistory />} />
      <Route path="settings" element={<Settings />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
