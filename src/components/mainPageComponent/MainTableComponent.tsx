"use client"
import TableContainer from "@mui/material/TableContainer"
import {
  Box,
  IconButton,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch, useAppSelector } from "@/src/store/hooks"
import DeletePackModal from "@/src/components/mainPageComponent/DeletePackModal"
import { RenamePackModal } from "@/src/components/mainPageComponent/RenamePackModal"
import Link from "next/link"
import { packType } from "@/src/api/packsApi"
import { useCustomModal } from "@/src/shared/customHooks/useCustomModal"
import { useState } from "react"
import Image from "next/image"
import { ParamValue } from "next/dist/server/request/params"
import { setDeckCover } from "@/src/store/cardSlice"
interface propsType {
  sx?: SxProps
  cardPacks?: packType[]
}

export default function MainTableComponent(props: propsType) {
  const { sx, cardPacks } = props
  const dispatch = useAppDispatch()
  const { _id } = useAppSelector((state) => state.auth)

  const renamePackModal = useCustomModal()
  const deletePackModal = useCustomModal()

  const [packName, setPackName] = useState<ParamValue | null>(null)
  const [packId, setPackId] = useState<string | null>(null)

  const deletePackHandler = (name: string, id: string) => {
    deletePackModal.OpenModalHandler()
    setPackName(name)
    setPackId(id)
  }
  const imageToPropsHandler = (img: string) => {
    dispatch(setDeckCover(img))
  }
  const editPackHandler = (name: string, id: string) => {
    renamePackModal.OpenModalHandler()
    setPackName(name)
    setPackId(id)
  }

  if (!cardPacks) return null

  if (cardPacks.length === 0) {
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"349px"}
      >
        <p>Packs not found</p>
      </Box>
    )
  }
  return (
    <>
      <TableContainer
        sx={{
          ...sx,
          fontFamily: "inherit",
          "& .MuiTableCell-root": {
            fontFamily: "inherit",
          },
        }}
        component={Paper}
      >
        <Table>
          <TableHead sx={{ background: "rgba(239, 239, 239, 1)" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cards</TableCell>
              <TableCell>Last Update</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardPacks.map((packRow) => (
              <TableRow
                key={packRow._id}
                sx={{ maxHeight: "48px" }}
              >
                <TableCell>
                  <Box
                    columnGap={5}
                    alignItems={"center"}
                    display={"flex"}
                    flexDirection={"row"}
                  >
                    <Image
                      alt="deckCover"
                      src={packRow.deckCover || "pics/cover.svg"}
                      width={150}
                      height={150}
                    ></Image>
                    <span>{packRow.name}</span>
                  </Box>
                </TableCell>
                <TableCell>{packRow.cardsCount}</TableCell>
                <TableCell>{packRow.updated.slice(0, 10)}</TableCell>
                <TableCell>{packRow.user_name}</TableCell>
                <TableCell>
                  <Box>
                    <Link
                      onClick={() => imageToPropsHandler(packRow.deckCover)}
                      href={{
                        pathname: `/my-packs/${packRow.name}`,
                        query: { id: packRow._id },
                      }}
                    >
                      <IconButton>
                        <SchoolIcon />
                      </IconButton>
                    </Link>
                    <>
                      {_id === packRow.user_id && (
                        <>
                          <IconButton onClick={() => editPackHandler(packRow.name, packRow._id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => deletePackHandler(packRow.name, packRow._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <deletePackModal.ModalComponent>
        {({ isOpenModal, closeModalHandler }) => (
          <DeletePackModal
            deleteModal={isOpenModal}
            closeDeleteModal={closeModalHandler}
            packName={packName}
            packId={packId}
          />
        )}
      </deletePackModal.ModalComponent>
      <renamePackModal.ModalComponent>
        {({ isOpenModal, closeModalHandler }) => (
          <RenamePackModal
            packName={packName}
            packId={packId}
            open={isOpenModal}
            onCloseHandler={closeModalHandler}
          />
        )}
      </renamePackModal.ModalComponent>
    </>
  )
}
