import { Box, Container, Select } from '@mui/material';
import { styled } from '@mui/system';
export const MainContainer = styled(Container)`
  width: 82vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
`;

export const QuestionStack = styled(Box)`
  width: 60vw;
  height: 100vh;
  padding: 0% 3%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  overflow-x: hidden;
  overflow: scroll;
`;

export const SignupSelect = styled(Select)(({ theme }) => ({
  color: '#64707D',
  width: '100%',
  height: '50px',
  borderRadius: '6px',
  border: '1px solid #64707D',
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#64707D',
  },
  '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#64707D',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#64707D',
  },
}));
