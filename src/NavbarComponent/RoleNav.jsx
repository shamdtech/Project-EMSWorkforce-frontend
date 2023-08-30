import AdminHeader from "./AdminHeader";
import NormalHeader from "./NormalHeader";
import ManagerHeader from "./ManagerHeader";
import EmployeeHeader from "./EmployeeHeader";

const RoleNav = () => {
  const manager = JSON.parse(sessionStorage.getItem("active-manager"));
  const employee = JSON.parse(sessionStorage.getItem("active-employee"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));

  if (admin != null) {
    return <AdminHeader />;
  } else if (manager != null) {
    return <ManagerHeader />;
  } else if (employee != null) {
    return <EmployeeHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
