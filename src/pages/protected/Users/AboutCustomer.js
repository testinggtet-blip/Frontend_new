import React, { useState } from 'react';
import logoSrc from 'assets/Images/Common/logo.png';
import questionImage from 'assets/Images/UnProtected/Question-page.png';
import { useMediaQuery } from '@mui/material';
import {
  IconButton,
  Box,
  FormControl,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { protectedRoutes } from 'constants/appRoutes';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { GetUserDetails, SaveAboutUser } from 'Api/Api';
import { OuterInputField } from 'components/InputFields';
import { SignupSelect } from './Style';
import { RoundedButton } from 'components/Button/Buttons';
import { useForm } from 'react-hook-form';
import { CustomFormInput, loginScrollbar } from 'components/Style';
import { ImageGridLayout } from 'components/ImageGridLayout';

const customStyles = {
  inputField: {
    transition: 'all 0.3s ease',
    borderRadius: '8px',
    padding: '5px 0px',
    fontSize: '0.95rem',
    '&:focus': {
      boxShadow: '0 0 8px rgba(8, 255, 217, 0.3)',
      borderColor: '#08FFD9',
    },
  },
  typography: {
    title: {
      fontWeight: 400,
      color: '#044E43',
      letterSpacing: '-0.5px',
    },
    subtitle: {
      color: '#2c3e50',
      fontWeight: 400,
    },
  },
};

const AboutCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [questionDetails, setQuestionDetails] = useState({
    everusedpushnotification: '',
  });
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async (data) => {
    if (!questionDetails.everusedpushnotification) {
      toast.error('Select a question');
      return;
    }
    const combinedData = { ...data, ...questionDetails };
    try {
      const saveResponse = await SaveAboutUser(combinedData);
      if (saveResponse?.data?.status === true) {
        toast.success(saveResponse?.data?.message);
        const userResponse = await GetUserDetails();
        if (
          userResponse?.data?.status === true &&
          userResponse?.data?.data?.customerData !== null
        ) {
          const userDetails = userResponse?.data?.data;
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          navigate(protectedRoutes.connections);
        }
      } else {
        setLoading(false);
        toast.error(saveResponse?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <ImageGridLayout
        aboutPage={true}
        title="—our push notifications have you covered"
        imageMarginTop="1%"
        logoMarginTop="6.5%"
        subtitleWidth="80%"
        maxWidth="53%"
        subtitle="Engage, inform, and delight"
        image={questionImage}
        children={
          <>
            <Box
              sx={{
                ...loginScrollbar,
                padding: 3,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderRadius: 2,
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                overflowY: 'scroll',
              }}
            >
              {isSmallScreen ? (
                <>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconButton disableRipple>
                      <img width={50} src={logoSrc} alt="Logo" />
                    </IconButton>
                    <Typography variant="h4" textAlign="left" sx={{ mr: 10 }}>
                      Lets Notify
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="h4" textAlign="center" sx={{ mb: 0 }}>
                    Almost done!
                  </Typography>
                </>
              )}
              <Box textAlign="center">
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    color: '#0D0D0D',
                    fontWeight: '400',
                    mb: 1,
                    fontSize: '24px',
                  }}
                >
                  {isSmallScreen
                    ? 'Let us know more about you'
                    : 'Let’s make it official with a bit more info.'}
                </Typography>
              </Box>

              <form>
                <Stack direction={'column'} spacing={3} my={3}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={customStyles.typography.subtitle}
                    >
                      Industry
                    </Typography>
                    <CustomFormInput
                      {...register('industry', {
                        required: 'Field required*',
                      })}
                      sx={{
                        ...customStyles.inputField,
                        borderColor: errors.industry ? 'error.main' : 'divider',
                      }}
                    />
                    {errors.industry && (
                      <Typography
                        sx={{
                          color: 'error.main',
                          mt: 0.5,
                          fontSize: '0.75rem',
                        }}
                      >
                        {errors?.industry?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={customStyles.typography.subtitle}
                    >
                      Business Model
                    </Typography>
                    <CustomFormInput
                      {...register('business', {
                        required: 'Field required*',
                      })}
                      sx={{
                        ...customStyles.inputField,
                        borderColor: errors.business ? 'error.main' : 'divider',
                      }}
                    />
                    {errors.business && (
                      <Typography
                        sx={{
                          color: 'error.main',
                          mt: 0.5,
                          fontSize: '0.75rem',
                        }}
                      >
                        {errors?.business?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={customStyles.typography.subtitle}
                    >
                      What are the challenges are you facing and solutions that
                      are you looking for?
                    </Typography>
                    <CustomFormInput
                      multiline
                      rows={3}
                      {...register('challenges', {
                        required: 'Field required*',
                      })}
                      sx={{
                        ...customStyles.inputField,
                        borderColor: errors.challenges
                          ? 'error.main'
                          : 'divider',
                      }}
                    />
                    {errors.challenges && (
                      <Typography
                        sx={{
                          color: 'error.main',
                          mt: 0.5,
                          fontSize: '0.75rem',
                        }}
                      >
                        {errors?.challenges?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={customStyles.typography.subtitle}
                    >
                      Solutions you are looking for
                    </Typography>
                    <CustomFormInput
                      multiline
                      rows={3}
                      {...register('solutionslookingfor', {
                        required: 'Field required*',
                      })}
                      sx={{
                        ...customStyles.inputField,
                        borderColor: errors.solutionslookingfor
                          ? 'error.main'
                          : 'divider',
                      }}
                    />
                    {errors.solutionslookingfor && (
                      <Typography
                        sx={{
                          color: 'error.main',
                          mt: 0.5,
                          fontSize: '0.75rem',
                        }}
                      >
                        {errors?.solutionslookingfor?.message}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    {/* Label */}
                    <Typography
                      variant="subtitle2"
                      gutterBottom={false}
                      sx={{
                        ...customStyles.typography.subtitle,
                        mb: 0.3,
                      }}
                    >
                      Have you been using Push Notification Tool?
                    </Typography>

                    {/* Select */}
                    <FormControl fullWidth required sx={{ mt: 0 }}>
                      <SignupSelect
                        value={questionDetails?.everusedpushnotification || ''}
                        onChange={handleChange}
                        name="everusedpushnotification"
                        displayEmpty
                        sx={{
                          ...customStyles.select,
                          mt: 0.5,
                        }}
                      >
                        {['Yes', 'No'].map((option) => (
                          <MenuItem
                            key={option}
                            value={option}
                            sx={{
                              color: 'black',
                              backgroundColor:
                                questionDetails?.everusedpushnotification ===
                                option
                                  ? 'rgba(7, 130, 111, 0.30)'
                                  : 'transparent',
                              '&:hover': {
                                backgroundColor: 'rgba(7, 130, 111, 0.30)',
                                color: 'black',
                              },
                            }}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </SignupSelect>
                    </FormControl>
                  </Box>

                  {questionDetails?.everusedpushnotification === 'Yes' && (
                    <>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={customStyles.typography.subtitle}
                        >
                          If Yes, which one?
                        </Typography>
                        <OuterInputField
                          name={'olderserviceprovider'}
                          margin="dense"
                          value={questionDetails?.olderserviceprovider}
                          onChange={(e) => {
                            const newData = { ...questionDetails };
                            delete newData.whynot;
                            setQuestionDetails({
                              ...newData,
                              olderserviceprovider: e.target.value,
                            });
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={customStyles.typography.subtitle}
                        >
                          Why you're switching from others to here?
                        </Typography>
                        <OuterInputField
                          name={'reasonforswitching'}
                          margin="dense"
                          multiline={true}
                          value={questionDetails?.reasonforswitching}
                          onChange={(e) => {
                            setQuestionDetails({
                              ...questionDetails,
                              reasonforswitching: e.target.value,
                            });
                          }}
                        />
                      </Box>
                    </>
                  )}
                  {questionDetails?.everusedpushnotification === 'No' && (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={customStyles.typography.subtitle}
                      >
                        If No, Why?
                      </Typography>
                      <OuterInputField
                        name={'whynot'}
                        multiline={true}
                        margin="dense"
                        value={questionDetails?.whynot}
                        onChange={(e) => {
                          const newData = { ...questionDetails };
                          delete newData.olderserviceprovider;
                          delete newData.reasonforswitching;
                          setQuestionDetails({
                            ...newData,
                            whynot: e.target.value,
                          });
                        }}
                      />
                    </Box>
                  )}
                </Stack>

                <Box textAlign={'center'} mt={3}>
                  <RoundedButton
                    title={'Start Setup'}
                    type="button"
                    onClick={handleSubmit(handleClick)}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 10px rgba(8, 255, 217, 0.3)',
                      },
                    }}
                  />
                </Box>
              </form>
            </Box>
          </>
        }
      />
    </>
  );
};

export default AboutCustomer;
