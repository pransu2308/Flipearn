import React, { useState } from 'react'
import { X, CirclePlus } from 'lucide-react'
import toast from 'react-hot-toast'

const CredentialSubmission = ({ onClose, listing }) => {

  const [newField, setNewField] = useState("")

  const [credential, setCredential] = useState([
    { type: "email", name: "Email", value: "" },
    { type: "password", name: "Password", value: "" }
  ])

  /* ================= ADD FIELD ================= */
  const handleAddField = () => {
    const name = newField.trim()

    if (!name) return toast("Please enter a field name")

    setCredential(prev => [
      ...prev,
      { type: "text", name: name, value: "" }
    ])

    setNewField("")
  }

  /* ================= SUBMIT ================= */
  const handleSubmission = (e) => {
    e.preventDefault()

    const data = Object.fromEntries(
      credential.map(c => [c.name, c.value])
    )

    console.log(data)
    toast.success("Credentials submitted")
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50'>

      <div className='bg-white rounded-lg shadow-xl w-full max-w-lg h-[360px] flex flex-col'>

        {/* Header */}
        <div className='bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 flex items-center justify-between rounded-t-lg'>
          <div>
            <h3 className='font-semibold'>{listing?.title}</h3>
            <p className='text-xs'>
              Adding Credentials for {listing?.username}
            </p>
          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmission}
          className='p-4 flex flex-col gap-4 overflow-y-auto'
        >

          {credential.map((cred, index) => (
            <div
              key={index}   /* ✅ FIXED HERE */
              className='grid grid-cols-[2fr_3fr_1fr] items-center gap-2'
            >
              <label className='text-sm'>{cred.name}</label>

              <input
                type={cred.type}
                value={cred.value}
                onChange={(e) =>
                  setCredential(prev =>
                    prev.map((c, i) =>
                      i === index ? { ...c, value: e.target.value } : c
                    )
                  )
                }
                className='border rounded px-2 py-1'
              />

              <X
                className='cursor-pointer text-gray-500 hover:text-red-500'
                onClick={() =>
                  setCredential(prev => prev.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}

          {/* Add More */}
          <div className='flex items-center gap-2'>
            <input
              type="text"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
              placeholder="field name ..."
              className='border-b outline-none'
            />

            <button type='button' onClick={handleAddField}>
              <CirclePlus />
            </button>
          </div>

          <button className='bg-indigo-600 text-white px-4 py-2 rounded w-fit'>
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default CredentialSubmission
