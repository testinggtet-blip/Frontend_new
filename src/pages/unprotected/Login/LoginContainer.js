import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUserDetails, LoginUser } from 'Api/Api';
import { CustomFormInput } from 'components/Style';
import { RoundedButton } from 'components/Button/Buttons';
import { setAuthDetails } from '../../../redux/reducers/authReducer';
import { isEmailValid } from 'utils/commonFunctions';
import { useForm } from 'react-hook-form';
import { protectedRoutes } from 'constants/appRoutes';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Turnstile from 'react-turnstile';

export const LoginContainer = ({ showSignUp, openForgetPass }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      rememberMe: false,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  let flag = false;

  // function onChangeReCaptcha(e) {
  //   setLoginDetails((x) => ({ ...x, ['reCaptcha']: e }));
  // }

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

  const handleLogin = async (data) => {
    if (!loginDetails.turnstile) {
      toast.error("Please verify that you're not a robot");
      return;
    }

    setLoading(true);
    try {
      const response = await toast.promise(
        LoginUser({
          ...data,
          turnstileToken: loginDetails.turnstile,
        }),
        {
          loading: 'Authenticating...',
          success: (response) => response?.data?.message,
          error: (error) => error?.response?.data?.message,
        }
      );

      if (response?.data?.status === true) {
        var token = response?.data?.accessToken;
        var userDetails = response?.data?.user;

        // Handle remember me functionality
        if (data.rememberMe) {
          localStorage.setItem('rememberedEmail', data.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        const payload = {
          token: token,
          authUser: true,
        };
        dispatch(setAuthDetails(payload));
        flag = true;
      }
    } catch (error) {
      setLoading(false);
      return;
    }

    try {
      if (flag) {
        const response = await GetUserDetails();
        if (
          response?.data?.status === true &&
          response?.data?.data?.customerData !== null
        ) {
          navigate(protectedRoutes.connections);
        } else {
          navigate(protectedRoutes.questions);
        }
      } else {
        // Reset Turnstile token on failed login
        setLoginDetails((x) => ({ ...x, turnstile: '' }));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  function onChangeTurnstile(token) {
    setLoginDetails((x) => ({ ...x, ['turnstile']: token }));
  }

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
      }}
    >
      <Typography variant="h4" textAlign="center" sx={{ mb: 1 }}>
        Welcome Back
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        color="text.secondary"
        sx={{ color: '#0D0D0D', fontWeight: '400', mb: 2 }}
      >
        Please enter your credentials to Sign In
      </Typography>

      <form onSubmit={handleSubmit(handleLogin)}>
        <Stack direction={'column'} spacing={3}>
          <Box>
            <Typography mb={1} variant="subtitle3">
              Email Address
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
              defaultValue={localStorage.getItem('rememberedEmail') || ''}
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
              Password
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <CustomFormInput
                placeholder="Enter your password"
                sx={{ mt: 1 }}
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

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 0.5,
              }}
            >
              {/* <FormControlLabel
                control={<Checkbox {...register('rememberMe')} />}
                label={
                  <Typography
                    sx={{
                      color: '#000000',
                      fontSize: '1.1rem',
                      fontWeight: 400,
                    }}
                  >
                    Remember me
                  </Typography>
                }
              /> */}
              <Typography
                variant="subtitle2"
                sx={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 400,
                }}
                onClick={openForgetPass}
              >
                Forgot Password?
              </Typography>
            </Box>
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
            my={2}
            px={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              border: 'none',
              boxShadow: 'none',
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

          <RoundedButton
            title="Login"
            disabled={loading}
            sx={{ py: 1.5 }}
          />
        </Stack>
      </form>

      <Typography
        variant="subtitle2"
        textAlign={'center'}
        mt={1.5}
        fontWeight={400}
      >
        Don't have an account?{' '}
        <span
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            fontWeight: 400,
          }}
          onClick={showSignUp}
        >
          Sign up
        </span>
      </Typography>
    </Box>
  );
};
