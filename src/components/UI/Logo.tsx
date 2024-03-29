import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <div className="flex items-center w-52 h-auto">
      <Image 
        src="/images/logo.png" 
        alt="logo" 
        width="120"
        height="120"
        priority
      />
      <h3 className="text-h3-bold text-blue-950">
        RapidTalks
      </h3>
    </div>
  )
}

export default Logo