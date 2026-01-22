import { Alert } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export const AlertComponent = (props: Props) => {
  const { children } = props;

  return (
    <Alert
      sx={{
        position: "fixed",
        top: "90%",
        left: "50%",
        zIndex: 100,
        transform: "translate(-50%, -50%)",
        animation: "slideUp 0.3s ease-out forwards",
        "@keyframes slideUp": {
          "0%": {
            opacity: 0,
            transform: "translate(-50%, 100%)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%, -50%)",
          },
        },
        "@keyframes slideDown": {
          "0%": {
            opacity: 1,
            transform: "translate(-50%, -50%)",
          },
          "100%": {
            opacity: 0,
            transform: "translate(-50%, 100%)",
          },
        },
      }}
      variant={"filled"}
      severity={"error"}
    >
      {children}
    </Alert>
  );
};
