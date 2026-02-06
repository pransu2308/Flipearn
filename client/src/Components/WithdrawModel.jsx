import React, { useState } from 'react'
import { X } from 'lucide-react'

const WithdrawModel = ({ onClose }) => {

  const [amount, setAmount] = useState("")

  const [account, setAccount] = useState([
    { type: "text", name: "Account Holder Name", value: "" },
    { type: "text", name: "Bank Name", value: "" },
    { type: "number", name: "Account Number", value: "" },
    { type: "text", name: "Account Type", value: "" },
    { type: "text", name: "SWIFT", value: "" },
    { type: "text", name: "Branch", value: "" }
  ])

  /* ================= SUBMIT ================= */
  const handleSubmission = (e) => {
    e.preventDefault() // ✅ FIXED

    const data = {
      amount,
      accountDetails: account
    }

    console.log(data)

    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center sm:p-4 z-50'>

      <div className='bg-white sm:rounded-lg shadow-2xl w-full max-w-lg h-screen sm:h-auto flex flex-col'>

        {/* Header */}
        <div className='bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 sm:rounded-t-lg flex items-center justify-between'>
          <h3 className='font-semibold text-lg'>Withdraw Funds</h3>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmission}
          className='flex flex-col gap-4 p-4 overflow-y-auto'
        >

          {/* Amount */}
          <div className='grid grid-cols-[2fr_3fr] items-center gap-2'>
            <label className='text-sm font-medium'>Amount</label>

            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className='w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-indigo-400'
            />
          </div>

          {/* Account Fields */}
          {account.map((field, index) => (
            <div
              key={index}
              className='grid grid-cols-[2fr_3fr] items-center gap-2'
            >
              <label className='text-sm font-medium text-gray-800'>
                {field.name}
              </label>

              <input
                type={field.type}
                value={field.value}
                onChange={(e) =>
                  setAccount(prev =>
                    prev.map((c, i) =>
                      i === index ? { ...c, value: e.target.value } : c
                    )
                  )
                }
                className='w-full px-2 py-1.5 text-sm border border-gray-300 rounded outline-indigo-400'
              />
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 mt-4 rounded-md'
          >
            Apply for Withdrawal
          </button>

        </form>
      </div>
    </div>
  )
}

export default WithdrawModel
