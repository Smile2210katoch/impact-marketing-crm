import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerForm from "./pages/CustomerForm";
import MyCustomers from "./pages/MyCustomers";
import ManageUsers from "./pages/ManageUsers";
import ManageCustomers from "./pages/ManageCustomers";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import CustomerStatistics from "./pages/CustomerStatistics";
import NotFound from "./pages/NotFound";
function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<UserDashboard />} />

                <Route path="/admin" element={<AdminDashboard />} />

                <Route path="/customer" element={<CustomerForm />} />

                <Route path="/mycustomers" element={<MyCustomers />} />

                <Route path="/manage-users" element={<ManageUsers/>} />

                <Route path="/manage-customers"element={<ManageCustomers />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/change-password" element={<ChangePassword/>}/>

                <Route path="/statistics" element={<CustomerStatistics />} />

                <Route path="*" element={<NotFound />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;