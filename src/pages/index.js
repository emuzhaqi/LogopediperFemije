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
    <title>Logopedi për Fëmijë - Speech Therapy for Children</title>
    <meta name="description" content="Professional speech therapy services for children" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  </>
)
