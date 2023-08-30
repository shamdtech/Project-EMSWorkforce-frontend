import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { resolvePath, useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const manager = JSON.parse(sessionStorage.getItem("active-manager"));
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
    departmentId: "",
    experience: "",
  });

  if (document.URL.indexOf("admin") !== -1) {
    user.role = "admin";
  } else if (document.URL.indexOf("employee") !== -1) {
    
    user.role = "employee";
    user.departmentId = manager.departmentId;
  } else if (document.URL.indexOf("manager") !== -1) {
    user.role = "manager";
  }

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [departments, setDepartments] = useState([]);

  const retrieveAllDepartments = async () => {
    const response = await axios.get("http://localhost:8087/department/all");
    return response.data;
  };

  useEffect(() => {
    const getAllDepartments = async () => {
      const allDepartments = await retrieveAllDepartments();
      if (allDepartments) {
        setDepartments(allDepartments.department);
      }
    };

    getAllDepartments();
  }, []);

  const saveUser = (e) => {
    const formData = new FormData();
    formData.append("image", selectedPhoto);
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("password", user.password);
    formData.append("contact", user.contact);
    formData.append("emailId", user.emailId);
    formData.append("street", user.street);
    formData.append("age", user.age);
    formData.append("gender", user.gender);
    formData.append("experience", user.experience);
    formData.append("city", user.city);
    formData.append("pincode", user.pincode);
    formData.append("departmentId", user.departmentId);
    formData.append("role", user.role);

    axios
      .post("http://localhost:8081/user/register", formData)
      .then((resp) => {
        console.log("here register success");

        if (resp.data.success) {
          console.log("Got the success response");
          toast.success(resp.data.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.href = "/user/login";
          }, 1000); // Redirect after 3 seconds
        } else {
          console.log("got response as false");
          toast.error("It seems server is down!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        console.log("register failed");
        console.log("Error", error);

        if (error.message === "Network Error") {
          // Show a toast message to the user
          toast.error("It seems server is down!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.response) {
          toast.error(error.response.data.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    e.preventDefault();
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Register {user.role}</h5>
          </div>
          <div className="card-body">
            <form className="row g-3" onSubmit={saveUser}>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b> First Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <b>
                  <label className="form-label">Email Id</label>
                </b>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                />
              </div>
              <div className="col-md-6 mb-3 text-color">
                <label htmlFor="sex" className="form-label">
                  <b>User Gender</b>
                </label>
                <select
                  onChange={handleUserInput}
                  className="form-control"
                  name="gender"
                >
                  <option value="0">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {(() => {
                if (user.role !== "employee") {
                  return (
                    <div className="col-md-6 mb-3 text-color">
                      <label htmlFor="bloodGroup" className="form-label">
                        <b>Department</b>
                      </label>
                      <select
                        onChange={handleUserInput}
                        className="form-control"
                        name="departmentId"
                      >
                        <option value="">Select Department</option>

                        {departments.map((d) => {
                          return <option value={d.id}> {d.name} </option>;
                        })}
                      </select>
                    </div>
                  );
                }
              })()}

              

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Contact No</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="contact"
                  name="contact"
                  onChange={handleUserInput}
                  value={user.contact}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label">
                  <b>Age</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  onChange={handleUserInput}
                  value={user.age}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="experience" className="form-label">
                  <b>Experience</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="experience"
                  name="experience"
                  onChange={handleUserInput}
                  value={user.experience}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  <b> Street</b>
                </label>
                <textarea
                  className="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  onChange={handleUserInput}
                  value={user.street}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="price" className="form-label">
                  <b>City</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="pincode" className="form-label">
                  <b>Pincode</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                />
              </div>
              <div class="col-12">
                <label for="pic" class="form-label">
                  <b>Select Profile Image</b>
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  name="image"
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}
                />
              </div>
              <div className="d-flex aligns-items-center justify-content-center">
                <input
                  type="submit"
                  className="btn bg-color custom-bg-text"
                  value="Register User"
                />
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
