import React, { useState } from 'react'
import { LanguageProvider } from '../context/LanguageContext'
import Navigation from '../components/Navigation'
import Design1 from '../components/Design1'
import Design2 from '../components/Design2'
import Design3 from '../components/Design3'
import Design4 from '../components/Design4'
import Design5 from '../components/Design5'

const IndexPage = () => {
  const [currentDesign, setCurrentDesign] = useState(1)

  const renderDesign = () => {
    switch (currentDesign) {
      case 1:
        return <Design1 />
      case 2:
        return <Design2 />
      case 3:
        return <Design3 />
      case 4:
        return <Design4 />
      case 5:
        return <Design5 />
      default:
        return <Design1 />
    }
  }

  return (
    <LanguageProvider>
      <div style={{ paddingTop: '60px' }}>
        <Navigation currentDesign={currentDesign} setCurrentDesign={setCurrentDesign} />
        {renderDesign()}
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
