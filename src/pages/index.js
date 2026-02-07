import React from 'react'
import { LanguageProvider } from '../context/LanguageContext'
import Navigation from '../components/Navigation'
import Design1 from '../components/Design1'

const IndexPage = () => {
  return (
    <LanguageProvider>
      <div style={{ paddingTop: '60px' }}>
        <Navigation />
        <Design1 />
      </div>
    </LanguageProvider>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>LogopediperFemije - Speech Therapy for Children</title>
    <meta name="description" content="Professional speech therapy services for children" />
  </>
)
