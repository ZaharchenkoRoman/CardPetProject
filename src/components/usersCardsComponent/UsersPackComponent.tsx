"use client"

import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Pagination,
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
import { CustomButton } from "@/src/shared/customButtons/CustomButton"
import SearchIcon from "@mui/icons-material/Search"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import useCustomPopover from "@/src/shared/customButtons/CustomPopover"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { useGetCardsQuery } from "@/src/api/apiHooks/cards/useGetCardsQuery"
import { ChangeEvent } from "react"
import TableContainer from "@mui/material/TableContainer"
import { useUpdateCardMutation } from "@/src/api/apiHooks/cards/useUpdateCardMutation"
import SchoolIcon from "@mui/icons-material/School"
import { useAppDispatch, useAppSelector } from "@/src/store/hooks"
import { setCardData } from "@/src/store/cardSlice"
import useModals from "./modals/useModals"
import Modals from "@/src/components/usersCardsComponent/modals/Modals"
import { useCardWithFeatures } from "@/src/components/usersCardsComponent/useCardWithFiatures"
import Image from "next/image"
import { Loader } from "@/src/components/common/Loader"
const ITEMS_PER_PAGE = 10

export default function UsersPackComponent() {
  const { _id } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const { editPackModal, deleteCardModal, changeCardContentModal, addCardModal, deletePackModal } =
    useModals()
  const { CustomPopoverElement, setAnchor } = useCustomPopover()
  const { editCardMutation } = useUpdateCardMutation()
  const { debouncedValue, setSearchValue, setCardId, cardId, setPage, page, searchValue } =
    useCardWithFeatures()
  const { decodedPackName, data, packId } = useGetCardsQuery({
    debouncedValue,
    page,
    ITEMS_PER_PAGE,
  })

  const transferDataHandler = (question: string, answer: string) => {
    dispatch(setCardData({ question, answer, packName: decodedPackName }))
  }
  const { deckCover } = useAppSelector((state) => state.cards)
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
  const changeSearchQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  if (!data) return <Loader />
  const cardsTotal = data.cardsTotalCount
  const CountOfPages = Math.ceil(cardsTotal / ITEMS_PER_PAGE)
  const cards = data.cards
  const userId = data.packUserId
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
          <Box
            display="flex"
            flexDirection="row"
            columnGap={"10px"}
          >
            <Image
              src={deckCover ?? "/pics/cover.svg"}
              alt={"logo"}
              height={100}
              width={100}
            ></Image>
            {decodedPackName}
            {userId === _id && (
              <IconButton
                size={"small"}
                sx={{ ml: "8px", border: "1px solid grey", width: "40px", height: "40px" }}
                onClick={(e) => setAnchor(e.currentTarget)}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
        </Typography>
        <CustomPopoverElement>
          <Box
            component={"div"}
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
                  value={searchValue}
                  onChange={changeSearchQuestionHandler}
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
                          onChange={(_, value) => changeRatingHandler(cardRow._id, value)}
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
                        <Link
                          onClick={() => transferDataHandler(cardRow.question, cardRow.answer)}
                          href={{
                            pathname: `/test/${cardRow._id}`,
                          }}
                        >
                          <IconButton>
                            <SchoolIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              sx={{ my: "36px" }}
              page={page}
              count={CountOfPages}
              onChange={(_, page) => {
                setPage(page)
              }}
            ></Pagination>
          </>
        ) : userId === _id ? (
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
              This pack is empty! sorry.
            </Typography>
          </Box>
        )}
        <Modals
          packId={packId}
          decodedPackName={decodedPackName}
          cardId={cardId}
        />
      </Stack>
    </Container>
  )
}
