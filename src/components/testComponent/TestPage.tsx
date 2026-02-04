"use client"

import { useAppSelector } from "@/src/store/hooks"
import { useRouter } from "next/navigation"
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { CustomButton } from "@/src/shared/customButtons/CustomButton"
import { ChangeEvent, useState } from "react"

type ValueTypes = "Did not know" | "Forgot" | "A lot of thought" | "Confused" | "Knew the answer"

export default function TestPage() {
  const router = useRouter()
  const { answer, question, packName } = useAppSelector((state) => state.cards)
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [rateValue, setRateValue] = useState<ValueTypes | null>(null)

  return (
    <Stack
      mx={"136px"}
      flexDirection={"column"}
    >
      <Typography
        onClick={() => router.back()}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mt: "24px",

          fontFamily: "inherit",
          ":hover": {
            color: "var(--accent)",
            cursor: "pointer",
          },
        }}
      >
        <KeyboardBackspaceIcon sx={{ mr: "8px", mb: "1px" }} />
        Back to Packs
      </Typography>

      <Box
        mt={"27px"}
        alignSelf={"center"}
        textAlign={"center"}
      >
        <h1 className={"mb-4 text-2xl font-semibold"}>Learn card: {packName}</h1>
        <Box boxShadow={"-1px -1px 2px 0px rgba(0, 0, 0, 0.1), 1px 1px 2px 0px rgba(0, 0, 0, 0.1)"}>
          <Typography sx={{ pt: 5, mb: "13px", fontFamily: "inherit" }}>
            <span className={"font-semibold"}>Question:</span> {question}
          </Typography>

          <Typography
            mb={"35px"}
            fontFamily={"inherit"}
            color="text.secondary"
          >
            Количество попыток ответов на вопрос: 10
          </Typography>

          {isAnswered && (
            <>
              <Box>
                <Typography sx={{ fontFamily: "inherit" }}>Answer: {answer}</Typography>

                <FormControl
                  component="fieldset"
                  sx={{ my: "24px" }}
                >
                  <FormLabel component="legend">Rate yourself:</FormLabel>
                  <FormGroup
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      fontFamily: "inherit",
                    }}
                  >
                    <FormControlLabel
                      checked={rateValue === "Did not know"}
                      value="Did not know"
                      control={
                        <Checkbox
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setRateValue(e.target.value as ValueTypes)
                          }
                        />
                      }
                      label="Did not know"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={rateValue === "Forgot"}
                      value="Forgot"
                      control={
                        <Checkbox
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setRateValue(e.target.value as ValueTypes)
                          }
                        />
                      }
                      label="Forgot"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={rateValue === "A lot of thought"}
                      value="A lot of thought"
                      control={
                        <Checkbox
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setRateValue(e.target.value as ValueTypes)
                          }
                        />
                      }
                      label="A lot of thought"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={rateValue === "Confused"}
                      value="Confused"
                      control={
                        <Checkbox
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setRateValue(e.target.value as ValueTypes)
                          }
                        />
                      }
                      label="Confused"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      checked={rateValue === "Knew the answer"}
                      value="Knew the answer"
                      control={
                        <Checkbox
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setRateValue(e.target.value as ValueTypes)
                          }
                        />
                      }
                      label="Knew the answer"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </>
          )}
          <CustomButton
            sx={{
              height: "36px",
              width: "373px",
              mx: "33px",
              mb: "33px",
            }}
            onClick={isAnswered ? router.back : () => setIsAnswered((prev) => !prev)}
          >
            {isAnswered ? "Try other card" : "Show answer"}
          </CustomButton>
        </Box>
      </Box>
    </Stack>
  )
}
