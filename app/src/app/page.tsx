'use client'

import { useState, useEffect } from 'react'

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    setTimeout(() => setIsLoaded(true), 100)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

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
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const fields = [
    { name: 'domain', label: 'Domain', placeholder: 'yoursite.com', hint: 'Your website domain' },
    { name: 'walletAddress', label: 'Wallet Address', placeholder: '0x...', hint: 'Ethereum address for payments' },
    { name: 'originIP', label: 'Origin IP / Host', placeholder: 'your-app.vercel.app', hint: 'Where we forward traffic' },
    { name: 'email', label: 'Email', placeholder: 'you@email.com', hint: 'For notifications' }
  ]

  return (
    <div className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen overflow-x-hidden font-[var(--font-space)] selection:bg-white selection:text-black">
      
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      {/* Custom Cursor Glow */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-40 transition-all duration-700 ease-out opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <a href="/" className="flex items-center gap-3 hover:opacity-50 transition-opacity">
          <img src="/logo.png" alt="DDoS" className="h-6 w-auto" />
          <span className="text-sm tracking-[0.3em] uppercase font-[var(--font-syne)] font-bold">DDoS</span>
        </a>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-8 py-32">
        <div className={`w-full max-w-xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header */}
          <div className="mb-16">
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-30 block mb-4">Register</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-[var(--font-syne)]">
              Domain Setup
            </h1>
            <p className="mt-4 text-sm opacity-40 max-w-md">
              Connect your domain to the DDoS protection layer. Start monetizing bot traffic.
            </p>
          </div>

          {/* Success State */}
          {submitStatus === 'success' ? (
            <div className={`transition-all duration-700 ${submitStatus === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {/* Success Message */}
              <div className="border border-green-500/30 bg-green-500/5 p-8 relative mb-8">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-green-500/50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-500/50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green-500/50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-green-500/50" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full border border-green-500/50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-green-400 font-[var(--font-syne)] font-semibold">Registration Complete</span>
                </div>
                <p className="text-sm opacity-60">
                  Your domain <span className="text-white font-medium">{formData.domain}</span> has been registered successfully.
                </p>
              </div>
              <div className="text-[10px] tracking-[0.5em] uppercase opacity-50 pb-8">
                  Next Step
                </div>
              {/* DNS Configuration Note */}
              <div className="border border-white/20 p-8 relative">
                
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30" />

                <h3 className="text-lg font-[var(--font-syne)] font-semibold mb-4">Configure Your DNS</h3>
                <p className="text-sm opacity-60 mb-6">
                  Update your DNS settings in your domain registrar's portal to point to our protection layer.
                </p>

                <div className="bg-white/5 border border-white/10 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Type</span>
                    <code className="text-sm font-mono text-white">A</code>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Name</span>
                    <code className="text-sm font-mono text-white">@</code>
                  </div>
                  <div className="w-full h-px bg-white/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.3em] uppercase opacity-40">Value</span>
                    <code className="text-sm font-mono text-amber-400">100.31.149.101</code>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-amber-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 text-xs">!</span>
                  </div>
                  <p className="text-xs opacity-50 leading-relaxed">
                    DNS propagation may take up to 48 hours. Once complete, all traffic to your domain will flow through DDoS protection.
                  </p>
                </div>
              </div>

              {/* Register Another */}
              <button
                onClick={() => {
                  setSubmitStatus('idle')
                  setFormData({ domain: '', walletAddress: '', originIP: '', email: '' })
                }}
                className="mt-12 group flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors duration-300"
              >
                <span>Register another domain</span>
                <span className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-white transition-all duration-300" />
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-12">
              {fields.map((field, index) => (
                <div 
                  key={field.name} 
                  className={`group transition-all duration-700`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <label className="text-[10px] tracking-[0.5em] uppercase opacity-30">
                      {field.label}
                    </label>
                    <span className="text-[10px] opacity-20">{field.hint}</span>
                  </div>
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
                      className="w-full bg-transparent border-0 border-b border-white/10 pb-4 text-xl font-light placeholder-white/20 focus:outline-none transition-all duration-500 disabled:opacity-50 font-[var(--font-space)]"
                    />
                    {/* Animated underline */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
                    <div 
                      className={`absolute bottom-0 left-0 h-px transition-all duration-500 ease-out ${
                        errors[field.name] 
                          ? 'w-full bg-red-500' 
                          : focused === field.name 
                            ? 'w-full bg-white' 
                            : 'w-0 bg-white'
                      }`} 
                    />
                    {/* Focus glow */}
                    <div 
                      className={`absolute -bottom-px left-0 right-0 h-8 bg-gradient-to-t from-white/5 to-transparent pointer-events-none transition-opacity duration-500 ${
                        focused === field.name ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                  {errors[field.name] && (
                    <p className="mt-3 text-red-400 text-xs tracking-wide flex items-center gap-2">
                      <span className="w-1 h-1 bg-red-400 rounded-full" />
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="border border-red-500/30 bg-red-500/5 p-6 relative">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-500/50" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500/50" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500/50" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-500/50" />
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-8 group relative px-12 py-4 border border-white/20 hover:border-white/50 transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 text-xs tracking-[0.3em] uppercase flex items-center gap-4">
                  {isLoading ? (
                    <>
                      <span>Registering</span>
                      <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Submit Registration</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.3em] uppercase text-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Submit Registration →
                </span>
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-24 flex items-center justify-between">
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-20">
              Protected by DDoS Shield
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase opacity-20">
              x402 Protocol
            </p>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${10 + (i * 7.5) % 90}%`,
              top: `${5 + (i * 8.3) % 90}%`,
              animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 5) * 0.4}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.1; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

export default Page