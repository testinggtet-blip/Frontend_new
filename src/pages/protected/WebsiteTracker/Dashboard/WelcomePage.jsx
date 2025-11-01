import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NoRecordImage from 'assets/Images/Common/NoRecordImage.png';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const GetStartedButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: '8px',
  textTransform: 'none',
  background: '#056a5a',
  '&:hover': {
    background: '#045048',
  },
}));

const renderWelcomeView = (handleCreateSite) => (
  <Container maxWidth="md" sx={{ textAlign: 'center' }}>
    <Box
      component="img"
      src={NoRecordImage}
      alt="Website Analytics"
      sx={{
        width: 300,
        height: 'auto',
        mb: 4,
        mx: 'auto',
        display: 'block',
      }}
    />
    <Typography
      variant="h4"
      component="h1"
      sx={{
        fontWeight: 700,
        color: '#056a5a',
        mb: 2,
        fontSize: { xs: '1.75rem', sm: '2.125rem' },
      }}
    >
      Welcome to Website Tracker
    </Typography>
    <Typography
      variant="h6"
      component="h2"
      sx={{
        mb: 3,
        color: 'text.secondary',
        fontSize: { xs: '1.1rem', sm: '1.25rem' },
        lineHeight: 1.4,
      }}
    >
      Track and analyze your website's performance in real-time
    </Typography>
    <Typography
      variant="body1"
      sx={{
        mb: 4,
        fontSize: '1.1rem',
        maxWidth: '700px',
        mx: 'auto',
        lineHeight: 1.7,
      }}
    >
      Get detailed insights about your website's visitors, page views, traffic
      sources, and more. Our analytics dashboard helps you understand your
      audience and improve your online presence.
    </Typography>
    <GetStartedButton
      variant="contained"
      color="primary"
      size="large"
      onClick={handleCreateSite}
    >
      Get Started
    </GetStartedButton>
  </Container>
);

const renderTrackingCodeView = (
  jsTag,
  onCopyCode,
  selectedSite,
  completeSetup
) => (
  <Container maxWidth="md" sx={{ textAlign: 'center' }}>
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          mb: 2,
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            JavaScript Tracking Code
          </Typography>
          <IconButton
            onClick={onCopyCode}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
            Copy the JavaScript code below and paste it immediately before the
            closing &lt;/head&gt; tag of your website.
          </Typography>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Website URL"
              variant="outlined"
              size="small"
              value={selectedSite?.url}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 1 }}>
            <textarea
              value={jsTag}
              readOnly
              rows={10}
              style={{
                width: '100%',
                fontFamily: 'monospace',
                fontSize: '14px',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                resize: 'none',
                backgroundColor: '#f9fafb',
                outline: 'none',
              }}
            />
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={completeSetup}
        sx={{ mt: 2, textTransform: 'none', fontWeight: 'bold' }}
      >
        Complete Setup
      </Button>
    </Box>
  </Container>
);

const WelcomePage = (
  {
    // jsTag,
    handleCreateSite,
    // onCopyCode,
    // selectedSite,
    // completeSetup,
  }
) => {
  // const shouldShowWelcome = !(selectedSite?.id && jsTag);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
        p: 3,
      }}
    >
      {renderWelcomeView(handleCreateSite)}
    </Box>
  );
};

export default WelcomePage;
