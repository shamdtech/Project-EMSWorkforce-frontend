import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ViewEmployeeByDepartment = () => {
    const manager = JSON.parse(sessionStorage.getItem("active-manager"));
  const [allEmployees, setallEmployees] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getAllDepartment = async () => {
      const allEmployee = await retrieveAllEmployee();
      if (allEmployee) {
        setallEmployees(allEmployee.users);
      }
    };

    getAllDepartment();
  }, []);

  const retrieveAllEmployee = async () => {
    const response = await axios.get(
      "http://localhost:8081/user/fetch/department/employee?role=employee&departmentId="+manager.departmentId
    );
    console.log(response.data);
    return response.data;
  };

  const deleteEmployee = (userId) => {
    fetch("http://localhost:8081/user/delete?userId=" + userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            console.log("Got the success response");

            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            console.log("Failed to delete the employee");
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    setTimeout(() => {
      window.location.reload(true);
    }, 2000); // Reload after 3 seconds 3000
  };

  const viewSalary = (employeeSalary) => {
    console.log(employeeSalary);
    navigate("/employee/salary/detail", { state: employeeSalary });
  };

  const updateEmployee = (user) => {
    navigate("/user/update", { state: user });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Employee</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Employee</th>
                  <th scope="col">Employee Id</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Department</th>
                  <th scope="col">Experience</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Street</th>
                  <th scope="col">City</th>
                  <th scope="col">Pincode</th>
                  <th scope="col">Salary Details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((employee) => {
                  return (
                    <tr>
                      <td>
                        <td>
                          <img
                            src={
                              "http://localhost:8081/user/image/" +
                              employee.user.image
                            }
                            class="img-fluid"
                            alt="product_pic"
                            style={{
                              maxWidth: "90px",
                            }}
                          />
                        </td>
                      </td>
                      <td>
                        <b>{employee.user.id}</b>
                      </td>
                      <td>
                        <b>{employee.user.firstName}</b>
                      </td>

                      <td>
                        <b>{employee.user.lastName}</b>
                      </td>
                      <td>
                        <b>{employee.user.emailId}</b>
                      </td>
                      <td>
                        <b>{employee.user.contact}</b>
                      </td>
                      <td>
                        <b>{employee.department[0].name}</b>
                      </td>
                      <td>
                        <b>{employee.user.experience}</b>
                      </td>
                      <td>
                        <b>{employee.user.age}</b>
                      </td>
                      <td>
                        <b>{employee.user.gender}</b>
                      </td>
                      <td>
                        <b>{employee.user.street}</b>
                      </td>
                      <td>
                        <b>{employee.user.city}</b>
                      </td>
                      <td>
                        <b>{employee.user.pincode}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => viewSalary(employee.salary)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          View
                        </button>
                      </td>

                      <td>
                        <button
                          onClick={() => deleteEmployee(employee.user.id)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          Remove
                        </button>

                        <button
                          onClick={() => updateEmployee(employee.user)}
                          className="btn btn-sm bg-color custom-bg-text ms-1"
                        >
                          Update
                        </button>
                        <ToastContainer />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeByDepartment;
