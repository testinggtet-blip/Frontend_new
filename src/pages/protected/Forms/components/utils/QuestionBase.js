import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Collapse,
} from '@mui/material';
import { ImagePlus, Plus, Trash } from 'lucide-react';

const QuestionBase = ({ question, onChangeField }) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState(question.image || '');

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      onChangeField(question.id, 'image', objectUrl);
    }
  };

  const handleDeleteImage = () => {
    if (imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview('');
    onChangeField(question.id, 'image', '');
  };

  const handleDeleteDescription = () => {
    onChangeField(question.id, 'description', null);
  };

  return (
    <>
      {/* Image Upload Section with smooth collapse */}
      <Collapse in={showImageUpload} unmountOnExit>
        <Paper
          variant="outlined"
          component="label"
          htmlFor={`question-image-${question.id}`}
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
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
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
                  onClick={handleDeleteImage}
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
            id={`question-image-${question.id}`}
            onChange={handleFileChange}
          />
        </Paper>
      </Collapse>

      {/* Question Text */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Question*
      </Typography>
      <TextField
        fullWidth
        size="small"
        value={question.label}
        onChange={(e) => onChangeField(question.id, 'label', e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowImageUpload((prev) => !prev)}
                sx={{
                  borderRadius: 1,
                  backgroundColor: showImageUpload ? '#fafafa' : 'transparent',
                  transition: 'background-color 0.3s',
                  '&:hover': { backgroundColor: 'primary.gray' },
                }}
              >
                <ImagePlus size={18} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Description Section wrapped in single Collapse */}
      <Collapse in={question.showDescription} timeout={300} unmountOnExit>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Description*
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder="Your description here."
            value={question.description}
            onChange={(e) =>
              onChangeField(question.id, 'description', e.target.value)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      onChangeField(question.id, 'showDescription', false)
                    }
                  >
                    <Trash size={18} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>
      </Collapse>

      <Collapse in={!question.showDescription} timeout={300} unmountOnExit>
        <Button
          size="small"
          variant="contained"
          startIcon={<Plus size={14} />}
          sx={{
            mb: 2,
            alignSelf: 'flex-start',
            textTransform: 'none',
            borderRadius: 1,
            transition: 'background-color 0.3s',
          }}
          onClick={() => onChangeField(question.id, 'showDescription', true)}
        >
          Add Description
        </Button>
      </Collapse>

      {/* Placeholder */}
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Placeholder
      </Typography>
      {question.type === 'text' && (
        <TextField
          fullWidth
          size="small"
          value={question.placeholder}
          onChange={(e) =>
            onChangeField(question.id, 'placeholder', e.target.value)
          }
          sx={{ mb: 2 }}
        />
      )}
    </>
  );
};

export default QuestionBase;
