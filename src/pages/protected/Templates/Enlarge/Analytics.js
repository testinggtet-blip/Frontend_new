import {
  Box,
  Stack,
  Typography,
  TextField
} from '@mui/material';
import ApexCharts from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { FetchAllCampaign, FetchAllSubscribers } from 'Api/Api';
import { Link } from "react-router-dom";

const chartOptions = {
  chart: {
    type: 'donut',
  },
  labels: ['Button 1', 'Button 2'],
  colors: ['#FFD700', '#FF6347'],
};

const chartSeries = [53, 19.2];

const Analytics = () => {
  const [subscribersData, setSubscribersData] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState({
    campaignName: '',
    status: '',
    clicks: '',
    subscriberId: '',
    subscriberStatus: '',
    mobile: ''
  });

  useEffect(() => {
    fetchSubscribers();
    fetchCampaign();
  }, []);

  async function fetchSubscribers() {
    try {
      const response = await FetchAllSubscribers();
      if (response?.data?.status === true) {
        setSubscribersData(response?.data?.data);
      }
    } catch {
      setSubscribersData([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCampaign() {
    try {
      const response = await FetchAllCampaign({
        page: 1,
        limit: 25,
      });
      if (response?.data?.status === true) {
        setCampaigns(response?.data?.data || []);
      }
    } catch {
      setCampaigns([]);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.campaignName?.toLowerCase().includes(searchTerms.campaignName.toLowerCase()) &&
    campaign.status?.toLowerCase().includes(searchTerms.status.toLowerCase()) &&
    String(campaign.clicks).includes(searchTerms.clicks)
  );

  const filteredSubscribers = subscribersData.filter(subscriber =>
    String(subscriber.id).includes(searchTerms.subscriberId) &&
    subscriber.status?.toLowerCase().includes(searchTerms.subscriberStatus.toLowerCase()) &&
    subscriber.mobile?.includes(searchTerms.mobile)
  );

  return (
    <Box sx={{ padding: '16px' }}>
      {/* <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
        Feeds
      </Typography>

      <ApexCharts options={chartOptions} series={chartSeries} type="donut" height={250} /> */}

      <Typography variant="h6" sx={{ fontWeight: 500, marginTop: '-14px', marginBottom: "7px" }}>
        Campaigns
      </Typography>
      <Box sx={{ border: "1px solid #B9B9B9", padding: 2, borderRadius: "10px" }}>
        <Box
          sx={{
            border: "1px solid #B9B9B9",
            padding: 1,
            borderRadius: "10px",
            width: "100%"
          }}
        >
          <Box
            sx={{
              background: "#DDF8F4",
              borderRadius: "10px",
              display: "flex",
              height: "55px",
              alignItems: "center",
              padding: "0 8px",
              position: "relative",
              color: "#747272",
              width: "100%",
              overflowX: "auto"
            }}
          >
            <Typography
              sx={{
                flex: 1.5,
                minWidth: { xs: 110, sm: 140 },
                fontWeight: "bold",
                textAlign: "left",
                position: "relative",
                color: "#747272",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: { xs: "13px", sm: "15px" }
              }}
            >
              Campaign Name
              <Box
                sx={{
                  position: "absolute",
                  top: "15%",
                  right: { xs: '0px', sm: '18px' },
                  height: "70%",
                  width: "2px",
                  backgroundColor: "#333",
                }}
              />
            </Typography>

            <Typography
              sx={{
                flex: 1,
                minWidth: { xs: 70, sm: 90 },
                fontWeight: "bold",
                textAlign: "left",
                position: "relative",
                paddingLeft: "10px",
                marginLeft: "4px",
                color: "#747272",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: { xs: "13px", sm: "15px" }
              }}
            >
              Status
              <Box
                sx={{
                  position: "absolute",
                  top: "15%",
                  right: "10px",
                  height: "70%",
                  width: "1.5px",
                  backgroundColor: "#333",
                }}
              />
            </Typography>

            <Typography
              sx={{
                flex: 0.7,
                minWidth: { xs: 60, sm: 70 },
                fontWeight: "bold",
                textAlign: "left",
                paddingLeft: "10px",
                color: "#747272",
                marginRight: "10px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: { xs: "13px", sm: "15px" }
              }}
            >
              Clicks
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" justifyContent={'left'} spacing={4} sx={{ marginTop: "5px" }}>
          <TextField
            fullWidth
            name="campaignName"
            value={searchTerms.campaignName}
            onChange={handleSearchChange}
            placeholder="Search by Name"
            size="small"
            InputProps={{ sx: { fontSize: "12px", height: "30px", marginLeft: "5px" } }}
          />
          <TextField
            fullWidth
            name="status"
            value={searchTerms.status}
            onChange={handleSearchChange}
            placeholder="Search by Status"
            size="small"
            InputProps={{ sx: { fontSize: "12px", height: "30px" } }}
          />
          <TextField
            fullWidth
            name="clicks"
            value={searchTerms.clicks}
            onChange={handleSearchChange}
            placeholder="Search by Clicks"
            size="small"
            InputProps={{ sx: { fontSize: "12px", height: "30px", marginLeft: "-15px" } }}
          />
        </Stack>

        <Stack spacing={1} sx={{ my: 1 }}>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign, index) => (
              <Box
                key={index}
                sx={{
                  background: "#F1F2F7",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  height: "50px",
                  padding: "0 12px",
                }}
              >
                <Typography
                  component={Link}
                  to="/web-campaigns"
                  sx={{
                    flex: 1,
                    color: "#00519B",
                    marginLeft: "10px",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {campaign?.campaignName || "N/A"}
                </Typography>

                <Box sx={{ flex: 0.8, display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background:
                        campaign?.status === "Active"
                          ? "radial-gradient(53.12% 53.12% at 50% 50%, #4FABFF 0%, rgba(255, 255, 255, 0.4) 100%)"
                          : "radial-gradient(53.12% 53.12% at 50% 50%, #FF5A4F 0%, rgba(255, 255, 255, 0.4) 100%)",
                      marginRight: "10px",
                      marginLeft: "-13px",
                    }}
                  />
                  <Typography sx={{ color: "#747272" }}>
                    {campaign?.status || "Unknown"}
                  </Typography>
                </Box>

                <Typography sx={{ flex: 0.5, color: "#00519B", textAlign: "left" }}>
                  {campaign?.clicks ?? "0"}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography textAlign="center" color={"#747272"}>
              No campaigns found.
            </Typography>
          )}
        </Stack>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 500, marginTop: '24px', marginBottom: "7px" }}>
        Subscribers
      </Typography>
      <Box sx={{ border: "1px solid #B9B9B9", padding: 2, borderRadius: "10px" }}>
        <Box
          sx={{
            background: "#DDF8F4",
            borderRadius: "10px",
            display: "flex",
            height: "50px",
            alignItems: "center",
            padding: "0 12px",
            position: "relative",
            color: "#747272",
            width: "100%",
            overflowX: "auto"
          }}
        >
          <Box sx={{ flex: 1.2, display: "flex", alignItems: "center", position: "relative", minWidth: { xs: 110, sm: 140 } }}>
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "left",
                color: "#747272",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: { xs: "13px", sm: "15px" }
              }}
            >
              Subscriber ID
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: "15%",
                right: { xs: '30px', sm: "40px", md: '60px' },
                height: "70%",
                width: "1.5px",
                backgroundColor: "#333",
              }}
            />
          </Box>

          <Box sx={{ flex: 0.6, display: "flex", alignItems: "left", position: "relative", }}>
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#747272",
                marginLeft: "-18px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: { xs: "13px", sm: "15px" }
              }}
            >
              Status
            </Typography>
            <Box
              sx={{
                position: "absolute",
                top: "15%",
                right: "0px",
                height: "70%",
                width: "1.5px",
                backgroundColor: "#333",
              }}
            />
          </Box>

          <Box sx={{ flex: 0.6, display: "flex", alignItems: "left", minWidth: { xs: 60, sm: 70 } }}>
            <Typography
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#747272",
                marginLeft: "20px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: { xs: "13px", sm: "15px" }
              }}
            >
              Mobile
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={4} sx={{ marginTop: "5px" }}>
          <TextField fullWidth name="subscriberId" value={searchTerms.subscriberId} onChange={handleSearchChange} placeholder="Search by ID" size="small" InputProps={{ sx: { fontSize: '12px', height: '30px', marginLeft: "7px" } }} />
          <TextField fullWidth name="subscriberStatus" value={searchTerms.subscriberStatus} onChange={handleSearchChange} placeholder="Search by Status" size="small" InputProps={{ sx: { fontSize: '12px', height: '30px', marginLeft: "7px" } }} />
          <TextField fullWidth name="mobile" value={searchTerms.mobile} onChange={handleSearchChange} placeholder="Search by Mobile" size="small" InputProps={{ sx: { fontSize: '12px', height: '30px' } }} />
        </Stack>

        <Stack spacing={1} sx={{ my: 1 }}>
          {loading ? (
            <Typography textAlign="center" color={"#747272"}>Loading...</Typography>
          ) : filteredSubscribers.length > 0 ? (
            filteredSubscribers.map((subscriber, index) => (
              <Box
                key={index}
                sx={{
                  background: "#F1F2F7",
                  borderRadius: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  minHeight: "50px",
                  padding: "0 12px"
                }}
              >
                <Typography
                  sx={{
                    flex: 3.5,
                    color: "#00519B",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "145px",
                    marginRight: "20px"
                  }}
                >
                  {subscriber.id}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", flex: 1.2 }}>
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: subscriber.status === "Subscribed"
                        ? "radial-gradient(53.12% 53.12% at 50% 50%, #FF5A4F 0%, rgba(255, 255, 255, 0.4) 100%)"
                        : "radial-gradient(53.12% 53.12% at 50% 50%, #4FABFF 0%, rgba(255, 255, 255, 0.4) 100%)",
                      marginRight: "8px"
                    }}
                  />
                  <Typography sx={{ color: "#747272", wordBreak: "break-word" }}>
                    {subscriber.status}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    flex: 0.6,
                    color: "#00519B",
                    wordBreak: "break-word"
                  }}
                >
                  {subscriber.mobile}
                </Typography>
              </Box>

            ))
          ) : (
            <Typography textAlign="center" color={"#747272"}>No subscribers found.</Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Analytics;
