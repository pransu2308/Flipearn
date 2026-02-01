import { ArrowLeftIcon, FilterIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ListingCard from '../Components/ListingCard'
import FilterSidebar from '../Components/FilterSideBar'

const MarketPlace = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')

  const navigate = useNavigate()
  const [showFilterPhone, setShowFilterPhone] = useState(false)

  const { listings = [] } = useSelector((state) => state.listing)

  const [filters, setFilters] = useState({
    platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
    monetized: false,
  })

  // ✅ FIXED FILTER LOGIC
  const filteredListings = listings.filter((listing) => {
    // PLATFORM
    if (filters.platform && filters.platform.length > 0) {
      if (
        !filters.platform
          .map((p) => p.toLowerCase())
          .includes(listing.platform?.toLowerCase())
      ) {
        return false
      }
    }

    // PRICE
    if (filters.maxPrice && listing.price > filters.maxPrice) {
      return false
    }

    // FOLLOWERS
    if (filters.minFollowers && listing.followers_count < filters.minFollowers) {
      return false
    }

    // NICHE
    if (filters.niche && listing.niche !== filters.niche) {
      return false
    }

    // VERIFIED
    if (filters.verified && listing.verified !== true) {
      return false
    }

    // MONETIZED
    if (filters.monetized && listing.monetized !== true) {
      return false
    }

    // SEARCH
    if (search) {
      const trimmed = search.trim().toLowerCase()

      if (
        !listing.title?.toLowerCase().includes(trimmed) &&
        !listing.username?.toLowerCase().includes(trimmed) &&
        !listing.description?.toLowerCase().includes(trimmed) &&
        !listing.platform?.toLowerCase().includes(trimmed) &&
        !listing.niche?.toLowerCase().includes(trimmed)
      ) {
        return false
      }
    }

    return true // ✅ IMPORTANT
  })

  return (
    <div className="px-6 md:px-16 xl:px-32">
      {/* HEADER */}
      <div className="flex items-center justify-between text-slate-500">
        <button
          onClick={() => {
            navigate('/')
            window.scrollTo(0, 0)
          }}
          className="flex items-center gap-2 py-5"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Home
        </button>

        <button
          onClick={() => setShowFilterPhone(true)}
          className="flex sm:hidden items-center gap-2 py-5"
        >
          <FilterIcon className="size-4" />
          Filters
        </button>
      </div>

      {/* CONTENT */}
      <div className="relative flex items-start gap-8 pb-8">
        {/* FILTER SIDEBAR */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          showFilterPhone={showFilterPhone}
          setShowFilterPhone={setShowFilterPhone}
        />

        {/* LISTINGS */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredListings.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No listings found for selected filters
            </p>
          ) : (
            filteredListings
              .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0))
              .map((listing, index) => (
                <ListingCard key={index} listing={listing} />
              ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketPlace
