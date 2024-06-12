import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
// Import your images
import logo from "../assets/logo.png";
import image1 from "../assets/Appointment1.jpg";
import image2 from "../assets/Appointment2.jpeg";
import image3 from "../assets/Appointment3.jpg";

function Dashboard() {
  const navigate = useNavigate();

  const handleDoctorLogin = () => {
    navigate("/login", { state: { userType: "doctor" } });
  };

  const handlePatientLogin = () => {
    navigate("/login", { state: { userType: "patient" } });
  };

  // Array of image paths
  const images = [image1, image2, image3];

  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to move to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to automatically move to the next image at a regular interval
  useEffect(() => {
    const intervalId = setInterval(goToNextImage, 3000); // Change slide every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard">
      <style jsx="true">{`
        .dashboard {
          font-family: "Poppins", sans-serif; /* Apply Poppins font to the entire dashboard */
          text-align: center;
          text-align: center;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between; /* Align logo and buttons at each end */
          align-items: center; /* Vertically center align items */
          padding: 0.4rem 0.3rem;

          background-color: #282c34;
        }

        .auth-button {
          color: white;
          text-decoration: none;
          font-size: 16px; /* Fixed font size */
          background-color: #61dafb;
          padding: 10px 20px; /* Fixed padding */
          border-radius: 5px;
          transition: background-color 0.3s ease;
          width: 150px; /* Fixed width for the buttons */
        }

        .auth-buttons {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          align-items: center;
          margin-right: 1rem; /* Adjust margin for better spacing */
        }

        .auth-button:hover {
          background-color: #21a1f1;
        }

        .slideshow {
          position: relative;
          width: 100%; /* Set width to 100% of the screen */
          height: 60vh; /* Set height to 60% of viewport height */
          margin: auto;
          overflow: hidden;
        }

        .slideshow img {
          width: 100%; /* Set width to 100% of the container */
          height: 100%;
          object-fit: cover; /* Ensure images maintain aspect ratio */
        }

        .logo {
          max-width: 100px; /* Adjust the size of the logo as needed */
          height: auto;
          margin-right: auto;
        }

        .dashboard-heading {
          display: flex;
          align-items: center;
        }

        .dashboard-heading h1 {
          margin-left: 1rem; /* Adjust spacing between logo and heading */
        }

        .doctor-login,
        .patient-login {
          /* Set fixed width for both buttons */
          width: 150px;
        }

        .services {
          padding: 2rem 0;
        }

        .department {
          display: flex;
          justify-content: space-around;
          margin-top: 2rem;
        }

        .department-box {
          width: calc(30% - 20px);
          background-color: #f0f0f0;
          padding: 1rem;
          border-radius: 10px;
        }
      `}</style>
      <header className="dashboard-header">
        <div className="dashboard-heading">
          <img src={logo} alt="Logo" className="logo" />
          <h1
            style={{
              color: "white",
            }}
          >
            eDispensary
          </h1>
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
          <h1
            style={{
              fontWeight: "bold",
            }}
          >
            Our Services
          </h1>
          <div className="department">
            <div className="department-box">
              <h3>Cardiology Dept</h3>
              <p>Specialized care for heart-related issues.</p>
            </div>
            <div className="department-box">
              <h3>Orthopedics Dept</h3>
              <p>Treatment for bone and joint-related problems.</p>
            </div>
            <div className="department-box">
              <h3>Neuro Surgery</h3>
              <p>Advanced surgical solutions for neurological conditions.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
