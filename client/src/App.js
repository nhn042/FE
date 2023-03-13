import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./component/Search/Search.js";
import Login from "./component/Home/Login.js";
import ForgotPassword from "./component/Home/ForgotPassword.js";
import Register from "./component/Home/signUp";
import "./translations/i18n";
import WrapperComponent from "./component/Home/WrapperComponent.js";
import Checkout from "./component/checkOut/checkOut";
import HomeMain from "./component/Home/homeMain";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <WrapperComponent>
              <Login />
            </WrapperComponent>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <WrapperComponent>
              <ForgotPassword />
            </WrapperComponent>
          }
        />
        <Route
          path="/signUp"
          element={
            <WrapperComponent>
              <Register />
            </WrapperComponent>
          }
        />
        <Route
          path="/checkOut"
          element={
            <HomeMain>
              <Checkout />
            </HomeMain>
          }
        />
        <Route
          path="/search"
          element={
            <HomeMain>
              <Search />
            </HomeMain>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
