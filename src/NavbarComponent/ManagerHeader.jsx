import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ManagerHeader = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-manager");
    sessionStorage.removeItem("manager-jwtToken");

    setTimeout(() => {
      navigate("/home");
    }, 1000); // Redirect after 3 seconds

    window.location.reload(true);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
     

      <li className="nav-item">
        <Link
          to="/employee/department/fetch"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">view Department Employees</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/employee/salary/add"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Employee Salary</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/employee/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Employee</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default ManagerHeader;
