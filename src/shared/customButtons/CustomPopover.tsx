import { Popover } from "@mui/material"
import { ReactNode, useState } from "react"

export default function useCustomPopover() {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const closeHandler = () => setAnchor(null)
  const open = Boolean(anchor)

  const CustomPopoverElement = ({ children }: { children: ReactNode }) => {
    if (!anchor) return null
    return (
      <Popover
        anchorEl={anchor}
        sx={{ display: "flex", flexDirection: "column" }}
        open={open}
        onClose={closeHandler}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {children}
      </Popover>
    )
  }
  return { CustomPopoverElement, setAnchor }
}
