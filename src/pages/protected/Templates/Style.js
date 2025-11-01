export const TemplateStyles = {
  fileUploadButton: {
    margin: '-5px',
    marginRight: '10px',
    border: 'none',
    background: '#058270',
    padding: '5px 10px',
    borderRadius: '10px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.2s ease-in-out',
  },
  InputBorder: {
    '& fieldset': {
      borderWidth: '1px',
      borderColor: '#BEBFC5',
    },
    '&:hover fieldset': {
      borderWidth: '1px',
      borderColor: '#BEBFC5',
    },
    '&.Mui-focused fieldset': {
      borderWidth: '1px',
      borderColor: '#BEBFC5',
    },
  },
  ImageUploadStyle: {
    position: 'relative',
    width: '100%',
    maxWidth: { xs: '250px', sm: '300px', md: '400px' },
    aspectRatio: '16/9',
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: 2,
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  ImagePreviewView: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    minWidth: 'auto',
    p: 1,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.9)',
    },
  },
};

export const imageFileInput = {
  '& input::file-selector-button': TemplateStyles.fileUploadButton,
  '& input::file-selector-button:hover': {
    backgroundColor: '#045e50',
  },
};
