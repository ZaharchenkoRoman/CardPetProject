"use client"

import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material"
import Link from "next/link"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { CustomButton } from "@/src/components/customButtons/CustomButton"
import { useParams, useSearchParams } from "next/navigation"
import { AddNewCardModal } from "@/src/components/modals/AddNewCardModal"
import UseCreateCardModal from "@/src/app/my-packs/[packName]/useCreateCardModal"
import { useQuery } from "@tanstack/react-query"
import { cardsApi } from "@/src/api/cardsApi"
import SearchIcon from "@mui/icons-material/Search"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useState } from "react"
import CustomPopover from "@/src/components/customButtons/CustomPopover"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"

export default function Page() {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const closeHandler = () => setAnchor(null)
  const open = Boolean(anchor)

  const { packName } = useParams()
  const { createHandler, answerRef, questionRef, openNewCardModal, HandleOpen, HandleClose } =
    UseCreateCardModal()
  const params = useSearchParams()
  const packId = params.get("id")
  const { data } = useQuery({
    queryKey: ["cards", packId],
    queryFn: () => cardsApi.getCards(packId),
  })
  if (!data) return null
  const cards = data.data.cards
  console.log(openNewCardModal)
  return (
    <Container maxWidth={false}>
      <Stack
        mx={"136px"}
        flexDirection={"column"}
      >
        <Link href={"/"}>
          <Typography
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
            Back to Packs List
          </Typography>
        </Link>
        <Typography sx={{ fontSize: "22px", mt: "27px", fontFamily: "inherit", fontWeight: 600 }}>
          {packName}
          <IconButton
            size={"small"}
            sx={{ ml: "8px", border: "1px solid grey" }}
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        </Typography>
        <CustomPopover
          anchor={anchor}
          open={open}
          handleClose={closeHandler}
        >
          <Box
            alignItems="start"
            justifyContent="center"
            display={"flex"}
            flexDirection={"column"}
          >
            <IconButton disableRipple>
              <EditIcon />
              <p className={"ml-2"}>Edit</p>
            </IconButton>
            <IconButton disableRipple>
              <DeleteIcon />
              <p className={"ml-2"}>Delete</p>
            </IconButton>
          </Box>
        </CustomPopover>
        {cards ? (
          <>
            <Box
              sx={{ mt: "28px" }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <label>
                <p>Search</p>
                <TextField
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position={"start"}>
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                ></TextField>
              </label>
              <CustomButton
                onClick={HandleOpen}
                sx={{ height: "36px", width: "171px", mt: "32px" }}
              >
                Add new card
              </CustomButton>
            </Box>
            <Table sx={{ mt: "24px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell>Answer</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((cardRow) => (
                  <TableRow key={cardRow._id}>
                    <TableCell>{cardRow.question}</TableCell>
                    <TableCell>{cardRow.answer}</TableCell>
                    <TableCell>{cardRow.updated.slice(0, 10)}</TableCell>
                    <TableCell>
                      {cardRow.grade}
                      <IconButton sx={{ ml: "30px" }}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton>
                        <DriveFileRenameOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AddNewCardModal
              answerRef={answerRef}
              questionRef={questionRef}
              open={openNewCardModal}
              handleClose={HandleClose}
              createHandler={createHandler}
            />
          </>
        ) : (
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent="center"
            mt={"86px"}
          >
            <Typography
              fontFamily={"inherit"}
              color={"var(--secondary)"}
            >
              This pack is empty. Click add new cards to fill this pack
            </Typography>
            <CustomButton
              onClick={HandleOpen}
              sx={{ height: "36px", width: "171px", mt: "32px" }}
            >
              Add new card
            </CustomButton>
            <AddNewCardModal
              answerRef={answerRef}
              questionRef={questionRef}
              open={openNewCardModal}
              handleClose={HandleClose}
              createHandler={createHandler}
            />
          </Box>
        )}
      </Stack>
    </Container>
  )
}
