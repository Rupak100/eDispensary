import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/DoctorList.css";
const BookAppointment = () => {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctor] = useState(null);
  const params = useParams();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [available, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const handleAvailability = async () => {
    const token = localStorage.getItem("token");

    try {
      // dispatch(showLoading());
      const res = await axios.post(
        `${backendUrl}/api/v1/user/check-availability`,
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Error checking availability");
      console.error("Error checking availability:", error);
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!date || !time) {
        return alert("Date and Time are required");
      }
      const confirmed = window.confirm(
        "Are you sure you want to book this appointment?"
      );
      if (!confirmed) {
        return; // If user cancels, do not proceed with booking
      }

      dispatch(showLoading());
      const res = await axios.post(
        `${backendUrl}/api/v1/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/appointments");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Error in Booking Appointment");
      dispatch(hideLoading());
      console.error("Error booking appointment:", error);
    } finally {
      setIsAvailable((available) => !available);
    }
  };

  const getDoctorData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${backendUrl}/api/v1/doctor/doctorInfo`,
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        console.error("Failed to fetch doctor data");
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center" style={{ color: "white", fontWeight: "700" }}>
        Booking Page
      </h1>
      <div className="container m-2" style={{ padding: "70px" }}>
        {doctors && (
          <div className="d-flex justify-content-around align-items-center">
            <div className="doctor-card">
              <h5>
                Dr.{doctors.firstName} {doctors.lastName}
              </h5>
              <h5>Specialization : {doctors.specialization} years</h5>
              <h5>Fees : $ {doctors.feesperConsultation}</h5>
              <h5>
                Timings : {doctors.timings && doctors.timings[0]} -{" "}
                {doctors.timings && doctors.timings[1]}{" "}
              </h5>
            </div>
            <div className="d-flex flex-column w-50">
              <DatePicker
                format="DD-MM-YYYY"
                className="m-2 border border-primary"
                onChange={(value) => {
                  const formattedDate = value
                    ? value.format("DD-MM-YYYY")
                    : null;
                  setDate(formattedDate);
                }}
              />
              <TimePicker
                format="HH"
                className="m-2 border border-info"
                onChange={(value) => {
                  // If a value is selected, set minutes to 0
                  if (value) {
                    const newValue = value.clone().minute(0);
                    const formattedTime = newValue.format("HH:mm");
                    setTime(formattedTime);
                  } else {
                    setTime(null);
                  }
                }}
              />

              <Button
                className="btn btn-primary m-2"
                onClick={handleAvailability}
              >
                Check Availability
              </Button>
              {available && (
                <Button
                  className="btn btn-secondary m-2"
                  onClick={handleBooking}
                >
                  Book Now
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookAppointment;
