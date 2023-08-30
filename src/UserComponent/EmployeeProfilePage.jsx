import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeProfilePage = () => {
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));

  const [department, setDepartment] = useState({});

  useEffect(() => {
    const getAllDepartment = async () => {
      const department = await retrieveDepartment();
      if (department) {
        setDepartment(department[0]);
      }
    };

    getAllDepartment();
  }, []);

  const retrieveDepartment = async () => {
    const response = await axios.get(
      "http://localhost:8087/department/fetch?departmentId=" +
        employee.departmentId
    );
    console.log(response);
    return response.data.department;
  };

  return (
    <div className="mt-3">
      <div
        className="d-flex justify-content-center"
        // style={{
        //   height: "45rem",
        // }}
      >
        <div
          className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
          style={{
            height: "auto",
            width: "500px",
          }}
        >
          <div className="card-header custom-bg-text text-center bg-color">
            <h2>Employee Salary Details</h2>
          </div>
          <div
            className="card-body"
            style={{
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={"http://localhost:8081/user/image/" + employee.image}
                alt="Profile"
              />
              <p>
                <span className="text-color">
                  <b> Employee Name:</b>
                </span>
                {employee.firstName} {employee.lastName}
              </p>
              <p>
                <span className="text-color">
                  <b> Age:</b>
                </span>
                {employee.age}
              </p>
              <p>
                <span className="text-color">
                  <b>Gender:</b>
                </span>
                {employee.gender}
              </p>
              <p>
                <span className="text-color">
                  <b> Email Id:</b>
                </span>
                {employee.emailId}
              </p>
              <p>
                <span className="text-color">
                  <b> Contact:</b>
                </span>
                {employee.contact}
              </p>
              <p>
                <span className="text-color">
                  <b> Address:</b>
                </span>
                {employee.street}, {employee.city}, {employee.pincode}
              </p>
              <p>
                <span className="text-color">
                  <b> Department:</b>
                </span>
                {department.name}
              </p>
              <p>
                <span className="text-color">
                  <b> Experience:</b>
                </span>
                {employee.experience} years
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
