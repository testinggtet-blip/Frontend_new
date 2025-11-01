import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Collapse,
  Button,
  Slider,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { ImagePlus, Check } from 'lucide-react';
import { InnerTextField } from 'components/InputFields';

export default function BackgroundStylingCard({ style, setStyles }) {
  const [expanded, setExpanded] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
            justifyContent: 'space-between',
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
              Background Styling
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: '#000',
                lineHeight: 1.1,
                mt: 1,
              }}
            >
              Change the background to a color, image or animation.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Collapsible content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ py: 1.5, px: 2 }}>
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="subtitle2">Color</Typography>
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
              name="backgroundColor"
              value={style?.backgroundColor}
              onChange={(e) =>
                setStyles('backgroungStyling', {
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Box>

          <Box sx={{ mt: 1, mb: 2 }}>
            <Collapse in={showImageUpload} unmountOnExit>
              <Paper
                variant="outlined"
                component="label"
                htmlFor="background-image-upload"
                sx={{
                  position: 'relative',
                  mb: 2,
                  height: 200,
                  borderStyle: 'dashed',
                  cursor: 'pointer',
                  bgcolor: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: 2,
                  transition: 'border-color 0.3s',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                {style?.backgroundImage ? (
                  <>
                    <img
                      src={style.backgroundImage}
                      alt="Preview"
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        display: 'flex',
                        gap: 1,
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: 1,
                        p: 0.5,
                      }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        component="span"
                        sx={{ fontSize: 12 }}
                      >
                        Change
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          setStyles('backgroungStyling', {
                            backgroundImage: null,
                          })
                        }
                        sx={{
                          fontSize: 12,
                          color: 'white',
                          borderColor: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderColor: 'white',
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      color: 'gray',
                    }}
                  >
                    <ImagePlus size={48} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Click or drag to upload files
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 0.5 }}>
                      PNG, JPG, GIF up to 5MB
                    </Typography>
                  </Box>
                )}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="background-image-upload"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const fileURL = URL.createObjectURL(file);
                      setStyles('backgroungStyling', {
                        backgroundImage: fileURL,
                      });
                    }
                  }}
                />
              </Paper>
            </Collapse>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Upload*
            </Typography>
            <TextField
              fullWidth
              value={'Upload your image'}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowImageUpload((prev) => !prev)}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: showImageUpload
                          ? '#fafafa'
                          : 'transparent',
                        transition: 'background-color 0.3s',
                        '&:hover': { backgroundColor: 'primary.gray' },
                      }}
                    >
                      <ImagePlus size={22} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mt: 1, mb: 2 }}>
            <Typography variant="subtitle2">Brightness</Typography>
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
              name="brightness"
              value={style?.brightness || 0}
              onChange={
                (e, newValue) =>
                  setStyles('backgroungStyling', { [e.target.name]: newValue }) // <-- update style
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
        </CardContent>
      </Collapse>
    </Card>
  );
}
