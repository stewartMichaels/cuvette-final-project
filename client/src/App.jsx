import { BrowserRouter, Routes, Route } from "react-router-dom";

// page import
import LoginSignup from "./pages/LoginSignupPage/LoginSignupPage";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
