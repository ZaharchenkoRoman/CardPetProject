import { Button, ButtonProps, SxProps } from "@mui/material"
import { FC, ReactNode } from "react"

export { Button } from "@mui/material"

interface ButtonPropsType extends ButtonProps {
  children?: ReactNode
  sx?: SxProps
}

export const CustomButton: FC<ButtonPropsType> = (props) => {
  const { children, sx, ...other } = props

  return (
    <Button
      {...other}
      sx={{
        transition: "all 300ms ease-in-out ",
        "&:hover": {
          transform: "scale(1.02)",
        },
        fontFamily: "inherit",
        height: "36px",
        width: "347px",
        color: "white",
        background: "var(--accent)",
        borderRadius: "30px",
        boxShadow: "0px 4px 18px 0px rgba(54, 110, 255, 0.35)",
        ...sx,
      }}
    >
      {children}
    </Button>
  )
}
