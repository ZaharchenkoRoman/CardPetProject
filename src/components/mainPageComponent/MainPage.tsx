"use client"

import { CustomButton } from "@/src/components/customButtons/CustomButton"
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import CustomToggleButton from "@/src/components/customButtons/CustomToggleButton"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import TableComponent from "@/src/components/mainPageComponent/TableComponent"
import { useEffect } from "react"
import { useAppSelector } from "@/src/store/hooks"
import SearchIcon from "@mui/icons-material/Search"
import usePaginatedTable from "@/src/components/mainPageComponent/usePaginatedTable"
import CreatePackModal from "@/src/components/mainPageComponent/CreatePackModal"
import { useCustomModal } from "@/src/components/customHooks/useCustomModal"
import { useAuthMeMutation } from "@/src/api/apiHooks/auth/useAuthMeMutation"

export default function MainPage() {
  const { page, itemsOnPageHandler, changePageHandler, totalPageCount, itemsOnPage, cardsPacks } =
    usePaginatedTable()
  const { OpenModalHandler, ModalComponent } = useCustomModal()
  const { name } = useAppSelector((state) => state.auth)
  const { mutate } = useAuthMeMutation()
  useEffect(() => {
    if (!name) {
      mutate()
    }
  }, [mutate, name])

  return (
    <Stack sx={{ px: "136px" }}>
      <Box
        display="flex"
        alignItems="center"
        mt={"39px"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typography sx={{ fontFamily: "inherit", fontSize: "22px", fontWeight: "600" }}>
          Packs list
        </Typography>
        <CustomButton
          onClick={OpenModalHandler}
          sx={{
            height: "36px",
            width: "175px",
          }}
        >
          Add new pack
        </CustomButton>
      </Box>
      <ModalComponent>
        {({ closeModalHandler, isOpenModal }) => (
          <CreatePackModal
            open={isOpenModal}
            handleClose={closeModalHandler}
          />
        )}
      </ModalComponent>
      <Grid
        sx={{ mt: "34px" }}
        container
        rowSpacing={"8px"}
        columnSpacing={"24px"}
      >
        <Grid size={4}>Search</Grid>
        <Grid size={4}>Show packs cards</Grid>
        <Grid size={4}>Number of cards</Grid>
        <Grid size={4}>
          <TextField
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position={"start"}>
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: {
                  height: "36px",
                },
              },
            }}
          ></TextField>
        </Grid>
        <Grid size={4}>
          <CustomToggleButton />
        </Grid>
        <Grid size={3}>
          <Stack
            alignItems={"center"}
            columnGap={"12px"}
            flexDirection={"row"}
          >
            <TextField
              slotProps={{
                input: {
                  style: { height: "36px", width: "36px" },
                },
              }}
            ></TextField>
            <Slider sx={{ height: "16px", width: "155px" }}></Slider>
            <TextField
              slotProps={{
                input: {
                  style: { height: "36px", width: "36px" },
                },
              }}
            ></TextField>
          </Stack>
        </Grid>
        <Grid size={1}>
          <IconButton>
            <FilterAltOffIcon />
          </IconButton>
        </Grid>
      </Grid>
      <TableComponent
        sx={{ mt: "24px" }}
        cardPacks={cardsPacks}
      />
      <Stack
        flexDirection={"row"}
        mt={"36px"}
        alignItems={"center"}
        justifyContent={"start"}
      >
        <Pagination
          count={totalPageCount}
          page={page}
          shape="rounded"
          onChange={changePageHandler}
        />
        <Typography component={"div"}>
          Show
          <Select
            size={"small"}
            onChange={itemsOnPageHandler}
            value={itemsOnPage}
          >
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={15}>Fifty</MenuItem>
          </Select>
          Cards per Page
        </Typography>
      </Stack>
    </Stack>
  )
}
