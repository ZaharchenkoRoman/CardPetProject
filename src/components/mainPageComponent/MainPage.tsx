"use client"

import { CustomButton } from "@/src/shared/customButtons/CustomButton"
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
import CustomToggleButton from "@/src/shared/customButtons/CustomToggleButton"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import MainTableComponent from "@/src/components/mainPageComponent/MainTableComponent"
import SearchIcon from "@mui/icons-material/Search"
import CreatePackModal from "@/src/components/mainPageComponent/CreatePackModal"
import { useCustomModal } from "@/src/shared/customHooks/useCustomModal"
import { useAppSelector } from "@/src/store/hooks"
import { useSearch } from "@/src/components/mainPageComponent/useSearch"
import { Loader } from "@/src/components/common/Loader"
import { useGetPacksWithDebounce } from "@/src/shared/customHooks/useGetPacksWithDebounce"

export default function MainPage() {
  const { searchValue, searchHandler, setSearchValue } = useSearch()
  const { OpenModalHandler, ModalComponent } = useCustomModal()
  const { _id } = useAppSelector((state) => state.auth)

  const clearAllFiltersHandler = () => {
    setAlignment(null)
    setSearchValue("")
    setMinPacks(0)
  }

  const handleChangeSlider = (e: Event, newValue: number) => {
    setMinPacks(newValue)
  }
  const {
    setMinPacks,
    cardsPacks,
    itemsOnPage,
    page,
    itemsOnPageHandler,
    changePageHandler,
    totalPageCount,
    setAlignment,
    alignment,
    changeMinPacks,
    minPacks,
  } = useGetPacksWithDebounce(searchValue)
  if (!cardsPacks) return null
  if (!_id) return <Loader />

  return (
    <Stack sx={{ px: "136px", pb: "30px" }}>
      <Box
        display="flex"
        alignItems="center"
        mt={"39px"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
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
      <Grid
        sx={{ mt: "34px" }}
        container
        rowSpacing={"8px"}
        columnSpacing={"24px"}
      >
        <Grid size={4}>Search</Grid>
        <Grid size={4}>Show packs cards</Grid>
        <Grid size={4}>Min number of cards in pack</Grid>
        <Grid size={4}>
          <TextField
            value={searchValue}
            onChange={searchHandler}
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
          <CustomToggleButton
            alignment={alignment}
            setAlignment={setAlignment}
          />
        </Grid>
        <Grid size={2}>
          <Stack
            alignItems={"center"}
            columnGap={"12px"}
            flexDirection={"row"}
          >
            <Box
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"row"}
              display="flex"
              width={"94%"}
              gap={"20px"}
            >
              <Slider
                onChange={handleChangeSlider}
                step={10}
                value={minPacks}
                min={0}
                max={99}
                sx={{ ml: "10px" }}
                marks
              ></Slider>
              <TextField
                type={"number"}
                value={minPacks}
                onChange={changeMinPacks}
                size={"small"}
              ></TextField>
            </Box>
          </Stack>
        </Grid>
        <Grid size={2}>
          <IconButton onClick={clearAllFiltersHandler}>
            <FilterAltOffIcon />
          </IconButton>
        </Grid>
      </Grid>
      <MainTableComponent
        sx={{ mt: "24px" }}
        cardPacks={cardsPacks}
      />
      {cardsPacks.length > 0 ? (
        <Stack
          flexDirection={"row"}
          mt={"36px"}
          alignItems={"center"}
          justifyContent={"start"}
        >
          <Pagination
            sx={{ mr: "30px" }}
            count={totalPageCount}
            page={page}
            shape="rounded"
            onChange={changePageHandler}
          />
          <Typography
            component={"div"}
            sx={{ fontFamily: "inherit" }}
          >
            Show
            <Select
              sx={{ mx: "10px", width: "70px", height: "24px" }}
              size={"small"}
              onChange={itemsOnPageHandler}
              value={itemsOnPage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
            Cards per Page
          </Typography>
        </Stack>
      ) : null}
      <ModalComponent>
        {({ closeModalHandler, isOpenModal }) => (
          <CreatePackModal
            open={isOpenModal}
            handleClose={closeModalHandler}
          />
        )}
      </ModalComponent>
    </Stack>
  )
}
