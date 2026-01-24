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

const App = () => {
  const {pathname}=useLocation()
  return (
    <div>
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
      </Routes>
    </div>
  )
}

export default App
