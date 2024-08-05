import React from "react"
import { createRoot } from "react-dom/client"

import "./styles/index.css"
import AppLayout from "@/components/layout/AppLayout"

const container = document.getElementById("root")
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <AppLayout />
  </React.StrictMode>
)
