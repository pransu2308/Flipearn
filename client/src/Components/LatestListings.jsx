import React from 'react'
import { useSelector } from 'react-redux'
import Title from './Title'
import ListingCard from './ListingCard'

const LatestListings = () => {

  // Safe selector (prevents undefined errors)
  const listings = useSelector(
    (state) => state.listing?.listings || []
  )

  return (
    <div className="mt-20 mb-8">
      <Title
        title="Latest Listings"
        description="Discover the hottest social profiles available right now."
      />

      <div className="flex flex-col gap-6 px-6">

        {/* Empty state */}
        {listings.length === 0 && (
          <p className="text-center text-gray-500">
            No listings available
          </p>
        )}

        {/* Listings */}
        {listings.slice(0, 4).map((listing, index) => (
          <div
            key={index}
            className="mx-auto w-full max-w-3xl rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <ListingCard listing={listing}/>
          </div>
        ))}

      </div>
    </div>
  )
}

export default LatestListings
