import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material';
import { tableScrollbar } from 'components/Style';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import theme from 'styles/app.theme';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const SideDrawer = ({
  onClose,
  open,
  children,
  isDetail,
  edit,
  setEdit,
  title,
  handleSubmit,
  EyeIcon,
  isPreview,
  setIsPreview,
  firstStep,
  segment,
  md = 550,
}) => {
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', md: md },
            backgroundColor: segment ? '#F7F7F7' : null,
          },
        }}
        BackdropProps={{
          onClick: (event) => {
            event.stopPropagation();
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="8%"
          px={2}
        >
          <Typography variant="h6">{title}</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            {isDetail && (
              <FiEdit
                cursor="pointer"
                onClick={() => setEdit(!edit)}
                size={20}
                color="#058270"
              />
            )}

            {EyeIcon &&
              (isPreview ? (
                <IconButton
                  sx={{
                    border: '1.5px solid #058270',
                    borderRadius: '6px',
                    padding: '4px 8px',
                  }}
                  onClick={() => setIsPreview(!isPreview)}
                >
                  <VisibilityOffIcon sx={{ color: '#058270' }} />
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    border: '1.5px solid #058270',
                    borderRadius: '6px',
                    padding: '4px 8px',
                  }}
                  onClick={() => setIsPreview(!isPreview)}
                >
                  <VisibilityOutlinedIcon sx={{ color: '#058270' }} />
                </IconButton>
              ))}

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        {!isPreview && <Divider />}
        <Box
          p={2}
          width="100%"
          height="84%"
          sx={{ ...tableScrollbar, overflowY: 'auto' }}
        >
          {children}
        </Box>

        {!isPreview && (
          <>
            <Divider />
            <Box>
              {!isDetail || (isDetail && edit) ? (
                <Box sx={theme.modules.submitButtonsBox}>
                  <Button
                    sx={{
                      padding: '8px 24px',
                      minWidth: '120px',
                      textTransform: 'none',
                    }}
                    variant="outlined"
                    size="medium"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      padding: '8px 24px',
                      minWidth: '120px',
                      textTransform: 'none',
                    }}
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit}
                  >
                    {firstStep ? 'Next' : 'Save'}
                  </Button>
                </Box>
              ) : null}
            </Box>
          </>
        )}
      </Drawer>
    </React.Fragment>
  );
};
