import React from 'react'

import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore"
import Mainlayout from "./pages/Mainlayout"
import ProductDetail from "./Productdetails/ProductDetail"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from './pages/Signup';
import Sizepopup from "./pages/Sizepopup";
import Cart from "./pages/Cart"
import ExplorePage from './Type/ExplorePage';
import Dashboard from './DashboardLayout/Dashboard';
import OrderHistory from "./DashboardLayout/OrderHistory"
import MyWishlist from './DashboardLayout/Favorites';
import ScrollTop from "./Style/ScrollTop";
import DashboardLayout from './DashboardLayout/DashboardLayout';
import MyProfile from "./DashboardLayout/MyProfile"
import Fashion from "./Explore/Fashion"
import Beauty from "./Explore/Beauty";
import Diy from "./Explore/Diy";
import Electronics from "./Explore/Electronics"
import HomeAll from "./Explore/Home"
import Toys from "./Explore/Toys"
import Automotive from './Explore/Automotive';
import Books from "./Explore/Books"
import Sports from './Explore/Sports';
import BabyCloth from './Explore/BabyCloth';
import PetSupplies from "./Explore/PetSupplies"
import MobileAccesories from './Explore/MobileAccesories';
import ExploreProducts from './DashboardLayout/ExploreProducts';
import Api from "./API/Api"
import AllCategory from './DashboardLayout/AllCategoryGrid';
import SelectAddress from './pages/SelectAddressPage';
import Invoice from './DashboardLayout/Invoice';
import ChangePassword from './DashboardLayout/ChangePassword';
import DashboardMain from './DashboardLayout/DashboardMain';
function App() {
   return (
     <>
       <div className=" text-[16px] overflow-hidden md:text-[18px] font-popping ">
         <ScrollTop />
         <Routes> 

           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/" element={<Mainlayout />}>
             <Route index element={<Home />} />
             <Route path="explore" element={<Explore />} />
             <Route path="productdetail" element={<ProductDetail />} />
             <Route path="sizepopup" element={<Sizepopup />} />
             <Route path="card" element={<Cart />} />
             <Route path="explorePage" element={<ExplorePage />} />
             <Route path='selectaddress' element={<SelectAddress/>}/>
             <Route path='allcategory' element={<AllCategory/>}/>
             <Route path="fashion" element={<Fashion />} />
             <Route path="beauty" element={<Beauty />} />
             <Route path="books" element={<Books />} />
             <Route path="diy" element={<Diy />} />
             <Route path="electronics" element={<Electronics />} />
             <Route path="homeall" element={<HomeAll />} />
             <Route path="toys" element={<Toys />} />
             <Route path="sports" element={<Sports />} />
             <Route path="automotive" element={<Automotive />} />
            <Route path="mobile" element={<MobileAccesories />} />
            <Route path="kids" element={<BabyCloth />} />
            <Route path="pets" element={<PetSupplies />} />

           </Route>

           <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
                <Route path="orderhistory" element={<OrderHistory />} />
                <Route path="invoice/:orderId" element={<Invoice />} />
                <Route path="mywishlist" element={<MyWishlist />} />
                <Route path="myprofile" element={<MyProfile />} />
                <Route path="fashion" element={<Fashion />} />
                <Route path="beauty" element={<Beauty />} />
                <Route path="diy" element={<Diy />} />
                <Route path="electronics" element={<Electronics />} />
                <Route path="homeall" element={<HomeAll />} />
                <Route path="toys" element={<Toys />} />
                <Route path="card" element={<Cart />} />
                <Route path="exploreproducts" element={<ExploreProducts />} />
                <Route path='Api' element={<Api/>}/>
                <Route path='allcategory' element={<AllCategory/>}/>
                <Route path='productdetail' element={<ProductDetail/>}/>
                <Route path='changepassword' element={<ChangePassword/>}/>
                <Route path='dashboardmain' element={<DashboardMain/>}/>

              </Route>
           </Routes>
       </div>
     </>
   );
}

export default App;