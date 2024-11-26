'use client'
import React, { useEffect, useState } from "react";

function LoadingDots() {
    const [dots, setDots] = useState(".")
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDots(prevDots => (prevDots.length >= 3 ? "." : prevDots + "."))
      }, 500)
  
      return () => clearInterval(interval)
    }, [])
  
    return <span className="inline-block w-8 text-left">{dots}</span>
  }
  
  export function LoadingState() {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-xl font-semibold flex items-center">
          Generating<LoadingDots />
        </span>
      </div>
    )
  }
  