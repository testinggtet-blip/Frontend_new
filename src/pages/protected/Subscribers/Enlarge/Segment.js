import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FetchAllSegment } from 'Api/Api';
import React from 'react';

const SegmentsDetails = () => {
  const [segments, setSegments] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    segmentName: '',
    status: '',
  });

  useEffect(() => {
    fetchSegments();
  }, []);

  async function fetchSegments() {
    try {
      const response = await FetchAllSegment({
        page: 1,
        limit: 25,
      });
      if (response?.data?.status === true) {
        setSegments(response?.data?.data || []);
      }
    } catch {
      setSegments([]);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const filteredSegments = segments.filter(
    (segment) =>
      segment.segmentName
        ?.toLowerCase()
        .includes(searchTerms.segmentName.toLowerCase()) &&
      segment.status?.toLowerCase().includes(searchTerms.status.toLowerCase())
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
          Segment Name
          <Box
            sx={{
              position: 'absolute',
              top: '15%',
              right: '28px',
              height: '70%',
              width: '2.5px',
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
          name="segmentName"
          value={searchTerms.segmentName}
          onChange={handleSearchChange}
          placeholder="Search by Segment Name"
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
        {filteredSegments.length > 0 ? (
          filteredSegments.map((segment, index) => (
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
                  marginLeft: '-50px',
                  textAlign: 'center',
                }}
              >
                {segment?.segmentName || 'N/A'}
              </Typography>

              <Box
                sx={{
                  flex: 1.4,
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
                      segment?.status === 'Active'
                        ? 'radial-gradient(53.12% 53.12% at 50% 50%, #4FABFF 0%, rgba(255, 255, 255, 0.4) 100%)'
                        : 'radial-gradient(53.12% 53.12% at 50% 50%, #FF5A4F 0%, rgba(255, 255, 255, 0.4) 100%)',
                    marginRight: '10px',
                  }}
                />
                <Typography sx={{ color: '#747272', textAlign: 'center' }}>
                  {segment?.status || 'Unknown'}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography textAlign="center" color={'#747272'}>
            No segments found.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default SegmentsDetails;
