import React from 'react'
import { FeedbackSystem } from '../../components/Feedback10'
import { longVersion, shortVersion } from '../../data'

const Tussen = () => {
  return (
    <FeedbackSystem longVersion={longVersion} shortVersion={shortVersion}/>
  )
}

export default Tussen