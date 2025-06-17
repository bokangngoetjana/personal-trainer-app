"use client";

import React, { useEffect, useState } from "react";
import { Table, Typography, message } from "antd";
import axiosInstance from "@/utils/axiosInstance";

const { Title } = Typography;

interface Client {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
}

const TrainerPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      const token = sessionStorage.getItem("token");

      if (!user?.id || !token) {
        message.error("Trainer not logged in.");
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get<{clients: Client[]}>(`/api/trainers/${user.id}/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClients(response.data.clients || []);
      } catch (error) {
        message.error("Failed to load clients.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <Title level={3}>My Clients</Title>
      <Table
        dataSource={clients}
        loading={loading}
        rowKey="id"
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Email", dataIndex: "email", key: "email" },
          { title: "Age", dataIndex: "age", key: "age" },
          { title: "Gender", dataIndex: "gender", key: "gender" },
        ]}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TrainerPage;
