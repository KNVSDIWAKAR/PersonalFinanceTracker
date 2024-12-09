import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import LandingPage from "./pages/LandingPage.js";
import Transfer from "./components/dashboard/Transfer.js";
import AddCard from "./components/dashboard/AddCard.js";
import Profile from "./components/dashboard/Profile.js";
import Transactions from "./components/dashboard/Transactions.js";
import DisplayCards from "./components/dashboard/DisplayCards.js";
import Income from "./components/dashboard/Income.js";
import Statistics from "./components/dashboard/Statistics.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("username") ? true : false
  );

  const handleAuthentication = (authStatus) => {
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      localStorage.removeItem("username");
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/addcard"
            element={<AddCard handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/transfer"
            element={<Transfer handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/income"
            element={<Income handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/profile"
            element={<Profile handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/transactions"
            element={
              <Transactions handleAuthentication={handleAuthentication} />
            }
          />
          <Route
            path="/cards"
            element={
              <DisplayCards handleAuthentication={handleAuthentication} />
            }
          />
          <Route
            path="/statistics"
            element={<Statistics handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/login"
            element={<Login handleAuthentication={handleAuthentication} />}
          />
          <Route
            path="/signup"
            element={<Signup handleAuthentication={handleAuthentication} />}
          />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard handleAuthentication={handleAuthentication} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
