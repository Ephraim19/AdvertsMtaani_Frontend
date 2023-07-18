import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./login_components/Login";
import BusinessForm from "./login_components/BusinessForm";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Login />} />
          <Route path="/information" element={<BusinessForm />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
