import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState, useEffect } from 'react';
import loginImage from '../../../assets/Images/UnProtected/Login-page.png';
import signupImage from '../../../assets/Images/UnProtected/Signup-page.png';
import { SignUpContainer } from './SignUpContainer';
import { LoginContainer } from './LoginContainer';
import { ForgotPwdModal } from 'components/Modals';
import ConfirmPasswordContainer from './ChangePwdContainer';
import { ImageGridLayout } from 'components/ImageGridLayout';

export const Login = () => {
  const [isLogin, setLogin] = useState('login');
  const [openForgetPass, setOpenForgetPass] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const showSignUp = () => {
    setLogin('signup');
  };

  const showLogin = () => {
    setLogin('login');
  };

  const showForgetPass = () => {
    setOpenForgetPass(true);
  };

  const sendToConfirmPass = () => {
    setOpenForgetPass(false);
    setLogin('confirm-pass');
  };

  return (
    <>
      <ImageGridLayout
        title={
          isLogin === 'login'
            ? 'Make every message count with precise push notifications using'
            : 'Never miss a beat—engage your customers with timely push alerts by using subtitle, image, children'
        }
        maxWidth="55%"
        imageMarginTop={isLogin === 'login' ? '-8%' : '-3%'}
        logoMarginTop={isLogin === 'login' ? '6.5%' : '6%'}
        subtitleWidth={isLogin === 'login' ? '80%' : '86%'}
        subtitle=" Lets Notify"
        image={isLogin === 'login' ? loginImage : signupImage}
        children={
          isLogin === 'login' ? (
            <LoginContainer
              showSignUp={showSignUp}
              openForgetPass={showForgetPass}
            />
          ) : isLogin === 'signup' ? (
            <SignUpContainer showLogin={showLogin} />
          ) : (
            <ConfirmPasswordContainer navigateToLogin={showLogin} />
          )
        }
      />

      <ForgotPwdModal
        open={openForgetPass}
        handleClose={() => setOpenForgetPass(false)}
        sendToConfirmPass={sendToConfirmPass}
      />
    </>
  );
};
