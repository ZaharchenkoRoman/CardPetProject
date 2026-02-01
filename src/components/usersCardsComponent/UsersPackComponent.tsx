"use client"

import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Rating,
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
import { AddNewCardModal } from "@/src/components/usersCardsComponent/modals/AddNewCardModal"
import SearchIcon from "@mui/icons-material/Search"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import useCustomPopover from "@/src/components/customButtons/CustomPopover"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { useGetCardsQuery } from "@/src/api/apiHooks/cards/useGetCardsQuery"
import { useCustomModal } from "@/src/components/customHooks/useCustomModal"
import { EditCardModal } from "@/src/components/usersCardsComponent/modals/EditCardModal"
import { useState } from "react"
import { DeleteCardModal } from "@/src/components/usersCardsComponent/modals/DeleteCardModal"
import { RenamePackModal } from "@/src/components/mainPageComponent/RenamePackModal"
import DeletePackModal from "@/src/components/mainPageComponent/DeletePackModal"
import TableContainer from "@mui/material/TableContainer"
import { useUpdateCardMutation } from "@/src/api/apiHooks/cards/useUpdateCardMutation"
import SchoolIcon from "@mui/icons-material/School"
import { useAppSelector } from "@/src/store/hooks"

export default function UsersPackComponent() {
  const [cardId, setCardId] = useState<string | null>(null)
  const { decodedPackName, data, packId } = useGetCardsQuery()
  const { CustomPopoverElement, setAnchor } = useCustomPopover()
  const changeCardContentModal = useCustomModal()
  const deleteCardModal = useCustomModal()
  const deletePackModal = useCustomModal()
  const editPackModal = useCustomModal()
  const addCardModal = useCustomModal()
  const { _id } = useAppSelector((state) => state.auth)
  const { editCardMutation } = useUpdateCardMutation()
  const changeRatingHandler = (id: string, value: number | null) => {
    editCardMutation({ cardId: id, grade: value })
  }

  const ChangeCardHandler = (cardId: string) => {
    setCardId(cardId)
    changeCardContentModal.OpenModalHandler()
  }
  const deleteCardHandler = (id: string) => {
    setCardId(id)
    deleteCardModal.OpenModalHandler()
  }
  if (!data) return null
  const cards = data.cards

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
          {decodedPackName}
          <IconButton
            size={"small"}
            sx={{ ml: "8px", border: "1px solid grey" }}
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
        </Typography>
        <CustomPopoverElement>
          <Box
            alignItems="start"
            justifyContent="center"
            display={"flex"}
            flexDirection={"column"}
          >
            <IconButton
              disableRipple
              onClick={editPackModal.OpenModalHandler}
            >
              <EditIcon />
              <p className={"ml-2"}>Edit</p>
            </IconButton>
            <IconButton
              disableRipple
              onClick={deletePackModal.OpenModalHandler}
            >
              <DeleteIcon />
              <p className={"ml-2"}>Delete</p>
            </IconButton>
          </Box>
        </CustomPopoverElement>
        {cards.length > 0 ? (
          <>
            <Box
              sx={{ mt: "28px" }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <label>
                <p>Search</p>
                <TextField
                  size={"small"}
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
                onClick={addCardModal.OpenModalHandler}
                sx={{ height: "36px", width: "171px", mt: "32px" }}
              >
                Add new card
              </CustomButton>
            </Box>
            <TableContainer
              sx={{
                mt: "24px",
                fontFamily: "inherit",
                "& .MuiTableCell-root": {
                  fontFamily: "inherit",
                },
              }}
              component={Paper}
            >
              <Table sx={{ mt: "24px" }}>
                <TableHead sx={{ background: "rgba(239, 239, 239, 1)" }}>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>Answer</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cards.map((cardRow) => (
                    <TableRow key={cardRow._id}>
                      <TableCell>{cardRow.question}</TableCell>
                      <TableCell>{cardRow.answer}</TableCell>
                      <TableCell>{cardRow.updated.slice(0, 10)}</TableCell>
                      <TableCell>
                        <Rating
                          value={cardRow.grade}
                          onChange={(event, value) => changeRatingHandler(cardRow._id, value)}
                        ></Rating>
                      </TableCell>
                      <TableCell>
                        {_id === cardRow.user_id ? (
                          <>
                            <IconButton onClick={() => deleteCardHandler(cardRow._id)}>
                              <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => ChangeCardHandler(cardRow._id)}>
                              <DriveFileRenameOutlineIcon />
                            </IconButton>
                          </>
                        ) : null}
                        <IconButton>
                          <SchoolIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
              onClick={addCardModal.OpenModalHandler}
              sx={{ height: "36px", width: "171px", mt: "32px" }}
            >
              Add new card
            </CustomButton>
          </Box>
        )}
        <addCardModal.ModalComponent>
          {({ isOpenModal, closeModalHandler }) => (
            <AddNewCardModal
              open={isOpenModal}
              handleClose={closeModalHandler}
            />
          )}
        </addCardModal.ModalComponent>
        <changeCardContentModal.ModalComponent>
          {({ isOpenModal, closeModalHandler }) => (
            <EditCardModal
              cardId={cardId}
              isOpenModal={isOpenModal}
              closeModalHandler={closeModalHandler}
            />
          )}
        </changeCardContentModal.ModalComponent>
        <deleteCardModal.ModalComponent>
          {({ isOpenModal, closeModalHandler }) => (
            <DeleteCardModal
              isOpenModal={isOpenModal}
              closeModalHandler={closeModalHandler}
              cardId={cardId}
            />
          )}
        </deleteCardModal.ModalComponent>
        <deletePackModal.ModalComponent>
          {({ isOpenModal, closeModalHandler }) => (
            <DeletePackModal
              deleteModal={isOpenModal}
              closeDeleteModal={closeModalHandler}
              packId={packId}
              packName={decodedPackName}
            ></DeletePackModal>
          )}
        </deletePackModal.ModalComponent>
        <editPackModal.ModalComponent>
          {({ isOpenModal, closeModalHandler }) => (
            <RenamePackModal
              packId={packId}
              packName={decodedPackName}
              onCloseHandler={closeModalHandler}
              open={isOpenModal}
            ></RenamePackModal>
          )}
        </editPackModal.ModalComponent>
      </Stack>
    </Container>
  )
}
