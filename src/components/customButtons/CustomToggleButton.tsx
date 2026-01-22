"use client"

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { MouseEvent, useState } from "react"

export default function CustomToggleButton() {
  const [alignment, setAlignment] = useState<string | null>("left")

  const handleAlignment = (event: MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      sx={{ display: "flex", height: "36px", width: "196px" }}
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton
        value="left"
        aria-label="left aligned"
        sx={{ flex: 1 }}
      >
        My
      </ToggleButton>

      <ToggleButton
        value="right"
        aria-label="right aligned"
        sx={{ flex: 1 }}
      >
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
