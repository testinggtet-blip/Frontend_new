import { Box, Stack, Typography } from '@mui/material';
import { UpdatePassword } from 'Api/Api';
import { OuterInputField } from 'components/InputFields';
import { RoundedButton } from 'components/Button/Buttons';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import theme from 'styles/app.theme';
import { PasswordValidation } from 'utils/commonFunctions';
import { CustomFormInput } from 'components/Style';

/**
 * A React component that renders a form for changing a user's password.
 *
 * The component includes input fields for the new password and confirmation, as well as a "Confirm" button that triggers the password change logic.
 *
 * @param {function} navigateToLogin - A function that navigates the user to the login page.
 * @returns {JSX.Element} - The rendered password change form.
 */

const ConfirmPasswordContainer = ({ navigateToLogin }) => {
  const handleConfirm = async (data) => {
    try {
      console.log(data.password);
      navigateToLogin();
    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  return (
    <Box>
      <Typography variant="h5" textAlign="center">
        Welcome
      </Typography>
      <Typography variant="subtitle2" my={3}>
        Please enter your new password
      </Typography>
      <form onSubmit={handleSubmit(handleConfirm)}>
        <Stack direction={'column'} spacing={3} mt={5} mb={3}>
          <CustomFormInput
            placeholder="Enter Password"
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required',
              },
              validate: {
                validEmail: (value) =>
                  PasswordValidation(value) || 'Password is not valid',
              },
            })}
          />
          {errors.password && (
            <Typography sx={theme.typography.inputBlack}>
              {errors?.password?.message}
            </Typography>
          )}

          <CustomFormInput
            placeholder="Confirm password"
            type="password"
            {...register('confirmPassword', {
              required: {
                value: true,
                message: 'Password is required',
              },
              validate: {
                validEmail: (value) =>
                  PasswordValidation(value) || 'Password is not valid',
              },
            })}
          />
          {errors.confirmPassword && (
            <Typography sx={theme.typography.inputBlack}>
              {errors?.confirmPassword?.message}
            </Typography>
          )}
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'start',
          }}
        ></Box>
        <Box textAlign={'center'} mt={3}>
          <RoundedButton title={'Confirm'} />
        </Box>
      </form>
    </Box>
  );
};

export default ConfirmPasswordContainer;
