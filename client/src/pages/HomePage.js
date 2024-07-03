import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/user/getAllDoctors`,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1
        className="text-center"
        style={{
          color: "white",
          fontWeight: "700",
        }}
      >
        Our Doctors
      </h1>
      <Row justify="space-around">
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;