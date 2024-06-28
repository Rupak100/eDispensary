import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { message, Table, Popconfirm, Button } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/Appointments.css"; // Import custom CSS for styling
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Function to fetch appointments from the server
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/get-appointment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch appointments");
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    getAppointments();
  }, []);

  // Function to handle appointment deletion
  const handleDelete = async (record) => {
    try {
      const res = await axios.delete(`/api/v1/doctor/delete-appointment`, {
        data: { appointmentId: record._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments(); // Refresh appointments after deletion
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  // Function to handle payment redirection
  const handlePayment = (record) => {
    // Navigate to the dummy payment page if status is pending
    if (record.status === "pending") {
      navigate(`/payment/${record._id}`);
    }
  };

  // Function to generate and download PDF
  const handleDownload = (record) => {
    const doc = new jsPDF();

    doc.text("Appointment Details", 10, 10);
    doc.autoTable({
      startY: 20,
      head: [["Field", "Details"]],
      body: [
        ["Appointment ID", record._id],
        [
          "Doctor Name",
          `${record.doctorInfo.firstName} ${record.doctorInfo.lastName}`,
        ],
        ["Doctor Phone", record.doctorInfo.phone],
        ["Doctor Specialization", record.doctorInfo.specialization],
        ["Date", moment(record.date).format("DD-MM-YYYY")],
        ["Time", moment(record.time).format("HH:mm")],
        ["Status", record.status],
      ],
    });

    doc.save(`appointment_${record._id}.pdf`);
  };

  // Table columns definition
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorInfo",
      key: "doctorInfo",
      render: (doctorInfo) => (
        <span>
          {doctorInfo.firstName} {doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Doctor Phone",
      dataIndex: "doctorInfo",
      key: "doctorPhone",
      render: (doctorInfo) => <span>{doctorInfo.phone}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (date, record) => (
        <span>
          {moment(date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="appointment-actions">
          {record.status === "pending" && (
            <>
              <Button
                type="primary"
                className="action-btn"
                onClick={() => handlePayment(record)}
              >
                Payment
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this appointment?"
                onConfirm={() => handleDelete(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" className="action-btn">
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
          {record.status === "approved" && (
            <Button
              type="primary"
              className="btn btn-success"
              onClick={() => handleDownload(record)}
            >
              Download Invoice
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="appointments-container">
        <h1 className="appointments-heading">Your Appointments</h1>
        <Table
          columns={columns}
          dataSource={appointments}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Layout>
  );
};

export default Appointments;
