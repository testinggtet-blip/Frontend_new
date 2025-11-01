import { useState } from 'react';
import {
  Typography,
  Stack,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { CustomFormInput, timeZoneStyle } from 'components/Style';
import { RoundedButton } from 'components/Button/Buttons';
import { RegisterUser } from 'Api/Api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MobileNumberValidation, isEmailValid } from 'utils/commonFunctions';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTooltip from 'components/Tooltip/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import Turnstile from 'react-turnstile';
import TimezoneSelect from 'react-timezone-select';

export const SignUpContainer = ({ showLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      termsAccepted: false,
      timeZone: '',
    },
  });

  const [userDetails, setUserDetails] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function onChangeTurnstile(token) {
    setUserDetails((x) => ({ ...x, ['turnstile']: token }));
  }

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value))
      return 'Password must contain an uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain a number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return 'Password must contain a special character';
    return true;
  };

  const validateConfirmPassword = (value) => {
    const password = watch('password');
    return value === password || 'Passwords do not match';
  };

  const handleSignup = async (data) => {
    if (!userDetails.turnstile) {
      toast.error("Please verify that you're not a robot");
      return;
    }

    if (!data.termsAccepted) {
      toast.error('Please accept the Terms and Conditions');
      return;
    }

    setLoading(true);
    try {
      const response = await toast.promise(
        RegisterUser({
          ...data,
          turnstileToken: userDetails.turnstile,
          timeZone: data.timeZone,
        }),
        {
          loading: 'Creating your account...',
          success: (response) => response?.data?.message,
          error: (error) => error?.response?.data?.message,
        }
      );

      if (response?.data?.status === true) {
        toast.success('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate(0); // Reload to switch to login
        }, 1500);
      }
    } catch (error) {
      // Error handling is done by toast.promise
      setUserDetails((x) => ({ ...x, turnstile: '' })); // Reset Turnstile token on error
    } finally {
      setLoading(false);
    }
  };

  const openTermsInNewTab = () => {
    window.open(
      process.env.REACT_APP_TERMS_AND_CONDITIONS,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Box
      sx={{
        padding: 4,
        boxShadow: 6,
        borderRadius: 3,
        width: '100%',
        maxWidth: 450,
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        height: '90vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          zIndex: 10,
          pb: 1,
          pt: 2.5,
        }}
      >
        <Typography variant="h4" textAlign="center" sx={{ mb: 0.5 }}>
          Sign Up
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
          sx={{ color: '#0D0D0D', fontWeight: '400', mb: 2 }}
        >
          Start engaging your customers on board
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="left"
          color="#F00"
          sx={{ ml: 4.5 }}
        >
          *All the fields are mandatory
        </Typography>
      </Box>

      <Box
        sx={{
          height: 'calc(100% - 60px)',
          overflowY: 'auto',
          mt: '150px',
          mb: '50px',
          pr: 1,
          pb: '80px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <form onSubmit={handleSubmit(handleSignup)}>
          <Stack
            direction={'column'}
            spacing={3}
            sx={{
              px: 1,
              pb: '80px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box>
              <Typography mb={1} variant="subtitle3">
                Company / Website Name
              </Typography>
              <CustomFormInput
                placeholder="Enter company name"
                sx={{ mt: 0.5 }}
                {...register('companyName', {
                  required: 'Company name is required',
                  minLength: {
                    value: 2,
                    message: 'Company name must be at least 2 characters',
                  },
                })}
              />
              {errors.companyName && (
                <Typography
                  sx={{ color: 'error.main', mt: 1, fontSize: '0.75rem' }}
                >
                  {errors?.companyName?.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography mb={1} variant="subtitle3">
                Full Name
              </Typography>
              <CustomFormInput
                placeholder="Enter your full name"
                sx={{ mt: 0.5 }}
                {...register('userName', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
              />
              {errors.userName && (
                <Typography
                  sx={{ color: 'error.main', mt: 1, fontSize: '0.75rem' }}
                >
                  {errors?.userName?.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography mb={1} variant="subtitle3">
                Role
              </Typography>
              <CustomFormInput
                placeholder="Your role in the company"
                sx={{ mt: 0.5 }}
                {...register('role', {
                  required: 'Role is required',
                })}
              />
              {errors.role && (
                <Typography
                  sx={{ color: 'error.main', mt: 1, fontSize: '0.75rem' }}
                >
                  {errors?.role?.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography mb={1} variant="subtitle3">
                Email Address
              </Typography>
              <CustomFormInput
                placeholder="Enter your email"
                sx={{ mt: 0.5 }}
                {...register('email', {
                  required: 'Email is required',
                  validate: {
                    validEmail: (value) =>
                      isEmailValid(value) ||
                      'Please enter a valid email address',
                  },
                })}
              />
              {errors.email && (
                <Typography
                  sx={{ color: 'error.main', mt: 1, fontSize: '0.75rem' }}
                >
                  {errors?.email?.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography mb={1} variant="subtitle3">
                Mobile Number
              </Typography>
              <CustomFormInput
                placeholder="+91 1234567890"
                sx={{ mt: 0.5 }}
                {...register('mobileNumber', {
                  required: 'Mobile number is required',
                  validate: {
                    validMobile: (value) =>
                      MobileNumberValidation(value) ||
                      'Mobile number is not valid',
                  },
                })}
              />
              {errors.mobileNumber && (
                <Typography
                  sx={{ color: 'error.main', mt: 1, fontSize: '0.75rem' }}
                >
                  {errors?.mobileNumber?.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography mb={1} variant="subtitle3">
                Timezone
                <CustomTooltip
                  title={
                    <Typography variant="body2" fontWeight="bold" mb={1}>
                      This timezone will be consider while triggering the
                      campaign
                    </Typography>
                  }
                  arrow
                  placement="right-end"
                >
                  <IconButton
                    size="small"
                    sx={{ marginLeft: 0.5, backgroundColor: 'transparent' }}
                  >
                    <InfoIcon
                      fontSize="inherit"
                      sx={{ backgroundColor: 'transparent' }}
                    />
                  </IconButton>
                </CustomTooltip>
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <TimezoneSelect
                  displayValue="UTC"
                  value={watch('timeZone') || ''}
                  onChange={(selectedTimezone) =>
                    setValue('timeZone', selectedTimezone.value)
                  }
                  styles={timeZoneStyle}
                />
              </Box>
            </Box>

            <Box>
              <Typography mb={1} variant="subtitle3">
                Password
                <CustomTooltip
                  title={
                    <Box sx={{ padding: 1, backgroundColor: 'transparent' }}>
                      <Typography variant="body2" fontWeight="bold" mb={1}>
                        Your password must contain at least:
                      </Typography>
                      <ul
                        style={{
                          paddingLeft: '1.5em',
                          listStyleType: 'disc',
                          color: 'white',
                        }}
                      >
                        <li style={{ fontWeight: 'normal' }}>
                          One lowercase letter.
                        </li>
                        <li style={{ fontWeight: 'normal' }}>
                          One Uppercase letter.
                        </li>
                        <li style={{ fontWeight: 'normal' }}>One number.</li>
                        <li style={{ fontWeight: 'normal' }}>
                          One special character.
                        </li>
                      </ul>
                    </Box>
                  }
                  arrow
                  placement="right-end"
                >
                  <IconButton
                    size="small"
                    sx={{ marginLeft: 0.5, backgroundColor: 'transparent' }}
                  >
                    <InfoIcon
                      fontSize="inherit"
                      sx={{ backgroundColor: 'transparent' }}
                    />
                  </IconButton>
                </CustomTooltip>
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <CustomFormInput
                  placeholder="Create your password"
                  sx={{ mt: 0.5 }}
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    validate: validatePassword,
                  })}
                />
                <IconButton
                  disableRipple
                  onClick={() => setShowPassword((prev) => !prev)}
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'text.secondary',
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
              {errors.password && (
                <Typography
                  sx={{ color: 'error.main', mt: 1, fontSize: '0.75rem' }}
                >
                  {errors?.password?.message}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography mb={1} variant="subtitle3">
                Confirm Password
              </Typography>
              <Box sx={{ position: 'relative' }}>
                <CustomFormInput
                  placeholder="Confirm your password"
                  sx={{ mt: 0.5 }}
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    validate: validateConfirmPassword,
                  })}
                />
                <IconButton
                  disableRipple
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'text.secondary',
                  }}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </Box>
              {errors.confirmPassword && (
                <Typography
                  sx={{ color: 'error.main', mt: 1, fontSize: '0.75rem' }}
                >
                  {errors?.confirmPassword?.message}
                </Typography>
              )}
            </Box>

            {/* <Box
              my={2}
              px={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                border: 'none',
                boxShadow: 'none',
                '& iframe': {
                  background: 'transparent !important',
                  mixBlendMode: 'multiply',
                  border: 'none !important',
                  boxShadow: 'none !important',
                },
                '& .g-recaptcha': {
                  background: 'transparent !important',
                  border: 'none !important',
                  boxShadow: 'none !important',
                }
              }}
            >
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                onChange={onChangeReCaptcha}
                size="normal"
              />
            </Box> */}

            <Box
              px={3}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                border: 'none',
                boxShadow: 'none',
                backgroundColor: 'transparent !important',
              }}
            >
              <Turnstile
                sitekey={process.env.REACT_APP_TURNSTILE_SITE_KEY}
                onSuccess={onChangeTurnstile}
                options={{
                  theme: 'light',
                }}
              />
            </Box>

            <Box textAlign={'center'} sx={{ mt: 0 }}>
              <FormControlLabel
                control={<Checkbox {...register('termsAccepted')} />}
                label={
                  <Typography
                    variant="subtitle2"
                    textAlign={'center'}
                    fontWeight={400}
                  >
                    I Accept the{' '}
                    <span
                      onClick={openTermsInNewTab}
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        fontWeight: 400,
                      }}
                    >
                      Terms & Conditions
                    </span>
                  </Typography>
                }
              />
            </Box>

            <RoundedButton
              title="Create Account"
              disabled={loading}
              sx={{
                py: 1.5,
                mt: 2,
                position: 'sticky',
                bottom: 10,
                zIndex: 10,
                width: '100%',
                boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
              }}
            />
          </Stack>
        </form>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          zIndex: 5,
          pt: 0.5,
          pb: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="subtitle2"
          textAlign={'center'}
          mt={1.5}
          fontWeight={400}
        >
          Already have an Account?{' '}
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 400,
            }}
            onClick={showLogin}
          >
            Log in
          </span>
        </Typography>
      </Box>
    </Box>
  );
};
