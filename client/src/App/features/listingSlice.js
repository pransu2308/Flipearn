import { createSlice } from '@reduxjs/toolkit'
import { dummyListings } from '../../assets/assets' // 👈 IMPORT THIS

const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    listings: dummyListings,      // 👈 THIS IS THE KEY
    userListings: dummyListings,
    balance: {
      earned: 0,
      withdrawn: 0,
      available: 0,
    },
  },
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload
    },
  },
})

export const { setListings } = listingSlice.actions
export default listingSlice.reducer
