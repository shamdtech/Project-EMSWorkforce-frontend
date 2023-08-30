import "./App.css";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./page/AboutUs";
import ContactUs from "./page/ContactUs";
import Header from "./NavbarComponent/Header";
import HomePage from "./page/HomePage";
import UserRegister from "./UserComponent/UserRegister";
import UserLoginForm from "./UserComponent/UserLoginForm";
import AddDepartment from "./DepartmentComponent/AddDepartment";
import ViewAllDepartment from "./DepartmentComponent/ViewAllDepartment";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import ViewAllEmployee from "./UserComponent/ViewAllEmployee";
import ViewEmployeeSalary from "./SalaryComponent/ViewEmployeeSalary";
import AddEmployeeSalary from "./SalaryComponent/AddEmployeeSalary";
import UpdateDepartment from "./DepartmentComponent/UpdateDepartment";
import UpdateEmployeeSalary from "./SalaryComponent/UpdateEmployeeSalary";
import UpdateUser from "./UserComponent/UpdateUser";
import ViewAllManager from "./UserComponent/ViewAllManager";
import ViewEmployeeByDepartment from "./UserComponent/ViewEmployeeByDepartment";
import EmployeeProfilePage from "./UserComponent/EmployeeProfilePage";
import ViewMySalary from "./SalaryComponent/ViewMySalary";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all/hotel/location" element={<HomePage />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="/user/employee/register" element={<UserRegister />} />
        <Route path="/user/manager/register" element={<UserRegister />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/update" element={<UpdateUser />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/department/add" element={<AddDepartment />} />
        <Route path="/department/update" element={<UpdateDepartment />} />
        <Route path="/department/fetch" element={<ViewAllDepartment />} />
        <Route path="/employee/fetch" element={<ViewAllEmployee />} />
        <Route
          path="/employee/department/fetch"
          element={<ViewEmployeeByDepartment />}
        />
        <Route path="/manager/fetch" element={<ViewAllManager />} />
        <Route
          path="/employee/salary/detail"
          element={<ViewEmployeeSalary />}
        />
        <Route path="/employee/mysalary" element={<ViewMySalary />} />
        <Route path="/employee/salary/add" element={<AddEmployeeSalary />} />
        <Route
          path="/employee/salary/update"
          element={<UpdateEmployeeSalary />}
        />
        <Route path="/employee/profile" element={<EmployeeProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
