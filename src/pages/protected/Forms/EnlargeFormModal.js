import { Box, CircularProgress } from '@mui/material';
import { MainDashboard } from 'components/Style';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FetchOneForm } from 'Api/Api';
import toast from 'react-hot-toast';
import SlidingCard from './components/Cards/SlidingCard';

const EnlargeFormModal = () => {
  const { formId } = useParams();
  const [searchParams] = useSearchParams();
  const [formDetails, setFormDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const connectionId = searchParams.get('connectionId');
  const preview = searchParams.get('preview') === 'true';

  const fetchForm = async () => {
    try {
      const response = await FetchOneForm(formId);
      if (response?.data?.status) {
        setFormDetails(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load form11');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForm();
  }, [formId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f9f9f9"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!formDetails) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f9f9f9"
      >
        <Box p={3}>Form not found</Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f6fa',
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          p: { xs: 2, md: 4 },
        }}
      >
        <SlidingCard
          survey={formDetails}
          preview={preview}
          connectionId={connectionId}
          fullScreen={true}
        />
      </Box>
    </Box>
  );
};

export default EnlargeFormModal;
