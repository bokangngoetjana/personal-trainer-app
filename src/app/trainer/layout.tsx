"use client";

import React from "react";
import { 
  TeamOutlined, 
  UserOutlined, 
  CalendarOutlined, 
  PlusOutlined,
  AppstoreOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Dropdown, Badge, Typography } from "antd";
import { useRouter, usePathname } from "next/navigation";

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  backgroundColor: "#1a1a1a",
};

const TrainerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/trainer",
      icon: <UserOutlined />,
      label: "Dashboard",
    },
    {
      key: "/trainer/clients",
      icon: <TeamOutlined />,
      label: "My Clients",
    },
    {
      key: "/trainer/clients/create",
      icon: <PlusOutlined />,
      label: "Add Client",
    },
    {
      key: "/trainer/schedule",
      icon: <CalendarOutlined />,
      label: "Schedule",
    },
    {
      key: "/trainer/mealPlans",
      icon: <FileTextOutlined />,
      label: "Meal Plans",
      children: [
        {
          key: "/trainer/mealPlans",
          label: "All Plans",
        },
        {
          key: "/trainer/mealPlans/create",
          label: "Create Plan",
        },
      ],
    },
    {
      key: "/trainer/foodItems",
      icon: <AppstoreOutlined />,
      label: "Food Library",
      children: [
        {
          key: "/trainer/foodItems",
          label: "All Items",
        },
        {
          key: "/trainer/foodItems/create",
          label: "Add Item",
        },
      ],
    },
  ];

//   const userMenu = (
//     <Menu>
//       <Menu.Item key="profile" onClick={() => router.push("/trainer/profile")}>
//         <UserOutlined /> Profile
//       </Menu.Item>
//       <Menu.Item key="settings" onClick={() => router.push("/trainer/settings")}>
//         <UserOutlined /> Settings
//       </Menu.Item>
//       <Menu.Divider />
//       {/* <Menu.Item key="logout" onClick={logout}>
//         <LogoutOutlined /> Logout
//       </Menu.Item> */}
//     </Menu>
//   );

  return (
    <Layout hasSider className="min-h-screen">
      {/* Sidebar */}
      <Sider 
        style={siderStyle}
        width={250}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div className="p-4 flex items-center justify-center border-b border-gray-800">
          <Text strong className="text-white text-xl">
            FITFLOW
          </Text>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={['/trainer/mealPlans', '/trainer/foodItems']}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ background: 'transparent', borderRight: 0 }}
        />
      </Sider>

      {/* Main Content */}
      <Layout>
        {/* Header */}
        <Header>
          <div className="flex justify-between items-center h-full">
            <div></div> {/* Empty div for spacing */}
            
            <div className="flex items-center gap-4">
              {/* <Badge count={5} size="small">
                <CalendarOutlined className="text-lg cursor-pointer" />
              </Badge>
              
              <Badge count={3} size="small">
                <TeamOutlined className="text-lg cursor-pointer" />
              </Badge> */}
              
              <Dropdown placement="bottomRight">
                {/* <Space className="cursor-pointer">
                  <Avatar 
                    size="default" 
                    icon={<UserOutlined />} 
                    src={user?.imageUrl}
                  />
                  <Text strong className="text-white">
                    {user?.name || 'Trainer'}
                  </Text>
                </Space> */}
              </Dropdown>
            </div>
          </div>
        </Header>

        {/* Content Area */}
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 112px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TrainerLayout;