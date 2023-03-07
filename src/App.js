import { Layout, Image } from "antd";
import SideMenu from "../src/components/SideMenu";
import AppRoutes from "./components/AppRoutes";

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "white" }}>
        <Image
          src="https://i.pinimg.com/originals/18/06/d3/1806d3e6bd17d8bedfa85db46058f082.png"
          preview={false}
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Shashlick Restaurant Dashboard ©2023
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
