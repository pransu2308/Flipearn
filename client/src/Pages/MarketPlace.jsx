import { ArrowLeftIcon, FilterIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ListingCard from '../Components/ListingCard'
import FilterSidebar from '../Components/FilterSideBar'

const MarketPlace = () => {
  const navigate = useNavigate()
  const [showFilterPhone, setShowFilterPhone] = useState(false)

  const { listings } = useSelector(state => state.listing)
  const filteredListings = listings?.filter(() => {
    if(filters.platform && filters.platform.length>0)
    return true
  }) || []

  const [filters, setFilters] = useState({
    platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
  })

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">

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

      <div className="relative flex items-start gap-8 pb-8">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          showFilterPhone={showFilterPhone}
          setShowFilterPhone={setShowFilterPhone}
        />

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredListings
            .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0))
            .map((listing, index) => (
              <ListingCard key={index} listing={listing} />
            ))}
        </div>
      </div>

    </div>
  )
}

export default MarketPlace
