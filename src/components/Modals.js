import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
  Zoom,
} from '@mui/material';
import { ResetPassword } from 'Api/Api';
import { RoundedButton } from 'components/Button/Buttons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { isEmailValid } from 'utils/commonFunctions';
import { CustomFormInput } from './Style';
import { useNavigate } from 'react-router-dom';

export const DeleteModal = ({
  open,
  close,
  deleteFunction,
  title = 'Delete Record',
  description = 'Are you sure you want to delete this record? This action cannot be undone.',
  TransitionComponent = Zoom,
}) => {
  const dialogStyle = {
    borderRadius: '16px',
    maxWidth: '450px',
    width: '90%',
    padding: '24px',
    boxShadow: `
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05)
    `,
    position: 'relative',
    overflow: 'hidden',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    paddingBottom: '12px',
  };

  const actionButtonStyles = {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '8px',
    padding: '10px 16px',
    minWidth: '120px',
  };

  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      close();
    }
  };

  return (
    <Dialog
      onClose={handleDialogClose}
      open={open}
      TransitionComponent={TransitionComponent}
      PaperProps={{
        sx: dialogStyle,
        elevation: 4,
      }}
      maxWidth="xs"
      fullWidth
    >
      <Box>
        <Box sx={headerStyle}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'error.main',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <DeleteOutlineIcon sx={{ color: 'error.main' }} />
            {title}
          </Typography>
          <IconButton
            onClick={close}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2, px: 1 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            pt: 2,
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Button
            variant="outlined"
            onClick={close}
            sx={{
              ...actionButtonStyles,
              color: 'text.secondary',
              borderColor: 'text.secondary',
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteFunction();
              close();
            }}
            sx={{
              ...actionButtonStyles,
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export const ForgotPwdModal = ({ open, handleClose, sendToConfirmPass }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClose();
    }
  };

  const handleForgetPassword = async (data) => {
    try {
      setLoading(true);
      const response = await ResetPassword(data?.email);
      setLoading(false);
      toast.success(
        'Email sent! You will receive the email to reset your password if your email address is valid and registered in our system. Please check your inbox (and spam folder, just in case!) shortly for instructions on how to reset your password using the link provided.'
      );
      sendToConfirmPass();
    } catch (error) {
      setLoading(false);
      toast.error('Server is not responding');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          boxShadow: 6,
          maxWidth: 450,
          width: '100%',
        },
      }}
    >
      <IconButton
        onClick={handleDialogClose}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'text.secondary',
          '&:hover': { backgroundColor: 'transparent' },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          padding: 4,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ fontWeight: '500', mb: 0.5 }}
        >
          Forgot Password?
        </Typography>

        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
          sx={{ color: '#0D0D0D', fontWeight: '400', mb: 2 }}
        >
          Enter the email associated with your account.
        </Typography>

        <form onSubmit={handleSubmit(handleForgetPassword)}>
          <Box sx={{ textAlign: 'left', mb: 2 }}>
            <Typography mb={1} sx={{ textAlign: 'left' }} variant="subtitle3">
              Email
            </Typography>

            <CustomFormInput
              placeholder="Enter your email"
              sx={{ mt: 1 }}
              {...register('email', {
                required: 'Email is required',
                validate: {
                  validEmail: (value) =>
                    isEmailValid(value) || 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <Typography
                sx={{
                  color: 'error.main',
                  mt: 1,
                  fontSize: '0.75rem',
                }}
              >
                {errors?.email?.message}
              </Typography>
            )}
          </Box>

          <RoundedButton
            title="Submit"
            disabled={loading}
            sx={{
              py: 1.5,
              mt: 0.5,
              width: '100%',
            }}
          />
        </form>

        <Typography
          variant="subtitle2"
          textAlign={'center'}
          mt={1.5}
          fontWeight={400}
        >
          Already have an account?{'  '}
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 400,
            }}
            onClick={() => navigate(0)}
          >
            Login
          </span>
        </Typography>

        {/* <Typography 
          variant="subtitle2" 
          textAlign={'center'} 
          mt={3}
        >
          Remember your password?{' '}
          <span
            style={{ 
              textDecoration: 'underline', 
              cursor: 'pointer',
              color: 'primary.main'
            }}
            onClick={handleClose}
          >
            Back to Login
          </span>
        </Typography> */}
      </Box>
    </Dialog>
  );
};
