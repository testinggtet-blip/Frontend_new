import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import {
  Card,
  CardContent,
  Switch,
  Typography,
  Box,
  Paper,
  Collapse,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReactQuill from 'react-quill';
import { Hand } from 'lucide-react';

export default function WelcomeCard({ welcome, setWelcome }) {
  const [expanded, setExpanded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (welcome.welcomeLogo) {
      const objectUrl = URL.createObjectURL(welcome.welcomeLogo);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up memory
    } else {
      setImagePreview(null);
    }
  }, [welcome.welcomeLogo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWelcome({ welcomeLogo: file });
    }
    e.target.value = ''; // reset input so same file can be re-selected
  };

  const handleDeleteImage = () => {
    setWelcome({ welcomeLogo: '' });
  };

  const handleHeaderClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleToggleActive = (e) => {
    const isActive = e.target.checked;
    setWelcome({ active: isActive });
    setExpanded(isActive);
  };

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
          <Hand size={20} color="green" style={{ marginRight: 2 }} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              mx: 1,
              height: 40, // taller divider height for more vertical look
              alignSelf: 'stretch', // ensure it stretches vertically within flex container
            }}
          />
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
              Welcome Card
            </Typography>

            <Typography
              variant="body2"
              sx={{
                px: 1,
                color: '#000',
                lineHeight: 1.1,
                mt: 0.2,
              }}
            >
              {welcome?.active ? 'Shown' : 'Hidden'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 0.5,
          }}
        >
          <Typography variant="body2" sx={{ mr: 0, lineHeight: 1 }}>
            {welcome.active ? 'On' : 'Off'}
          </Typography>

          {/* Toggle */}
          <Switch
            checked={welcome.active}
            onClick={(e) => e.stopPropagation()}
            onChange={handleToggleActive}
          />
        </Box>
      </Box>

      {/* Collapsible content */}
      <Collapse in={expanded && welcome.active}>
        <CardContent sx={{ py: 1.5, px: 2 }}>
          {/* Image uploader and preview */}
          <Paper
            variant="outlined"
            sx={{
              position: 'relative',
              p: 0,
              mb: 2,
              height: 200,
              borderStyle: 'dashed',
              cursor: 'pointer',
              backgroundColor: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRadius: 2,
            }}
            component="label"
            htmlFor="welcomeLogo-upload"
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Logo Preview"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                />
                {/* Overlay buttons */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                    backgroundColor: 'rgba(0,0,0,0.4)',
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
                    onClick={(e) => {
                      e.preventDefault(); // Prevent opening file selector on delete
                      handleDeleteImage();
                    }}
                    sx={{ fontSize: 12, color: 'white', borderColor: 'white' }}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'gray',
                    p: 3,
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 48 }} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Click or drag to upload files
                  </Typography>
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
                    PNG, JPG, GIF up to 5MB
                  </Typography>
                </Box>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="welcomeLogo-upload"
              onChange={handleFileChange}
            />
          </Paper>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Note*
          </Typography>

          {/* Next button label */}
          <TextField
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={welcome.title}
            onChange={(e) => setWelcome({ title: e.target.value })}
          />

          {/* Welcome message with Rich Text */}
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Welcome Message:
          </Typography>

          {/* <ReactQuill
            theme="snow"
            value={welcome.message}
            onChange={(html) => setWelcome({ message: html })}
            modules={quillModules}
            formats={quillFormats}
            style={{ backgroundColor: 'white', marginBottom: 16 }}
          /> */}
          {/* <div dangerouslySetInnerHTML={{ __html: welcome.message }} /> */}

          {/* Welcome message */}
          <TextField
            size="small"
            fullWidth
            multiline
            minRows={2}
            value={welcome.description}
            onChange={(e) => setWelcome({ description: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            "Next" button label
          </Typography>

          {/* Next button label */}
          <TextField
            fullWidth
            size="small"
            value={welcome.startButton}
            onChange={(e) => setWelcome({ startButton: e.target.value })}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
