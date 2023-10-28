import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProducts";

if(process.env.NODE_ENV === 'production') disableReactDevTools();

function App() {
  return(

    <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/signin" exact element={<Signin/>}/>
            <Route path="/signup" exact element={<Signup/>}/>

            <Route path="/user/dashboard" element={
              <PrivateRoute>
                <UserDashboard />
            </PrivateRoute>}/>

             <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
            </AdminRoute>}/>
             <Route path="/create/category" element={
              <AdminRoute>
                <AddCategory/>
            </AdminRoute>}/>
            <Route path="/create/product" element={
              <AdminRoute>
                <AddProduct/>
            </AdminRoute>}/>

          </Routes>
      

       {/* <header>
         <Link className="site-logo" to="/">#VANLIFE</Link>
        <nav>
          <Link to="/about">About</Link>
          <Link to="/vans">Vans</Link>
        </nav>
      </header>

     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
         <Route path="/vans" element={<Vans/>}/>

     </Routes>  
     */}
  </BrowserRouter>
  )

}
 
ReactDOM.createRoot(document.getElementById('root')).render(
   <App/>
);
