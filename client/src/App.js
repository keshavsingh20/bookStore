import "./App.css";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Books from './pages/Books'
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import AdminHome from "./Admin/pages/AdminHome";
import Administration from "./Admin/pages/Administration";
import ManageCategories from "./Admin/pages/ManageCategories";
import ManageBooks from "./Admin/pages/ManageBooks";
import ManageOrders from "./Admin/pages/ManageOrders";
import AddCategory from "./Admin/pages/AddCategory";
import AddBook from "./Admin/pages/AddBook";
import AddStore from "./Admin/pages/AddStore";
import UpdateCategory from "./Admin/pages/UpdateCategory";
import UpdateBook from "./Admin/pages/UpdateBook";
import UpdateStore from "./Admin/pages/UpdateStore";
import PrivateComp, { AdminOutlet } from "./components/PrivateCompo";
import PaymentSuccess from "./pages/PaymentSuccess";
import Myorders from "./pages/Myorders";
import Profile from "./pages/Profile"
import EditProfile from "./components/EditProfile";
import EditPassword from "./components/EditPassword";
import CategoryBook from "./pages/CategoryBook";


function App() {

  return (
    <div className="App">
      <HashRouter>
      {/* <BrowserRouter> */}
        {/* <Header /> */}

        <Routes>
          {/* public routing */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot/password" element={<Reset />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contact" element={<Contact />} />

          {/* priavate routing */}
          <Route element={<PrivateComp />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/checkout/:id" element={<Checkout />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/myorders" element={<Myorders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit/profile/:id" element={<EditProfile />}></Route>
            <Route path="/edit/password/:id" element={<EditPassword />}></Route>
            <Route path="/category/books" element={<CategoryBook />} />

            {/* private routing for the admin */}
            <Route element={<AdminOutlet />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/manage/admin" element={<Administration />} />
              <Route path="/admin/manage/categories" element={<ManageCategories />} />
              <Route path="/admin/manage/books" element={<ManageBooks />} />
              <Route path="/admin/manage/orders" element={<ManageOrders />} />
              <Route path="/admin/add/category" element={<AddCategory />} />
              <Route path="/admin/add/book" element={<AddBook />} />
              <Route path="/admin/add/store" element={<AddStore />} />
              <Route path="/admin/update/category/:id" element={<UpdateCategory />} />
              <Route path="/admin/update/book/:id" element={<UpdateBook />} />
              <Route path="/admin/update/store/:id" element={<UpdateStore />} />
            </Route>
          </Route>

        </Routes>

      {/* </BrowserRouter> */}
      </HashRouter>
    </div>
  );
}

export default App;
