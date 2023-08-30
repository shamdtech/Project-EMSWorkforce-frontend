import Carousel from "./Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import employees from "../images/employees.png";
import managers from "../images/managers.png";

const HomePage = () => {
  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <h1 className="text-color">
              Welcome to Employee Management System
            </h1>
            <p>
              The Employee Management System is a comprehensive solution for
              managing employees and their information in an organization. It
              helps streamline various HR processes, such as employee
              onboarding, attendance tracking, performance management, and more.
            </p>
            <p>
              With our system, administrators can efficiently manage employee
              records, assign roles and permissions, generate reports, and
              oversee the overall employee management workflow. Employees can
              access their profiles, view their schedules, request leave, and
              communicate with their managers. Managers can easily track
              employee performance, approve requests, and ensure smooth
              operations within their teams.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text">
              Get Started
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src={employees}
              alt="Logo"
              width="400"
              height="400"
              className="home-image"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <img
              src={managers}
              alt="Logo"
              width="400"
              height="400"
              className="home-image"
            />
          </div>
          <div className="col-md-8">
            <h1 className="text-color ms-5">Manage Employees and Managers</h1>
            <p className="ms-5">
              Simplify the process of managing employee data along with their
              salary information. The Employee Management System allows you to
              easily store and update employee details such as personal
              information, contact details, job positions, and salary records.
              Keep track of employee compensation, benefits, and payroll
              management effectively.
            </p>
            <p className="ms-5">
              Efficiently manage managers and employee departments with our
              Employee Management System. Assign managers to specific
              departments, delegate responsibilities, and oversee the
              performance of both managers and their respective teams.
              Streamline communication, collaboration, and decision-making
              within departments for improved productivity and coordination.
            </p>
            <Link to="/user/login" className="btn bg-color custom-bg-text ms-5">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
