import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ViewAllDepartment = () => {
  const [allDepartments, setAllDepartments] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getAllDepartment = async () => {
      const allDepartment = await retrieveAllDepartment();
      if (allDepartment) {
        setAllDepartments(allDepartment.department);
      }
    };

    getAllDepartment();
  }, []);

  const retrieveAllDepartment = async () => {
    const response = await axios.get("http://localhost:8087/department/all");
    console.log(response.data);
    return response.data;
  };

  const deleteDepartment = (departmentId) => {
    fetch(
      "http://localhost:8087/department/delete?departmentId=" + departmentId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
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
            console.log("Failed to delete the department");
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

  const updateDepartment = (department) => {
    navigate("/department/update", { state: department });
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
          <h2>All Departments</h2>
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
                  <th scope="col">Department</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allDepartments.map((department) => {
                  return (
                    <tr>
                      <td>
                        <b>{department.name}</b>
                      </td>
                      <td>
                        <b>{department.description}</b>
                      </td>

                      <td>
                        <button
                          onClick={() => deleteDepartment(department.id)}
                          className="btn btn-sm bg-color custom-bg-text"
                        >
                          Remove
                        </button>

                        <button
                          onClick={() => updateDepartment(department)}
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

export default ViewAllDepartment;
