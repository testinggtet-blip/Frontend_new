import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { protectedRoutes, unprotectedRoutes } from '../../constants/appRoutes';
import ProtectedScreen from '../protected/index';
import { Login } from './Login/LoginMain';
import { useSelector } from 'react-redux';
import AboutCustomer from 'pages/protected/Users/AboutCustomer';
import EnlargeFormModal from 'pages/protected/Forms/EnlargeFormModal';

const UnprotectedScreen = () => {
  const isAuthUser = useSelector((state) => state.authReducer.isAuthUser);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const customerData = userDetails?.customerData;

  const isValidCustomerData =
    customerData &&
    customerData.industry &&
    customerData.business &&
    customerData.challenges &&
    customerData.solutionslookingfor;

  const RedirectToExternal = ({ url }) => {
    useEffect(() => {
      window.location.href = url;
    }, [url]);

    return null;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path={unprotectedRoutes.termsAndCondition}
          element={
            <RedirectToExternal url={unprotectedRoutes.termsAndCondition} />
          }
        />
        <Route
          path={protectedRoutes.app}
          element={
            isAuthUser ? (
              <ProtectedScreen />
            ) : (
              <Navigate to={unprotectedRoutes.login} replace />
            )
          }
        />
        <Route
          path={unprotectedRoutes.login}
          element={
            isAuthUser ? (
              isValidCustomerData ? (
                <Navigate to={protectedRoutes.connections} replace />
              ) : (
                <Navigate to={protectedRoutes.questions} replace />
              )
            ) : (
              <Login />
            )
          }
        />

        <Route
          path={protectedRoutes.questions}
          element={
            isAuthUser ? (
              isValidCustomerData ? (
                <Navigate to={protectedRoutes.connections} replace />
              ) : (
                <AboutCustomer />
              )
            ) : (
              <Navigate to={unprotectedRoutes.login} replace />
            )
          }
        />
        <Route path="/show-forms/:formId" element={<EnlargeFormModal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UnprotectedScreen;
