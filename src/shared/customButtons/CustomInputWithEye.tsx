"use client"

import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { forwardRef, useState } from "react"

export const CustomInputWithEye = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { label, size, variant, sx, helperText, ...rest } = props

  const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

  const EyeButton = visiblePassword ? VisibilityIcon : VisibilityOffIcon

  return (
    <TextField
      helperText={helperText}
      label={label}
      variant={variant}
      size={size}
      inputRef={ref}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position={"end"}>
              <IconButton
                edge={"end"}
                onClick={() => setVisiblePassword((prev) => !prev)}
              >
                <EyeButton />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      type={visiblePassword ? "text" : "password"}
      sx={{
        width: "347px",
        height: "48px",
        ...sx,
      }}
      {...rest}
    />
  )
})

CustomInputWithEye.displayName = "CustomInputWithEye"
