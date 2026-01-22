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
import { useAppSelector } from "@/src/store/hooks"
import DeleteModal from "@/src/components/mainPage/modal/DeleteModal"
import useDeleteModal from "@/src/components/tableComponent/useDeleteModal"
import { RenamePackModal } from "@/src/components/tableComponent/RenamePackModal"
import { useState } from "react"
import Link from "next/link"
import { packType } from "@/src/api/packsApi"

interface propsType {
  sx?: SxProps
  cardPacks?: packType[]
}

export default function TableComponent(props: propsType) {
  const { name } = useAppSelector((state) => state.auth)
  const [packId, setPackId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)
  const openHandler = (id: string) => {
    setIsOpen(true)
    setPackId(id)
  }
  const closeHandler = () => setIsOpen(false)

  const { deleteModal, openDeleteModal, nameDeletePack, isDeletePack, closeDeleteModal } =
    useDeleteModal()

  const { sx, cardPacks } = props

  return (
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
      <Table sx={{ height: "432px" }}>
        <TableHead sx={{ background: "rgba(239, 239, 239, 1)" }}>
          <TableRow sx={{ height: "48px" }}>
            <TableCell>Name</TableCell>
            <TableCell>Cards</TableCell>
            <TableCell>Last Update</TableCell>
            <TableCell>Created by</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPacks?.map((packRow) => (
            <TableRow key={packRow._id}>
              <TableCell>{packRow.name}</TableCell>
              <TableCell>{packRow.cardsCount}</TableCell>
              <TableCell>{packRow.updated.slice(0, 10)}</TableCell>
              <TableCell>{packRow.user_name}</TableCell>
              <TableCell>
                <Box>
                  <Link
                    href={{ pathname: `/my-packs/${packRow.name}`, query: { id: packRow._id } }}
                  >
                    <IconButton>
                      <SchoolIcon />
                    </IconButton>
                  </Link>
                  <>
                    {name === packRow.user_name && (
                      <>
                        <IconButton onClick={() => openHandler(packRow._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => openDeleteModal(packRow._id, packRow.name)}>
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
      <DeleteModal
        packName={nameDeletePack}
        deleteModal={deleteModal}
        packId={isDeletePack}
        closeDeleteModal={closeDeleteModal}
      />
      <RenamePackModal
        packId={packId}
        open={isOpen}
        onCloseHandler={closeHandler}
      />
    </TableContainer>
  )
}
