import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateDepartment = () => {
  const location = useLocation();
  const department = location.state;

  const [updateDeparmentRequest, setUpdateDeparmentRequest] =
    useState(department);

  const handleUserInput = (e) => {
    setUpdateDeparmentRequest({
      ...updateDeparmentRequest,
      [e.target.name]: e.target.value,
    });
  };

  const departmentAction = (e) => {
    fetch("http://localhost:8087/department/update", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDeparmentRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

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
            //   setTimeout(() => {
            //     window.location.href = "/home";
            //   }, 1000); // Redirect after 3 seconds
          } else {
            console.log("Failed to fetch the departments");
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
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">Update Department</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3 text-color">
                <label for="name" class="form-label">
                  <b>Department</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleUserInput}
                  value={updateDeparmentRequest.name}
                  required
                />
              </div>
              <div class="mb-3 text-color">
                <label for="description" class="form-label">
                  <b>Description</b>
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  name="description"
                  placeholder="enter description.."
                  onChange={handleUserInput}
                  value={updateDeparmentRequest.description}
                />
              </div>
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={departmentAction}
              >
                Update Department
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDepartment;
