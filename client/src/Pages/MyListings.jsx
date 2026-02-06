import {
  ArrowDownCircleIcon,
  CheckCircle,
  CoinsIcon,
  DollarSign,
  Eye,
  LockIcon,
  Plus,
  TrendingUp,
  Users,
  WalletIcon,
  TrashIcon,
  Edit,
  EyeOffIcon,
  EyeIcon,
  StarIcon
} from 'lucide-react'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { platformIcons } from '../assets/assets'
import CredentialSubmission from '../Components/CredentialSubmission'
import WithdrawModel from '../Components/WithdrawModel'

const MyListings = () => {

  const navigate = useNavigate()

  const {
    userListings = [],
    balance = { earned: 0, withdrawn: 0, available: 0 }
  } = useSelector((state) => state.listing || {})

  const currency = '$'

  const [showCredentialSubmission, setShowCredentialSubmission] = useState(null)
  const [showWithdrawal, setShowWithdrawal] = useState(null)


  /* ================= HELPERS ================= */

  const formatNumber = (num) => {
    if (num >= 100000) return (num / 100000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num
  }

  const totalValue = userListings.reduce((s, l) => s + (l.price || 0), 0)

  const active = userListings.filter(l => l.status === 'active').length
  const sold = userListings.filter(l => l.status === 'sold').length


  /* ⭐ STATUS COLORS (NEW) */
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600'
      case 'pending':
        return 'text-red-600'
      case 'sold':
        return 'text-gray-500'
      default:
        return 'text-gray-600'
    }
  }


  /* ================= UI ================= */

  return (
    <div className='min-h-screen bg-gray-50 px-6 md:px-16 lg:px-24 xl:px-32 py-8'>


      {/* ================= HEADER ================= */}
      <div className='flex justify-between items-center mb-10'>
        <div>
          <h1 className='text-3xl font-bold'>My Listings</h1>
          <p className='text-gray-500 text-sm'>Manage your social media account listings</p>
        </div>

        <button
          onClick={() => navigate('/create-listing')}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md flex items-center gap-2 shadow'
        >
          <Plus size={16} /> New Listing
        </button>
      </div>


      {/* ================= STATS ================= */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-10'>

        <Stat title="Total Listings" value={userListings.length} icon={<Eye />} color="bg-indigo-100 text-indigo-600" />
        <Stat title="Active Listings" value={active} icon={<CheckCircle />} color="bg-green-100 text-green-600" />
        <Stat title="Sold" value={sold} icon={<TrendingUp />} color="bg-purple-100 text-purple-600" />
        <Stat title="Total Value" value={`$${totalValue.toLocaleString()}`} icon={<DollarSign />} color="bg-yellow-100 text-yellow-600" />

      </div>


      {/* ================= BALANCE ================= */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>

        <Balance label="Earned" value={balance.earned} icon={<WalletIcon />} />
        <Balance label="Withdrawn" value={balance.withdrawn} icon={<ArrowDownCircleIcon />} />

        <Balance
          label="Available"
          value={balance.available}
          icon={<CoinsIcon />}
          onClick={() => setShowWithdrawal(true)}
        />

      </div>


      {/* ================= LISTINGS ================= */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

        {userListings.map((listing) => (

          <div key={listing.id} className='bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition'>


            {/* Top */}
            <div className='flex justify-between items-start mb-3'>

              <div className='flex items-center gap-2'>
                {platformIcons[listing.platform?.toLowerCase()]}
                <h3 className='font-semibold'>{listing.title}</h3>
              </div>


              {/* Lock + Star */}
              <div className='flex items-center gap-3 relative group'>

                <LockIcon size={15} />

                <StarIcon
                  size={15}
                  className={`cursor-pointer ${listing.featured ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                />

                {/* Hover Add Credentials */}
                <div className='hidden group-hover:block absolute right-0 top-5 bg-white border rounded shadow text-xs p-2'>
                  <button
                    onClick={() => setShowCredentialSubmission(listing)}
                    className='text-indigo-600 hover:underline'
                  >
                    Add Credentials
                  </button>
                </div>
              </div>
            </div>


            {/* Username */}
            <p className='text-sm text-gray-500 mb-2'>@{listing.username}</p>


            {/* Followers + engagement + status */}
            <div className='flex justify-between mb-4 text-sm text-gray-600'>

              <div>
                <div className='flex items-center gap-1'>
                  <Users size={14} />
                  {formatNumber(listing.followers_count)} followers
                </div>

                <p className='text-xs text-gray-500'>
                  {listing.engagement_rate}% engagement
                </p>
              </div>

              <span className={`${getStatusColor(listing.status)} capitalize font-medium`}>
                ✓ {listing.status}
              </span>
            </div>


            {/* Footer */}
            <div className='flex justify-between items-center border-t pt-3'>

              <span className='font-bold text-lg'>
                {currency}{listing.price.toLocaleString()}
              </span>


              {/* ACTION BUTTONS */}
              <div className='flex gap-3 text-gray-500'>

                {/* Delete */}
                <button>
                  <TrashIcon size={16} />
                </button>


                {/* ✏️ EDIT BUTTON */}
                <button onClick={() => navigate(`/edit-listing/${listing.id}`)}>
                  <Edit size={16} className='hover:text-indigo-600 cursor-pointer' />
                </button>


                {/* Toggle */}
                <button>
                  {listing.status === 'active'
                    ? <EyeOffIcon size={16} />
                    : <EyeIcon size={16} />}
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>


      {/* ================= MODALS ================= */}

      {showCredentialSubmission &&
        <CredentialSubmission
          listing={showCredentialSubmission}
          onClose={() => setShowCredentialSubmission(null)}
        />
      }

      {showWithdrawal &&
        <WithdrawModel onClose={() => setShowWithdrawal(null)} />
      }

    </div>
  )
}


/* ================= SMALL COMPONENTS ================= */

const Stat = ({ title, value, icon, color }) => (
  <div className='bg-white rounded-xl border p-5 flex justify-between items-center shadow-sm'>
    <div>
      <p className='text-sm text-gray-500'>{title}</p>
      <h3 className='text-xl font-bold'>{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
  </div>
)

const Balance = ({ label, value, icon, onClick }) => (
  <div
    onClick={onClick}
    className='bg-white border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:shadow'
  >
    <div className='flex items-center gap-2 text-gray-600'>
      {icon}
      {label}
    </div>
    <span className='font-semibold'>${value.toFixed(2)}</span>
  </div>
)

export default MyListings
