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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'domain':
        if (!value.trim()) return 'Domain is required'
        if (!/^[a-zA-Z0-9][a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}$/.test(value)) {
          return 'Enter a valid domain (e.g., example.com)'
        }
        return ''
      case 'walletAddress':
        if (!value.trim()) return 'Wallet address is required'
        if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
          return 'Enter a valid Ethereum address'
        }
        return ''
      case 'originIP':
        if (!value.trim()) return 'Origin IP/Host is required'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Enter a valid email address'
        }
        return ''
      default:
        return ''
    }
  }

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) newErrors[key] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFocused('')
    const error = validateField(name, value)
    if (error) setErrors({ ...errors, [name]: error })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    setErrorMessage('')

    if (!validateAll()) return

    setIsLoading(true)

    try {
      const response = await fetch('https://tee.ddos.best/api/v1/domain/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: formData.domain,
          Walletaddress: formData.walletAddress,
          originIP: formData.originIP,
          email: formData.email,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Registration failed')
      }

      setSubmitStatus('success')
      setFormData({ domain: '', walletAddress: '', originIP: '', email: '' })
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const fields = [
    { name: 'domain', label: 'Domain', placeholder: 'yoursite.com' },
    { name: 'walletAddress', label: 'Wallet Address', placeholder: '0x...' },
    { name: 'originIP', label: 'Origin IP / Host', placeholder: 'your-app.vercel.app' },
    { name: 'email', label: 'Email', placeholder: 'you@email.com' }
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="mb-16">
          <p className="text-neutral-500 text-xs tracking-widest uppercase mb-2">Register</p>
          <h1 className="text-4xl font-display font-medium tracking-tight">Domain Setup</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {fields.map((field) => (
            <div key={field.name} className="group">
              <label className="block text-neutral-500 text-xs tracking-widest uppercase mb-4">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.name === 'email' ? 'email' : 'text'}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field.name)}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  disabled={isLoading}
                  className="w-full bg-transparent border-0 border-b border-neutral-800 pb-4 text-xl font-light placeholder-neutral-700 focus:outline-none transition-colors duration-500 font-sans disabled:opacity-50"
                />
                <div 
                  className={`absolute bottom-0 left-0 h-px transition-all duration-500 ease-out ${
                    errors[field.name] 
                      ? 'w-full bg-red-500' 
                      : focused === field.name 
                        ? 'w-full bg-white' 
                        : 'w-0 bg-white'
                  }`} 
                />
              </div>
              {errors[field.name] && (
                <p className="mt-2 text-red-400 text-xs tracking-wide">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-16 group flex items-center gap-4 text-sm tracking-widest uppercase text-neutral-400 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? 'Registering...' : 'Submit'}</span>
            {!isLoading && (
              <>
                <span className="w-12 h-px bg-neutral-700 group-hover:w-20 group-hover:bg-white transition-all duration-300" />
                <svg className="w-4 h-4 -ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
            {isLoading && (
              <div className="w-4 h-4 border border-neutral-600 border-t-white rounded-full animate-spin" />
            )}
          </button>
        </form>

        {submitStatus === 'success' && (
          <div className="mt-8 p-4 border border-green-800 bg-green-950/30 rounded">
            <p className="text-green-400 text-sm">Domain registered successfully!</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-8 p-4 border border-red-800 bg-red-950/30 rounded">
            <p className="text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        <p className="mt-24 text-neutral-600 text-xs">
          Protected by DDoS Shield
        </p>
      </div>
    </div>
  )
}

export default Page