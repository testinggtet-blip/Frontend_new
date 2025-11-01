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
  InputAdornment,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Handshake, Plus, Trash } from 'lucide-react';

export default function EndingCard({ ending, setEnding }) {
  const [expanded, setExpanded] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (ending?.endLogo) {
      const objectUrl = URL.createObjectURL(ending.endLogo);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up memory
    } else {
      setImagePreview(null);
    }
  }, [ending.endLogo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEnding({ ...ending, endLogo: file });
    }
    e.target.value = ''; // reset input so same file can be re-selected
  };

  const handleDeleteImage = () => {
    setEnding({ ...ending, endLogo: '' });
  };

  const handleHeaderClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleToggleActive = (e) => {
    const isActive = e.target.checked;
    setEnding({ ...ending, active: isActive });
    setExpanded(isActive);
  };

  const handleDeleteDescription = () => {
    setEnding({ ...ending, description: '' });
  };

  return (
    <Card
      sx={{
        mb: 1,
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
          <Handshake size={20} color="green" style={{ marginRight: 2 }} />
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
              {'Ending Card'}
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
              {ending?.active ? '' : 'Ending card'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {ending.active ? 'On' : 'Off'}
          </Typography>
          <Switch
            checked={ending.active}
            onClick={(e) => e.stopPropagation()}
            onChange={handleToggleActive}
          />
        </Box>
      </Box>

      {/* Collapsible content */}
      <Collapse in={expanded && ending.active}>
        <CardContent sx={{ py: 1.5, px: 2 }}>
          {/* Image uploader */}
          <Paper
            variant="outlined"
            sx={{
              position: 'relative',
              mb: 2,
              height: 200,
              borderStyle: 'dashed',
              cursor: 'pointer',
              backgroundColor: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
            }}
            component="label"
            htmlFor="endLogo-upload"
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
                  }}
                />
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
                      e.preventDefault();
                      handleDeleteImage();
                    }}
                    sx={{ fontSize: 12, color: 'white', borderColor: 'white' }}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', color: 'gray' }}>
                <CloudUploadIcon sx={{ fontSize: 48 }} />
                <Typography variant="body2">Click or drag to upload</Typography>
              </Box>
            )}

            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="endLogo-upload"
              onChange={handleFileChange}
            />
          </Paper>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Note*
          </Typography>
          <TextField
            size="small"
            fullWidth
            sx={{ mb: 2 }}
            value={ending.title || ''}
            onChange={(e) => setEnding({ ...ending, title: e.target.value })}
          />

          {/* 🔹 Description Section (like question) */}
          <Collapse
            in={ending.description !== undefined && ending.description !== null}
            unmountOnExit
          >
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Description*
              </Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="Your description here."
                value={ending.description || ''}
                onChange={(e) =>
                  setEnding({ ...ending, description: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleDeleteDescription}>
                        <Trash size={18} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
            </Box>
          </Collapse>

          <Collapse
            in={ending.description === undefined || ending.description === null}
            unmountOnExit
          >
            <Button
              size="small"
              variant="contained"
              startIcon={<Plus size={14} />}
              sx={{
                mb: 2,
                textTransform: 'none',
                borderRadius: 1,
              }}
              onClick={() => setEnding({ ...ending, description: '' })}
            >
              Add Description
            </Button>
          </Collapse>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Button Label
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={ending.finishButton || ''}
            onChange={(e) =>
              setEnding({ ...ending, finishButton: e.target.value })
            }
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}
