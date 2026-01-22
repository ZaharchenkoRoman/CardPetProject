import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  sx?: SxProps;
}
export const AuthContainer = (props: Props) => {
  const { children, sx } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: "-1px -1px 2px 0px rgba(0, 0, 0, 0.1), 1px 1px 2px 0px rgba(0, 0, 0, 0.1)",
        ...sx,
      }}
      component={"main"}
    >
      {children}
    </Box>
  );
};
