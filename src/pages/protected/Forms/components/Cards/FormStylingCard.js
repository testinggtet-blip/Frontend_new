import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Card, CardContent, Typography, Box, Collapse } from '@mui/material';
import { Check } from 'lucide-react';
import { InnerTextField } from 'components/InputFields';

export default function FormStylingCard({ style, setStyles }) {
  const [expanded, setExpanded] = useState(false);

  const handleHeaderClick = () => {
    setExpanded((prev) => !prev);
  };

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
              Form styling
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 1,
              }}
            >
              Style the question texts, descriptions and input fields.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Collapsible content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ py: 1.5, px: 2 }}>
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="subtitle2">Brand color</Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
                ml: 0.2,
              }}
            >
              Change the brand color of the form.
            </Typography>

            {/* Next button label */}
            <InnerTextField
              colorSelection
              name="brandColor"
              value={style?.brandColor}
              onChange={(e) =>
                setStyles('formStyling', { [e.target.name]: e.target.value })
              }
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Question color</Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
                ml: 0.2,
              }}
            >
              Change the question color of the form.
            </Typography>

            {/* Next button label */}
            <InnerTextField
              colorSelection
              name="questionColor"
              value={style?.questionColor}
              onChange={(e) =>
                setStyles('formStyling', { [e.target.name]: e.target.value })
              }
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Input color</Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
                ml: 0.2,
              }}
            >
              Change the background color of the input fields.
            </Typography>

            {/* Next button label */}
            <InnerTextField
              colorSelection
              name="inputColor"
              value={style?.inputColor}
              onChange={(e) =>
                setStyles('formStyling', { [e.target.name]: e.target.value })
              }
            />
          </Box>

          <Box>
            <Typography variant="subtitle2">Input border color</Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
                ml: 0.2,
              }}
            >
              Change the border color of the input fields.
            </Typography>

            {/* Next button label */}
            <InnerTextField
              colorSelection
              name="inputBorderColor"
              value={style?.inputBorderColor}
              onChange={(e) =>
                setStyles('formStyling', {
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
