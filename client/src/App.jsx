import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import MarketPlace from './Pages/MarketPlace'
import MyListings from './Pages/MyListings'
import ListingDetails from './Pages/ListingDetails'
import ManageListing from './Pages/ManageListing'
import MyOrders from './Pages/MyOrders'
import Loading from './Pages/Loading'
import Messages from './Pages/Messages'
import Navbar from './Components/navBar'
import ChatBox from './Components/ChatBox'
import {Toaster} from 'react-hot-toast'
import Layout from './Pages/Admin/Layout'
import Dashboard from './Pages/Admin/Dashboard'
import AllListings from './Pages/Admin/AllListings'
import CredentialChange from './Pages/Admin/CredentialChange'
import CredentialVerify from './Pages/Admin/CredentialVerify'
import Transactions from './Pages/Admin/Transactions'
import Withdrawal from './Pages/Admin/Withdrawal'

const App = () => {
  const {pathname}=useLocation()
  return (
    <div>
      <Toaster />
      {!pathname.includes('/admin') && <Navbar / >}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/marketplace' element={<MarketPlace/>}/>
        <Route path='/my-listings' element={<MyListings/>}/>
        <Route path='/listing/:listingId' element={<ListingDetails/>}/>
        <Route path='/create-listing' element={<ManageListing/>}/>
        <Route path='/edit-listing/:id' element={<ManageListing/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/loading' element={<Loading/>}/>
        <Route path='/admin' element={<Layout />}>
          <Route index element={<Dashboard/>} />
          <Route path='verify-credentials' element={<CredentialVerify/>} />
          <Route path='change-credentials' element={<CredentialChange/>} />
          <Route path='list-listings' element={<AllListings/>} />
          <Route path='transactions' element={<Transactions/>} />
          <Route path='withdrawal' element={<Withdrawal/>} />


        </Route>
      </Routes>
      <ChatBox/>
    </div>
  )
}

export default App
