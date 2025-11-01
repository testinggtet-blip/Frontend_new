import { Box, Stack, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { FetchAllCampaign } from 'Api/Api';
import React from 'react';

const CampaignDetails = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    campaignName: '',
    status: '',
    subscriberId: '',
    subscriberStatus: '',
    mobile: '',
  });
  useEffect(() => {
    fetchCampaign();
  }, []);

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

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.campaignName
        ?.toLowerCase()
        .includes(searchTerms.campaignName.toLowerCase()) &&
      campaign.status?.toLowerCase().includes(searchTerms.status.toLowerCase())
  );

  return (
    <Box sx={{ border: '1px solid #B9B9B9', padding: 2, borderRadius: '10px' }}>
      <Box
        sx={{
          background: '#DDF8F4',
          borderRadius: '10px',
          display: 'flex',
          height: '55px',
          alignItems: 'center',
          padding: '0 16px',
          position: 'relative',
          color: '#747272',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            flex: 1.5,
            fontWeight: 'bold',
            textAlign: 'left',
            position: 'relative',
            color: '#747272',
          }}
        >
          Campaign Name
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              right: '28px',
              height: '70%',
              width: '2px',
              backgroundColor: '#333',
            }}
          />
        </Typography>

        <Typography
          sx={{
            flex: 1,
            fontWeight: 'bold',
            textAlign: 'left',
            position: 'relative',
            paddingLeft: '10px',
            marginLeft: '4px',
            color: '#747272',
          }}
        >
          Status
        </Typography>
      </Box>

      <Stack
        direction="row"
        justifyContent={'left'}
        spacing={4}
        sx={{ marginTop: '10px' }}
      >
        <TextField
          fullWidth
          name="campaignName"
          value={searchTerms.campaignName}
          onChange={handleSearchChange}
          placeholder="Search by Name"
          size="small"
          InputProps={{
            sx: { fontSize: '12px', height: '30px', marginLeft: '5px' },
          }}
        />
        <TextField
          fullWidth
          name="status"
          value={searchTerms.status}
          onChange={handleSearchChange}
          placeholder="Search by Status"
          size="small"
          InputProps={{ sx: { fontSize: '12px', height: '30px' } }}
        />
      </Stack>

      <Stack
        spacing={1}
        sx={{
          my: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign, index) => (
            <Box
              key={index}
              sx={{
                background: '#F1F2F7',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                padding: '0 12px',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  flex: 1,
                  color: '#00519B',
                  marginLeft: '-90px',
                  textAlign: 'center',
                }}
              >
                {campaign?.campaignName || 'N/A'}
              </Typography>

              <Box
                sx={{
                  flex: 1.2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background:
                      campaign?.status === 'Active'
                        ? 'radial-gradient(53.12% 53.12% at 50% 50%, #4FABFF 0%, rgba(255, 255, 255, 0.4) 100%)'
                        : 'radial-gradient(53.12% 53.12% at 50% 50%, #FF5A4F 0%, rgba(255, 255, 255, 0.4) 100%)',
                    marginRight: '10px',
                  }}
                />
                <Typography sx={{ color: '#747272', textAlign: 'center' }}>
                  {campaign?.status || 'Unknown'}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography textAlign="center" color={'#747272'}>
            No campaigns found.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default CampaignDetails;
