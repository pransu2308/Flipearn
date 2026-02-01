import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowLeftIcon,
  ArrowUpRightFromSquareIcon,
  Calendar,
  CheckCircle2,
  ChevronLeftIcon,
  ChevronRightIcon,
  DollarSign,
  Eye,
  LineChart,
  Loader2Icon,
  MapPin,
  MessageSquareMoreIcon,
  ShoppingBagIcon,
  Users,
} from 'lucide-react'
import { getProfileLink, platformIcons } from '../assets/assets'
import { setChat } from '../App/features/chatSlice'

const ListingDetails = () => {

  const dispatch=useDispatch()

  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY || '$'

  const [listing, setListing] = useState(null)
  const [current, setCurrent] = useState(0)

  const { listingId } = useParams()
  const { listings = [] } = useSelector((state) => state.listing)

  const images = listing?.images || []

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const nextSlide = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  const profileLink =
    listing && getProfileLink(listing.platform, listing.username)

    const purchaseAccount = async()=>{

    }

    const loadChatbox = ()=>{
       dispatch(setChat({listing:listing}))
    }

  useEffect(() => {
    const foundListing = listings.find((item) => item.id === listingId)
    if (foundListing) setListing(foundListing)
  }, [listingId, listings])

  if (!listing) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2Icon className="size-7 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* PAGE CONTENT */}
      <div className="flex-1 px-6 md:px-16 lg:px-24 xl:px-32">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 py-5 hover:text-indigo-600"
        >
          <ArrowLeftIcon className="size-4" />
          Go to Previous Page
        </button>

        {/* MAIN ROW */}
        <div className="flex items-start gap-10 max-md:flex-col">
          {/* LEFT COLUMN */}
          <div className="flex-1">
            {/* TOP CARD */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl">
                    {platformIcons[listing.platform]}
                  </div>

                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-semibold">
                      {listing.title}
                      <Link to={profileLink} target="_blank">
                        <ArrowUpRightFromSquareIcon className="size-4 hover:text-indigo-500" />
                      </Link>
                    </h2>

                    <p className="text-gray-500 text-sm">
                      @{listing.username} ·{' '}
                      {listing.platform?.charAt(0).toUpperCase() +
                        listing.platform?.slice(1)}
                    </p>

                    <div className="flex gap-2 mt-2">
                      {listing.verified && (
                        <span className="flex items-center text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                      {listing.monetized && (
                        <span className="flex items-center text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
                          <DollarSign className="w-3 h-3 mr-1" />
                          Monetized
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-2xl font-bold">
                    {currency}
                    {listing.price?.toLocaleString()}
                  </h3>
                  <p className="text-sm text-gray-500">USD</p>
                </div>
              </div>
            </div>

            {/* IMAGE SLIDER */}
            {images.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 mb-5 overflow-hidden">
                <div className="p-4 font-semibold">Screenshots & Proof</div>

                <div className="relative w-full aspect-video overflow-hidden">
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                  >
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-full shrink-0"
                        alt="Proof"
                      />
                    ))}
                  </div>

                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
                  >
                    <ChevronLeftIcon />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
                  >
                    <ChevronRightIcon />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2.5 h-2.5 rounded-full ${
                          current === i ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* METRICS */}
            <div className="bg-white rounded-xl border border-gray-200 mb-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-center">
                <div>
                  <Users className="mx-auto mb-1 text-gray-400" />
                  {listing.followers_count}
                  <p className="text-xs">Followers</p>
                </div>
                <div>
                  <LineChart className="mx-auto mb-1 text-gray-400" />
                  {listing.engagement_rate}%
                  <p className="text-xs">Engagement</p>
                </div>
                <div>
                  <Eye className="mx-auto mb-1 text-gray-400" />
                  {listing.monthly_views}
                  <p className="text-xs">Views</p>
                </div>
                <div>
                  <Calendar className="mx-auto mb-1 text-gray-400" />
                  {new Date(listing.createdAt).toLocaleDateString()}
                  <p className="text-xs">Listed</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-[320px] max-md:w-full">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h4 className="font-semibold mb-4">Seller Information</h4>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={listing.owner?.image}
                  className="w-12 h-12 rounded-full"
                  alt="Seller"
                />
                <div>
                  <p className="font-medium">{listing.owner?.name}</p>
                  <p className="text-sm text-gray-500">
                    {listing.owner?.email}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Member Since{' '}
                <span className="font-medium">
                  {new Date(
                    listing.owner?.createdAt
                  ).toLocaleDateString()}
                </span>
              </p>

              <button onClick={loadChatbox}className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 mb-2">
                <MessageSquareMoreIcon className="size-4" />
                Chat
              </button>

              {listing.isCredentialChanged && (
                <button onClick={purchaseAccount} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                  <ShoppingBagIcon className="size-4" />
                  Purchase
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER (BOTTOM) */}
      <footer className="border-t border-gray-200 p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{' '}
        <span className="text-indigo-600 font-medium">GreatStack</span>. All
        rights reserved.
      </footer>
    </div>
  )
}

export default ListingDetails
