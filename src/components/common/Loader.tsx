import { Box, CircularProgress, SxProps } from "@mui/material"
interface Props {
  sx?: SxProps
}
export const Loader = (props: Props) => {
  const { sx } = props
  return (
    <Box
      sx={{
        color: "var(--accent)",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        ...sx,
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  )
}
