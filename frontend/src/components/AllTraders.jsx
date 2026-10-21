import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  ClockCounterClockwise,
  MagnifyingGlass,
  X,
  XCircle,
} from "@phosphor-icons/react";
import UseWindowSize from "../hooks/UseWindowSize";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAddExpertTraderToUser,
  getAllExpertTraders,
  myExpertTrader,
} from "../redux/features/expertTraders/expertTradersSlice";
import { shortenText } from "../utils";
const AllTraders = () => {
  const [loading, setLoading] = useState(true);

  const size = UseWindowSize();

  const dispatch = useDispatch();

  const { isLoading, expertTraders } = useSelector(
    (state) => state.expertTraders,
  );

  const { singleUser, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (expertTraders.length === 0) {
      dispatch(getAllExpertTraders());
    }
  }, [dispatch]);

  const [expertTradersList, setExpertTradersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAllCoins = Array.isArray(expertTradersList)
    ? expertTradersList.filter(
        (expertTraders) =>
          expertTraders.firstname
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim()) ||
          expertTraders.lastname
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim()) ||
          expertTraders.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim()),
      )
    : [];

  useEffect(() => {
    if (expertTraders.length !== 0) {
      setExpertTradersList(expertTraders);
    }
  }, [expertTraders]);

  const [selectedTrader, setSelectedTrader] = useState(null);

  const handleCopyTrader = (expertTraderID) => {
    if (user?.role === "admin") {
      const formData = {
        expertTraderID,
        UserId: singleUser?._id,
      };

      dispatch(adminAddExpertTraderToUser(formData));
    } else dispatch(myExpertTrader({ expertTraderID }));
    // console.log(expertTraderID)
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {isLoading ? (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          height={size.height - 100}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Stack mt={1}>
          <Box display={{ xs: "flex", md: "flex" }}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="calculator" edge="end">
                      <MagnifyingGlass />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "20px",
                },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography
                variant={size.width < 600 ? "h5" : "h4"}
                fontWeight={800}
                mt={3}
                px={1}
              >
                Top Traders
              </Typography>
              <Typography variant="subtitle2" px={1}>
                copy any of our top traders
              </Typography>
            </Stack>

            <Button
              variant="contained"
              size="small"
              startIcon={<ClockCounterClockwise size={20} />}
              onClick={() => dispatch(getAllExpertTraders())}
            >
              {" "}
              Refresh
            </Button>
          </Stack>

          {expertTraders.length < 1 ? (
            <Stack mt={2} justifyContent={"center"} alignItems={"center"}>
              <XCircle size={70} />
              <Typography variant="h5">No Trader Available</Typography>
            </Stack>
          ) : (
            <Box
              mt={2}
              display={"flex"}
              gap={2}
              rowGap={{ xs: 1, sm: 24, md: 5 }}
              flexWrap={"wrap"}
              justifyContent={"center"}
              sx={{
                "& > div": {
                  width: { xs: "100%", md: "300px" },
                  height: "330px",
                  backgroundColor: "transparent",
                },
              }}
            >
              {expertTraders &&
                filteredAllCoins.map((experttrader, index) => (
                  <Box
                    key={experttrader?._id}
                    mb={3}
                    p={2.5}
                    sx={{
                      width: "100%",
                      maxWidth: "350px",
                      boxSizing: "border-box",
                      backgroundColor: "#ffffff",
                      border: "1px solid #dce3ed",
                      borderRadius: "13px",
                      color: "#111827",
                    }}
                  >
                    {/* Trader profile */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                      mb={2}
                    >
                      <Box
                        sx={{
                          width: 54,
                          height: 54,
                          flexShrink: 0,
                          borderRadius: "50%",
                          overflow: "hidden",
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <img
                          src={experttrader?.photo}
                          alt={`${experttrader?.firstname} ${experttrader?.lastname}`}
                          onLoad={() => setLoading(false)}
                          onError={() => setLoading(false)}
                          width="100%"
                          height="100%"
                          style={{
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </Box>

                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <Typography
                            fontWeight={700}
                            fontSize={15}
                            noWrap
                            color="#8490a5"
                          >
                            {experttrader?.firstname} {experttrader?.lastname}
                          </Typography>

                          {/* Verified icon */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              color: "#10b981",
                            }}
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2l2.4 2 3.1-.1 1.1 2.9 2.5 1.8-.8 3 .8 3-2.5 1.8-1.1 2.9-3.1-.1L12 22l-2.4-2-3.1.1-1.1-2.9-2.5-1.8.8-3-.8-3 2.5-1.8 1.1-2.9 3.1.1L12 2z" />
                              <path
                                d="M8 12l2.5 2.5L16 9"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Box>
                        </Stack>

                        <Typography fontSize={12} color="#8490a5" noWrap>
                          {experttrader?.email}
                        </Typography>

                        <Typography fontSize={12} color="#f59e0b">
                          ★★★★★
                        </Typography>
                      </Box>

                      {/* Trader ranking */}
                      <Typography
                        fontSize={11}
                        color="#8490a5"
                        sx={{ alignSelf: "flex-start" }}
                      >
                        #{index + 1}
                      </Typography>
                    </Stack>

                    {/* Monthly return and chart */}
                    <Box mb={2}>
                      <Typography fontSize={12} color="#8490a5" mb={0.3}>
                        Monthly Return
                      </Typography>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                      >
                        <Typography
                          fontSize={23}
                          fontWeight={800}
                          color="#10b981"
                          lineHeight={1.2}
                        >
                         +{experttrader?.profitShare ?? "0%"}
                        </Typography>

                        {/* Decorative performance chart */}
                        <Stack
                          direction="row"
                          alignItems="flex-end"
                          spacing="3px"
                          height="35px"
                          sx={{ flexShrink: 0 }}
                        >
                          {[
                            12, 22, 16, 27, 19, 30, 14, 24, 18, 29, 13, 21, 16,
                            26, 11, 19,
                          ].map((height, i) => (
                            <Box
                              key={i}
                              sx={{
                                width: 4,
                                height: `${height}px`,
                                backgroundColor:
                                  i % 4 === 0 ? "#f43f5e" : "#10c987",
                              }}
                            />
                          ))}
                        </Stack>
                      </Stack>
                    </Box>

                    {/* Trader statistics */}
                    <Box
                      sx={{
                        borderTop: "1px solid #edf0f5",
                        pt: 1.8,
                        pb: 1.8,
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <Box>
                          <Typography
                            fontSize={13}
                            fontWeight={700}
                            color="#10b981"
                          >
                            {experttrader?.winRate ?? "0%"}
                          </Typography>
                          <Typography fontSize={11} color="#8490a5">
                            Win ratio
                          </Typography>
                        </Box>

                        <Box textAlign="center">
                          <Typography
                            fontSize={13}
                            fontWeight={700}
                            color="#8490a5"
                          >
                            {/* {experttrader?.copiers ?? "0"} */}
                             {1393 + index * 127}
                          </Typography>
                          <Typography fontSize={11} color="#8490a5">
                            Copiers
                          </Typography>
                        </Box>

                        <Box textAlign="right">
                          <Typography
                            fontSize={13}
                            fontWeight={700}
                            color="#f59e0b"
                          >
                            {/* {experttrader?.risk ?? "5/10"} */}
                            {experttrader?.risk ?? `${3 + (index % 6)}/10`}
                          </Typography>
                          <Typography fontSize={11} color="#8490a5">
                            Risk
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    {/* Actions */}
                    <Stack direction="row" spacing={1.2}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                          setSelectedTrader(experttrader);
                          handleOpen();
                        }}
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: 12,
                          // color: "#111827",
                          borderColor: "#dce3ed",
                          borderRadius: "9px",
                          py: 1.1,
                          "&:hover": {
                            borderColor: "#10b981",
                            backgroundColor: "#f0fdf8",
                          },
                        }}
                      >
                        Portfolio
                      </Button>

                      <Button
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        onClick={() => {
                          setSelectedTrader(experttrader);
                          handleOpen();
                        }}
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          fontSize: 12,
                          color: "#ffffff",
                          backgroundColor: "#10b995",
                          boxShadow: "none",
                          borderRadius: "9px",
                          py: 1.1,
                          "&:hover": {
                            backgroundColor: "#059b7d",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Copy Trades
                      </Button>
                    </Stack>
                  </Box>
                ))}
            </Box>
          )}
        </Stack>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: { xs: "95%", sm: "60%", md: 450 },
            maxHeight: "100%",
            overflow: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            borderRadius: "10px",
            p: 2,
          }}
        >
          <Stack>
            <Box
              position={"relative"}
              border={"1px solid grey"}
              borderRadius={"10px"}
              overflow={"hidden"}
            >
              <Stack
                position={"absolute"}
                bottom={0}
                left={0}
                backgroundColor="black"
                p={"4px 8px"}
              >
                <Typography
                  sx={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                  variant="h5"
                  fontWeight={700}
                  color={"white"}
                >
                  {selectedTrader?.firstname} {selectedTrader?.lastname}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
                position={"absolute"}
                top={0}
                width={"100%"}
                height={"220px"}
                p={0.5}
              >
                {loading ? (
                  ""
                ) : (
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "green", color: "white" }}
                    onClick={() => {
                      handleCopyTrader(selectedTrader?._id);
                      handleClose();
                    }}
                  >
                    {user?.role === "admin"
                      ? "Add Trader to User"
                      : "Copy Trader"}
                  </Button>
                )}
                <Box
                  sx={{
                    backgroundColor: "grey",
                    p: "3px 4px 0px 4px",
                    cursor: "pointer",
                    color: "white",
                  }}
                  borderRadius={"50%"}
                  onClick={handleClose}
                >
                  <X size={28} />
                </Box>
              </Stack>
              {/* {loading && (
                        <Skeleton
                          variant="rectangle"
                          height={"100%"}
                          sx={{ borderRadius: "10px" }}
                        />
                      )} */}
              <Box height={{ xs: "320px", sm: "450px", md: "420px" }}>
                <img
                  src={selectedTrader?.photo}
                  alt=""
                  onLoad={() => setLoading(false)}
                  onError={() => setLoading(false)}
                  width={"100%"}
                  height={"100%"}
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </Box>
            </Box>

            <Divider />

            {/* <Stack mb={1}>
              <Typography variant="h6" sx={{color: "springgreen", fontWeight: 600}}>About this trader</Typography>
            </Stack> */}

            <Divider />
            <Stack spacing={1}>
              <Typography fontWeight={"bold"} mt={1}>
                Email: {selectedTrader?.email}
              </Typography>

              <Stack direction={"row"} spacing={1}>
                <Typography fontWeight={"bold"}>Win rate:</Typography>
                <Typography> {selectedTrader?.winRate}</Typography>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography fontWeight={"bold"}>Profit Share</Typography>
                <Typography>{selectedTrader?.profitShare}</Typography>
              </Stack>
              <Divider />
              <Stack direction={"row"} spacing={1}>
                <Typography fontWeight={"bold"}>
                  Bio: {selectedTrader?.comment}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AllTraders;
