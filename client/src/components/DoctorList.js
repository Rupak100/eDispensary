import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/DoctorList.css";

const DoctorList = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-name">
        Dr. {doctor.firstName} {doctor.lastName}
      </div>
      <div className="doctor-details">
        <p>
          <span className="detail-title">Specialization:</span>{" "}
          {doctor.specialization}
        </p>
        <p>
          <span className="detail-title">Experience:</span> {doctor.experience}{" "}
          years
        </p>
        <p>
          <span className="detail-title">Fees Per Consultation:</span> $
          {doctor.feesperConsultation}
        </p>
        <p>
          <span className="detail-title">Timings:</span> {doctor.timings[0]} -{" "}
          {doctor.timings[1]}
        </p>
      </div>

      <button className=" auth-button book-now-button btn btn-primary mt-2">
        <Link
          to={`/doctor/book-appointment/${doctor._id}`}
          className="btn-text"
        >
          Book Now
        </Link>
      </button>
    </div>
  );
};

export default DoctorList;
