import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import logo from "../assets/logo.png";
import image1 from "../assets/Appointment1.jpg";
import image2 from "../assets/Appointment2.jpg";
import image3 from "../assets/Appointment3.jpg";
import Footer from "./Footer";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleDoctorLogin = () => {
    navigate("/login", { state: { userType: "doctor" } });
  };

  const handlePatientLogin = () => {
    navigate("/login", { state: { userType: "patient" } });
  };

  const handleApplyDoctor = () => {
    navigate("/apply-doctor");
  };

  const images = [image1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="dashboard-heading">
            <img src={logo} alt="Logo" className="logo" />
            <h1>eDispensary</h1>
          </div>
          <div className="auth-buttons">
            <button
              className="auth-button doctor-login"
              onClick={handleDoctorLogin}
            >
              Doctor Login
            </button>
            <button
              className="auth-button patient-login"
              onClick={handlePatientLogin}
            >
              Patient Login
            </button>
            <button
              className="auth-button apply-doctor"
              onClick={handleApplyDoctor}
            >
              Apply Doctor
            </button>
          </div>
        </header>
        <main>
          <div className="slideshow">
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
            />
          </div>
          <div className="services">
            <h1 style={{ fontWeight: "bold" }}>Our Services</h1>
            <div className="department">
              <div className="department-box">
                <h3>Cardiology Dept</h3>
                <p>Specialized care for heart-related issues.</p>
                <ul>
                  <li>
                    <strong>Specialties:</strong>
                    <ul>
                      <li>Interventional Cardiology</li>
                      <li>Electrophysiology</li>
                      <li>Heart Failure</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Doctors:</strong>
                    <ul>
                      <li>Dr. John Smith</li>
                      <li>Dr. Emily Davis</li>
                      <li>Dr. Michael Brown</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="department-box">
                <h3>Orthopedics Dept</h3>
                <p>Treatment for bone and joint-related problems.</p>
                <ul>
                  <li>
                    <strong>Specialties:</strong>
                    <ul>
                      <li>Joint Replacement</li>
                      <li>Sports Medicine</li>
                      <li>Orthopedic Trauma</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Doctors:</strong>
                    <ul>
                      <li>Dr. Sarah Johnson</li>
                      <li>Dr. Robert Anderson</li>
                      <li>Dr. Jennifer Lee</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="department-box">
                <h3>Neuro Surgery</h3>
                <p>Advanced surgical solutions for neurological conditions.</p>
                <ul>
                  <li>
                    <strong>Specialties:</strong>
                    <ul>
                      <li>Brain Tumors</li>
                      <li>Spinal Surgery</li>
                      <li>Neurovascular Disorders</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Doctors:</strong>
                    <ul>
                      <li>Dr. Thomas Wilson</li>
                      <li>Dr. Samantha Roberts</li>
                      <li>Dr. David Martinez</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="department-box">
                <h3>Ophthalmology Dept</h3>
                <p>Comprehensive eye care services.</p>
                <ul>
                  <li>
                    <strong>Specialties:</strong>
                    <ul>
                      <li>General Ophthalmology</li>
                      <li>Retina Services</li>
                      <li>Cornea and Refractive Surgery</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Doctors:</strong>
                    <ul>
                      <li>Dr. Laura Adams</li>
                      <li>Dr. Mark Roberts</li>
                      <li>Dr. Sophia Garcia</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="department-box">
                <h3>Dermatology Dept</h3>
                <p>Skin care and treatment of dermatological conditions.</p>
                <ul>
                  <li>
                    <strong>Specialties:</strong>
                    <ul>
                      <li>General Dermatology</li>
                      <li>Cosmetic Dermatology</li>
                      <li>Mohs Surgery</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Doctors:</strong>
                    <ul>
                      <li>Dr. Olivia Brown</li>
                      <li>Dr. Ethan Parker</li>
                      <li>Dr. Natalie Wright</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="department-box">
                <h3>Pediatric Dept</h3>
                <p>Comprehensive medical care for children.</p>
                <ul>
                  <li>
                    <strong>Specialties:</strong>
                    <ul>
                      <li>Pediatric Cardiology</li>
                      <li>Pediatric Neurology</li>
                      <li>Pediatric Oncology</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Doctors:</strong>
                    <ul>
                      <li>Dr. William Thompson</li>
                      <li>Dr. Ava Ramirez</li>
                      <li>Dr. James Green</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
