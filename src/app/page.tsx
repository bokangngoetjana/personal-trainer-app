"use client"
import {Button, Layout, Typography, Row, Col} from "antd";
import Link from "next/link";

const {Header, Content} = Layout;
const {Title, Paragraph} = Typography;

const Home = () => {
  return(
    <Layout>
      <Header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Title level={3} style={{color: "white", margin: 0}}>
          FitFlow 
        </Title>
        <div>
          <Link href="/login"><Button type="link" style={{color: "white"}}>Login</Button></Link>
          <Link href="/register"><Button type="primary">Register</Button></Link>
        </div>
      </Header>
      <Content style={{padding: "80px 50px", minHeight: "80vh"}}>
        <Row justify="center" align="middle">
          <Col xs={24} md={12} style={{ textAlign: "center" }}>
            <Title>Welcome to FitFlow</Title>
            <Paragraph style={{ fontSize: "16px" }}>
              Get started with your workout plan
            </Paragraph>
            <Link href="/register">
              <Button size="large" type="primary">
                Get Started
              </Button>
            </Link>
          </Col>
        </Row>
      </Content>
      <footer style={{ textAlign: "center"}}>
        FitFlow ©{new Date().getFullYear()} Created by Bokang
      </footer>
    </Layout>
  )
}
export default Home;
