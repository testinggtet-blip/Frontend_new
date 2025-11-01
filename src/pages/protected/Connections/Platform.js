import React from 'react';
import {
  Grid,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  DownloadRounded,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const PlatformIntegrationGuide = ({
  selectedPlatform,
  connectionId,
  apiKey,
  secretKey,
  textFieldRef,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCopyClick = async () => {
    if (textFieldRef.current) {
      const codeToCopy = textFieldRef.current.value;
      navigator.clipboard
        .writeText(codeToCopy)
        .then(() => toast.success('Copied to clipboard!'))
        .catch((err) => toast.error('Failed to copy: ', err));
    }
  };

  const downloadKeys = () => {
    const fileContent = `importScripts("${process.env.REACT_APP_CDN_URL}/ServiceWorker.js")`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'LetsNotifySW.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadZip = () => {
    const link = document.createElement('a');
    link.href = '/WordPressIntegration.zip'; // file in public folder
    link.download = 'WordPressIntegration.zip';
    link.click();
  };

  if (!selectedPlatform) return null;

  // Shared platform-specific config
  const guides = {
    Web: {
      title: 'Web Integration Guide',
      buttonText: 'Download SW',
      steps: [
        "Download LetsNotifySW.js in your project's root directory",
        'Copy the code below and paste it into your index file',
      ],
      code: `<script type="text/javascript" src="${
        process.env.REACT_APP_CDN_URL
      }/index.js"></script>
<script>
  const sdk = new LetsNotifySDK();
  const pushSDK = sdk.pushSdk();
  pushSDK.init({
    connectionId: "${connectionId || 'your-connection-id'}",
    serviceWorkerPath: "LetsNotifySW.js",
    apiKey: "${apiKey || 'your-api-key'}",
    secretKey: "${secretKey || 'your-secret-key'}"
  });
</script>`,
    },
    Wordpress: {
      title: 'Wordpress Integration',
      buttonText: 'Download Plugin',
      steps: [
        '⬇️ Download the provided ZIP file to your computer.',
        '⚙️ In your WordPress dashboard, go to Plugins > Add New.',
        '📤 Click the Upload Plugin button at the top.',
        '🗂️ Select the downloaded ZIP file and click Install Now.',
        '🚀 Once installation is complete, click Activate Plugin.',
      ],
      code: '',
    },
  };

  const guide = guides[selectedPlatform];

  return (
    <Box
      width={isMobile ? '100%' : 540}
      maxWidth="100%"
      mx="auto"
      my={isMobile ? 2 : 4}
    >
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={7}>
              <Typography variant="h6" fontWeight={600}>
                {guide.title}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={5}
              display="flex"
              justifyContent={isMobile ? 'flex-start' : 'flex-end'}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadRounded />}
                onClick={
                  selectedPlatform === 'Web' ? downloadKeys : downloadZip
                }
                size="small"
                sx={{ minWidth: 150 }}
              >
                {guide.buttonText}
              </Button>
            </Grid>
          </Grid>

          <Box
            component="ul"
            sx={{
              my: 3,
              px: 1,
              listStyle: 'disc inside',
              color: theme.palette.text.secondary,
            }}
          >
            {guide.steps.map((step, idx) => (
              <Typography
                key={idx}
                component="li"
                variant="body2"
                sx={{ mb: 1 }}
              >
                {step}
              </Typography>
            ))}
          </Box>

          {selectedPlatform === 'Web' && (
            <Box position="relative" width="100%" mt={2}>
              <TextField
                multiline
                fullWidth
                rows={isMobile ? 8 : 16}
                variant="outlined"
                defaultValue={guide.code}
                inputRef={textFieldRef}
                InputProps={{
                  readOnly: true,
                  style: {
                    fontFamily: 'monospace',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    backgroundColor: theme.palette.background.paper,
                    paddingTop: '32px',
                    paddingRight: '48px',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    position: 'relative',
                  },
                }}
              />
              <IconButton
                size="small"
                aria-label="Copy code"
                onClick={handleCopyClick}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: theme.palette.primary.main,
                  bgcolor: theme.palette.action.hover,
                  '&:hover': {
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlatformIntegrationGuide;
