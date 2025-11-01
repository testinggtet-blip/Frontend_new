import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Collapse,
  Slider,
} from '@mui/material';
import { Check } from 'lucide-react';
import { InnerTextField } from 'components/InputFields';

export default function CardStylingCard({ style, setStyles }) {
  const [expanded, setExpanded] = useState(false);

  //   useEffect(() => {
  //     if (welcome.logo) {
  //       const objectUrl = URL.createObjectURL(welcome.logo);
  //       setImagePreview(objectUrl);
  //       return () => URL.revokeObjectURL(objectUrl); // Clean up memory
  //     } else {
  //       setImagePreview(null);
  //     }
  //   }, [welcome.logo]);

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setWelcome({ logo: file });
  //     }
  //     e.target.value = ''; // reset input so same file can be re-selected
  //   };

  //   const handleDeleteImage = () => {
  //     setWelcome({ logo: null });
  //   };

  const handleHeaderClick = () => {
    setExpanded((prev) => !prev);
  };

  //   const handleToggleActive = (e) => {
  //     const isActive = e.target.checked;
  //     setWelcome({ active: isActive });
  //     setExpanded(isActive);
  //   };

  //   const quillModules = {
  //     toolbar: [['bold', 'italic', 'underline'], ['link']],
  //   };

  //   const quillFormats = ['bold', 'italic', 'underline', 'link'];

  return (
    <Card
      sx={{
        mb: 1, // smaller margin bottom between cards
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      {/* Header */}
      <Box
        onClick={handleHeaderClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'box-shadow 0.15s, background 0.15s',
          backgroundColor: '#fff',
          '&:hover': {
            backgroundColor: '#F2F3F4',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              backgroundColor: '#b2d8d2',
              width: 36,
              height: 36,
              mr: 2,
            }}
          >
            <Check size={20} color="green" />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              p: 0.5,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 18,
                flexGrow: 1,
                color: '#000',
                fontWeight: 500,
                lineHeight: 1.1,
              }}
            >
              Card Styling
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 1,
              }}
            >
              Style the survey card.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Collapsible content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ py: 1.5, px: 2 }}>
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="subtitle2">Roundness</Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
                ml: 0.2,
              }}
            >
              Change the border radius of the card and the inputs.
            </Typography>

            {/* Next button label */}
            <Slider
              name="roundness"
              value={style?.roundness || 0}
              onChange={
                (e, newValue) =>
                  setStyles('cardStyling', { [e.target.name]: newValue }) // <-- update style
              }
              min={0}
              max={50}
              sx={{
                color: '#0d1b2a', // dark thumb color
                '& .MuiSlider-thumb': {
                  backgroundColor: '#0d1b2a',
                  width: 18,
                  height: 18,
                },
                '& .MuiSlider-rail': {
                  opacity: 1,
                  backgroundColor: '#cbd5e1',
                  height: 4,
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#0d1b2a',
                  height: 4,
                },
              }}
            />
          </Box>

          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="subtitle2">Card background color</Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
                ml: 0.2,
              }}
            >
              Change the background color of the card.
            </Typography>

            {/* Next button label */}
            <InnerTextField
              colorSelection
              name="cardBackgroundColor"
              value={style?.cardBackgroundColor}
              onChange={(e) =>
                setStyles('cardStyling', { [e.target.name]: e.target.value })
              }
            />
          </Box>

          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="subtitle2">Card border color</Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
                ml: 0.2,
              }}
            >
              Change the border color of the card.
            </Typography>

            {/* Next button label */}
            <InnerTextField
              colorSelection
              name="cardBorderColor"
              value={style?.cardBorderColor}
              onChange={(e) =>
                setStyles('cardStyling', { [e.target.name]: e.target.value })
              }
            />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
