import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Header from "./component/Header";
import Home from "./component/Home";
import Favourite from "./component/Favourite";
import Viewprofile from "./component/Viewprofile";
import Recommended from "./component/Recommendation";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <div>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="viewprofile" element={<Viewprofile />} />
          <Route path="signup" element={<Signup />} />
          <Route path="recommended" element={<Recommended />} />
          <Route path="favourite" element={<Favourite />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
