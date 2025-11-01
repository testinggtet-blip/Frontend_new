import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import logoSrc from "assets/Images/Common/letsnotify.png";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MacDesktop from "../../../../../assets/Images/Template/MacDesktop.png";
import WindowsDesktop from "../../../../../assets/Images/Template/WindowsDesktop.png";
import MacPhone from "../../../../../assets/Images/Template/MacPhone.png";
import WindowsPhone from "../../../../../assets/Images/Template/WindowsPhone.png";
import MacTablet from "../../../../../assets/Images/Template/MacTablet.png";
import { getPositionStyles } from "constants/appConstant";
import { Box, Card, Tab, Typography } from "@mui/material";

const Preview = ({ handleTabChange, tabValue, campaignDetails, image }) => {
  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <Box sx={{ height: "calc(100% - 60px)" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="Device Tabs"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Tab
                  label="Desktop"
                  sx={{ fontWeight: "600", fontSize: "16px", width: "50%" }}
                  value="1"
                />
                <Tab
                  label="Mobile"
                  sx={{ fontWeight: "600", fontSize: "16px", width: "50%" }}
                  value="2"
                />
              </TabList>
            </Box>

            <TabPanel sx={{ height: "62vh" }} value="1">
              <Box
                sx={{
                  mx: "auto",
                  width: "90%",
                  borderRadius: 4,
                  height: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  border: "1.8px solid rgba(0,0,0,.12)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "40px",
                    borderBottom: "1.8px solid rgba(0,0,0,.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pl: 2,
                  }}
                >
                  {["#EC6A5E", "#F5BF4F", "#61C554"].map((color, index) => (
                    <Box
                      key={index}
                      sx={{
                        height: 15,
                        width: 15,
                        borderRadius: "50%",
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "calc(100% - 40px)",
                    backgroundColor: "#f6f6f6",
                    display: "flex",
                    p: 2,
                    justifyContent: "center",
                    ...getPositionStyles(campaignDetails?.desktopPosition),
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      margin: "20px",
                      Height: 590,
                    }}
                  >
                    <Card
                      sx={{
                        p: 1.5,
                        marginLeft: "15px",
                        boxShadow: 2,
                        borderRadius: "10px",
                        position: "relative",
                        width: 260,
                        maxHeight: 560,
                      }}
                    >
                      {campaignDetails?.description && (
                        <Typography
                          variant="body2"
                          sx={{ fontSize: 12, ml: "10px", fontWeight: "bold" }}
                        >
                          {campaignDetails.description}
                        </Typography>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 0.3,
                          height: "30px",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: 10, color: "gray", ml: "10px" }}
                        ></Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.3,
                            ml: "-15px",
                          }}
                        >
                          <Typography
                            sx={{ fontSize: 10, color: "gray", ml: "-15px" }}
                          >
                            Powered by
                          </Typography>
                          <Box
                            component="img"
                            src={logoSrc}
                            sx={{ height: 12 }}
                          />
                        </Box>
                      </Box>
                    </Card>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: { xs: "-14px", sm: "-15px" },
                        transform: "translateY(-50%)",
                        width: "45px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "3px solid white",
                        boxShadow: 2,
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={image?.logo || logoSrc}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel sx={{ height: "62vh" }} value="2">
              <Box
                sx={{
                  position: "relative",
                  mx: "auto",
                  width: "55%",
                  borderRadius: 4,
                  height: "100%",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  border: "1.8px solid rgba(0,0,0,.12)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "40px",
                    borderBottom: "1.8px solid rgba(0,0,0,.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pl: 2,
                  }}
                >
                  {["#EC6A5E", "#F5BF4F", "#61C554"].map((color, index) => (
                    <Box
                      key={index}
                      sx={{
                        height: 15,
                        width: 15,
                        borderRadius: "50%",
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "calc(100% - 40px)",
                    backgroundColor: "#f6f6f6",
                    display: "flex",
                    justifyContent: "center",
                    ...getPositionStyles(campaignDetails?.mobilePosition),
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      margin: { xs: "10px", sm: "20px" },
                      width: "100%",
                    }}
                  >
                    <Card
                      sx={{
                        p: { xs: 1, sm: 1.5 },
                        pl: { xs: 4.5, sm: 5 },
                        boxShadow: 2,
                        borderRadius: "10px",
                        position: "relative",
                        width: "100%",
                        maxWidth: 280,
                        mx: "auto",
                        boxSizing: "border-box",
                      }}
                    >
                      {campaignDetails?.description && (
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: 11, sm: 12 },
                            fontWeight: "bold",
                          }}
                        >
                          {campaignDetails.description}
                        </Typography>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 0.5,
                          flexWrap: "nowrap",
                        }}
                      >
                        <Typography
                          noWrap
                          sx={{ fontSize: { xs: 9, sm: 10 }, color: "gray" }}
                        >
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                          }}
                        >
                          <Typography
                            noWrap
                            sx={{ fontSize: { xs: 9, sm: 10 }, color: "gray", mr: "3px" }}
                          >
                            Powered by
                          </Typography>
                          <Box
                            component="img"
                            src={logoSrc}
                            sx={{
                              height: { xs: 10, sm: 12 },
                              flexShrink: 0,
                              ml: -1,
                            }}
                          />
                        </Box>
                      </Box>
                    </Card>

                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: { xs: "-14px", sm: "-15px" },
                        transform: "translateY(-50%)",
                        width: "45px",
                        height: "45px",
                        borderRadius: "8px",
                        border: "3px solid white",
                        boxShadow: 2,
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={image?.logo || logoSrc}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};


const AppleDesktopComponent = () => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <img src={MacDesktop} alt="Apple Desktop" style={{ maxWidth: "100%" }} />
  </Box>
);

const AppleMobileComponent = () => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <img src={MacPhone} alt="Apple Mobile" style={{ maxWidth: "100%" }} />
  </Box>
);

const AppleTabletComponent = () => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <img src={MacTablet} alt="Apple Tablet" style={{ maxWidth: "100%" }} />
  </Box>
);

const WindowsDesktopComponent = () => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <img
      src={WindowsDesktop}
      alt="Windows Desktop"
      style={{ maxWidth: "100%" }}
    />
  </Box>
);

const WindowsMobileComponent = () => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <img
      src={WindowsPhone}
      alt="Windows Mobile"
      style={{ maxWidth: "100%" }}
    />
  </Box>
);

const WindowsTabletComponent = () => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <img src={MacTablet} alt="Windows Tablet" style={{ maxWidth: "100%" }} />
  </Box>
);



export default Preview;
