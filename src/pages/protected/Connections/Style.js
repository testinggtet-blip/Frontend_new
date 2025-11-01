import styled from "@emotion/styled";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  ListItem,
} from "@mui/material";
import theme from "../../../styles/app.theme";
import { Dashboard } from "@mui/icons-material";

// --------  Create Connect Style ----------

export const MainContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #fbfbfb;
`;

export const SubContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StackStyling = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 100%;
`;
export const WebBox = styled(Box)(() => ({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "1rem",
  color: "#ffffff",
  backgroundColor: theme.palette.primary.main,
}));

export const ShopifyBox = styled(Box)`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
  margin: 0;
`;
export const ContentBox = styled(Box)(() => ({
  border: "1px solid " + theme.palette.primary.main,
  borderRadius: "0.5rem",
  boxShadow:
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  width: "100%",
  display: "flex",
  height: "75vh",
  flexDirection: "column",
  overflowY: "auto",
  overflowX: "hidden",
  alignItems: "center",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#058270",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#ecf0f1",
  },
}));
export const ContentBoxInner = styled(Box)(() => ({
  borderRadius: "0.5rem",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "3rem",
}));
export const CodeInjectionContentBoxInner = styled(Box)(() => ({
  borderRadius: "0.5rem",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "start",
  alignItems: "start",
  padding: "1.5rem",
}));
export const SmallBoxContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  gap: "2rem",
  justifyContent: "center",
  alignItems: "center",
}));
export const TextContainer = styled(Box)(() => ({
  marginTop: "1rem",
  width: "100%",
  display: "flex",
  justifyContent: "center"
}));
export const SmallBorderBox = styled(Box)(() => ({
  border: "1px solid " + theme.palette.primary.main,
  borderRadius: "0.5rem",
  width: "100%",
  gap: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: ".5rem",
}));
export const BigBorderBox = styled(Box)(() => ({
  border: "1px solid " + theme.palette.primary.main,
  borderRadius: "0.5rem",
  width: "70%",
  gap: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem",
}));
export const ListItemComp = styled(ListItem)(() => ({
  marginY: "0",
  paddingTop: "0",
  paddingBottom: "0",
}));

export const FormStack = styled(Stack)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
  justifyContent: "center",
  alignItems: "center",
  width: { xs: "100%" },
}));

export const SubmitButton = styled(Button)(() => ({
  borderRadius: "2rem",
}));

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const flexBox = {
  display:"flex",
  alignItems: "flex-start",
}

//  ---------------- Connnect Dashboard styles ------------
