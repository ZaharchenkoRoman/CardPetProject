import { Popover } from "@mui/material"
import { ReactNode } from "react"

interface propsTypes {
  open: boolean
  handleClose: () => void
  children: ReactNode
  anchor: HTMLButtonElement | null
}

export default function CustomPopover(props: propsTypes) {
  const { handleClose, open, children, anchor } = props
  return (
    <Popover
      anchorEl={anchor}
      sx={{ display: "flex", flexDirection: "column" }}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {children}
    </Popover>
  )
}
