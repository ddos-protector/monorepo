'use client'

import { useState } from 'react'

const Page = () => {
  const [formData, setFormData] = useState({
    domain: '',
    walletAddress: '',
    originIP: '',
    email: ''
  })
  const [focused, setFocused] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting:', formData)
  }

  const fields = [
    { name: 'domain', label: 'Domain', placeholder: 'yoursite.ddos.best' },
    { name: 'walletAddress', label: 'Wallet Address', placeholder: '0xYourWalletAddress' },
    { name: 'originIP', label: 'Origin IP', placeholder: '127.0.0.1:9000' },
    { name: 'email', label: 'Email', placeholder: 'you@email.com' }
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="mb-16">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-2">Register</p>
          <h1 className="text-4xl font-display font-medium tracking-tight">Domain Setup</h1>
        </div>

        <div className="space-y-12">
          {fields.map((field, i) => (
            <div key={field.name} className="group">
              <label className="block text-neutral-500 text-xs tracking-widest uppercase mb-4">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.name === 'email' ? 'email' : 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused('')}
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-0 border-b border-neutral-800 pb-4 text-xl font-light placeholder-neutral-700 focus:outline-none focus:border-white transition-colors duration-500 font-mono placeholder:font-mono"
                />
                <div 
                  className={`absolute bottom-0 left-0 h-px bg-white transition-all duration-500 ease-out ${focused === field.name ? 'w-full' : 'w-0'}`} 
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-16 group flex items-center gap-4 text-sm tracking-widest uppercase text-neutral-400 hover:text-white transition-colors duration-300"
        >
          <span>Submit</span>
          <span className="w-12 h-px bg-neutral-700 group-hover:w-20 group-hover:bg-white transition-all duration-300" />
          <svg className="w-4 h-4 -ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        <p className="mt-24 text-neutral-600 text-xs">
          Protected by DDoS Shield
        </p>
      </div>
    </div>
  )
}

export default Page