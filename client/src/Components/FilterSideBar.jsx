import { ChevronDown, Filter, X } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSidebar = ({
  showFilterPhone,
  setShowFilterPhone,
  filters,
  setFilters,
}) => {
  const currency = import.meta.env.VITE_CURRENCY || '$'
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [isPlatformOpen, setIsPlatformOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [isFollowerOpen, setIsFollowerOpen] = useState(true)
  const [isNicheOpen, setIsNicheOpen] = useState(true)
  const [isStatusOpen, setIsStatusOpen] = useState(true)

  /* 🔹 Helper to update filters */
  const onFiltersChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  /* 🔹 Clear all filters */
  const onClearFilters = () => {
    navigate('/marketplace')
    setSearch('')
    setSearchParams({})

    setFilters({
      platform: null,
      maxPrice: 100000,
      minFollowers: 0,
      niche: null,
      verified: false,
      monetized: false,
    })
  }

  const platforms = [
    'YouTube',
    'Instagram',
    'TikTok',
    'Facebook',
    'Twitter',
    'LinkedIn',
    'Twitch',
    'Discord',
  ]

  const niches = [
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'travel', label: 'Travel' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'technology', label: 'Technology' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'food', label: 'Food' },
    { value: 'music', label: 'Music' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'photography', label: 'Photography' },
    { value: 'art', label: 'Art' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'parenting', label: 'Parenting' },
    { value: 'health', label: 'Health' },
  ]

  const onChangeSearch = (e) => {
    const value = e.target.value
    setSearch(value)

    if (value) {
      setSearchParams({ search: value })
    } else {
      navigate('/marketplace')
      setSearch('')
    }
  }

  const togglePlatform = (platform) => {
    setFilters((prev) => {
      const current = prev.platform || []
      return {
        ...prev,
        platform: current.includes(platform)
          ? current.filter((p) => p !== platform)
          : [...current, platform],
      }
    })
  }

  return (
    <div
      className={`
        ${showFilterPhone ? 'fixed inset-0 z-50' : 'hidden md:block'}
        bg-white rounded-lg shadow-sm border border-gray-200
        h-fit sticky top-24 md:w-[300px]
      `}
    >
      {/* HEADER */}
      <div className="p-4 border-b border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="size-4" />
            <h3 className="font-semibold">Filters</h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Clear Filters */}
            <X
              onClick={onClearFilters}
              title="Clear all filters"
              className="size-5 text-gray-400 hover:text-red-500 p-1 hover:bg-gray-100 rounded cursor-pointer"
            />

            {/* Close on mobile */}
            <X
              onClick={() => setShowFilterPhone(false)}
              className="size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded cursor-pointer md:hidden"
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by username, platform, niche, etc."
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md outline-indigo-500"
          value={search}
          onChange={onChangeSearch}
        />
      </div>

      {/* PLATFORM */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsPlatformOpen(!isPlatformOpen)}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          <span>Platform</span>
          <ChevronDown className={`size-4 ${isPlatformOpen ? 'rotate-180' : ''}`} />
        </button>

        {isPlatformOpen && (
          <div className="mt-4 space-y-3">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.platform?.includes(platform) || false}
                  onChange={() => togglePlatform(platform)}
                />
                {platform}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* PRICE */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          <span>Price Range</span>
          <ChevronDown className={`size-4 ${isPriceOpen ? 'rotate-180' : ''}`} />
        </button>

        {isPriceOpen && (
          <div className="mt-4 space-y-3">
            <input
              type="range"
              min="0"
              max="100000"
              step="100"
              value={filters.maxPrice || 100000}
              onChange={(e) =>
                onFiltersChange({ maxPrice: Number(e.target.value) })
              }
              className="w-full accent-indigo-600"
            />

            <div className="flex justify-between text-sm">
              <span>{currency}0</span>
              <span>
                {currency}{(filters.maxPrice || 100000).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* FOLLOWERS */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsFollowerOpen(!isFollowerOpen)}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          <span>Minimum Followers</span>
          <ChevronDown className={`size-4 ${isFollowerOpen ? 'rotate-180' : ''}`} />
        </button>

        {isFollowerOpen && (
          <select
            value={String(filters.minFollowers ?? 0)}
            onChange={(e) =>
              onFiltersChange({ minFollowers: Number(e.target.value) })
            }
            className="w-full mt-3 px-3 py-2 border rounded-lg"
          >
            <option value="0">Any amount</option>
            <option value="1000">1K+</option>
            <option value="10000">10K+</option>
            <option value="50000">50K+</option>
            <option value="100000">100K+</option>
            <option value="500000">500K+</option>
            <option value="1000000">1M+</option>
          </select>
        )}
      </div>

      {/* NICHE */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsNicheOpen(!isNicheOpen)}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          <span>Niche</span>
          <ChevronDown className={`size-4 ${isNicheOpen ? 'rotate-180' : ''}`} />
        </button>

        {isNicheOpen && (
          <select
            value={filters.niche || ''}
            onChange={(e) =>
              onFiltersChange({ niche: e.target.value || null })
            }
            className="w-full mt-3 px-3 py-2 border rounded-lg"
          >
            <option value="">All Niches</option>
            {niches.map((n) => (
              <option key={n.value} value={n.value}>
                {n.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* ACCOUNT STATUS */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          className="flex items-center justify-between w-full text-sm font-medium"
        >
          <span>Account Status</span>
          <ChevronDown className={`size-4 ${isStatusOpen ? 'rotate-180' : ''}`} />
        </button>

        {isStatusOpen && (
          <div className="mt-4 space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.verified || false}
                onChange={(e) =>
                  onFiltersChange({ verified: e.target.checked })
                }
              />
              Verified Accounts Only
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.monetized || false}
                onChange={(e) =>
                  onFiltersChange({ monetized: e.target.checked })
                }
              />
              Monetized Accounts Only
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterSidebar
