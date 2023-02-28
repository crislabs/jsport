import Dashboard from "@/components/Dashboard"
import Header from "@/components/Header"
import React from "react"

export default function LayoutDashboard({ children }: {children: React.ReactNode}) {


  return (
    <>
      <Dashboard />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </>
  )
}