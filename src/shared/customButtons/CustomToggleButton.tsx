"use client"

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { MouseEvent } from "react"
interface Props {
  alignment: "All" | "My" | null
  setAlignment: (newAlignment: "All" | "My" | null) => void
}
export default function CustomToggleButton(props: Props) {
  const { alignment, setAlignment } = props
  const handleAlignment = (event: MouseEvent<HTMLElement>, newAlignment: "All" | "My" | null) => {
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
        disableRipple
        value="My"
        aria-label="left aligned"
        sx={{
          flex: 1,
          "&.Mui-selected": {
            color: "white",
            backgroundColor: "var(--accent)",
          },
        }}
      >
        My
      </ToggleButton>

      <ToggleButton
        disableRipple
        value="All"
        aria-label="right aligned"
        sx={{
          flex: 1,
          "&.Mui-selected": {
            color: "white",
            backgroundColor: "var(--accent)",
          },
        }}
      >
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
