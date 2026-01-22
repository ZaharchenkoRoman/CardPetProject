import { Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  sx?: SxProps;
}
export const AuthPageContainer = (props: Props) => {
  const { children, sx } = props;
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      height={"calc(100vh - 60px)"}
      sx={{
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
};
