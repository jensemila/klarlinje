'use client'

import { useEffect, useState } from 'react'

type ConsentStatus = 'granted' | 'denied'

function updateGtagConsent(analytics: ConsentStatus, ads: ConsentStatus) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('consent', 'update', {
    analytics_storage: analytics,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  })
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent')
    if (!stored) {
      setVisible(true)
    } else {
      const { analytics, ads } = JSON.parse(stored)
      updateGtagConsent(analytics, ads)
    }
  }, [])

  function accept() {
    const consent = { analytics: 'granted' as ConsentStatus, ads: 'denied' as ConsentStatus }
    localStorage.setItem('cookie_consent', JSON.stringify(consent))
    updateGtagConsent(consent.analytics, consent.ads)
    setVisible(false)
  }

  function decline() {
    const consent = { analytics: 'denied' as ConsentStatus, ads: 'denied' as ConsentStatus }
    localStorage.setItem('cookie_consent', JSON.stringify(consent))
    updateGtagConsent(consent.analytics, consent.ads)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div
        className="max-w-2xl mx-auto rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4"
        style={{ backgroundColor: '#243D33', color: '#F4EFE6' }}
      >
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#C4A882' }}>
          Vi bruker informasjonskapsler for å forstå hvordan siden brukes.
          Ingen annonsesporing. Les{' '}
          <a href="/personvern" className="underline" style={{ color: '#F4EFE6' }}>
            personvernerklæringen
          </a>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-70"
            style={{ backgroundColor: 'transparent', border: '1px solid #C4A882', color: '#C4A882' }}
          >
            Avslå
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-70"
            style={{ backgroundColor: '#B5674D', color: '#F4EFE6' }}
          >
            Godta
          </button>
        </div>
      </div>
    </div>
  )
}
