import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/dashboard/DashBoard";
import Page404 from "./pages/Page404/Page404";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
