import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { DownloadRounded, CopyAllRounded } from '@mui/icons-material';
import toast from 'react-hot-toast';

const SmallBorderBox = ({ children }) => (
  <Box
    sx={{
      pt: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    }}
  >
    {children}
  </Box>
);

const BigBorderBox = ({ children }) => (
  <Box
    sx={{
      p: 1,
      border: '1px solid black',
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#fff',
    }}
  >
    {children}
  </Box>
);

const copyApiKey = (apiKey) => {
  navigator.clipboard.writeText(apiKey);
  toast.success('API key copied successfully');
};

const copySecretKey = (secretKey) => {
  navigator.clipboard.writeText(secretKey);
  toast.success('Secret key copied successfully');
};

const ConnectionKey = ({ apiKey, secretKey }) => {
  const downloadKeys = () => {
    const fileContent = `API Key: ${apiKey}\nSecret Key: ${secretKey}`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'API Keys.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'column' }}
      spacing={2}
      sx={{ mb: 3 }}
    >
      <BigBorderBox>
        <Typography
          variant=""
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            component="span"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            API key: {apiKey || ''}
          </Box>
          <CopyAllRounded
            sx={{ cursor: 'pointer' }}
            onClick={() => copyApiKey(apiKey)}
          />
        </Typography>
      </BigBorderBox>
      <BigBorderBox>
        <Typography
          variant=""
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Box
            component="span"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Secret key: {secretKey || ''}
          </Box>
          <CopyAllRounded
            sx={{ cursor: 'pointer' }}
            onClick={() => copySecretKey(secretKey)}
          />
        </Typography>
      </BigBorderBox>
      <SmallBorderBox>
        <Typography variant="">
          The API Key & Secret Key will be displayed only once. If lost, you
          will need to recreate them. It's recommended to download and securely
          store them.
          <DownloadRounded
            variant="outlined"
            sx={{ cursor: 'pointer' }}
            onClick={downloadKeys}
          />
        </Typography>
      </SmallBorderBox>
    </Stack>
  );
};

export default ConnectionKey;
