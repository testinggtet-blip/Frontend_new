import React, { useEffect, useState } from 'react';
import NoRecord from 'components/NoRecord';
import CreateTemplateModal from 'pages/protected/Templates/NotificationTemplateModal';
import Details from 'pages/protected/Templates/Enlarge/Details';
import { Typography } from '@mui/material';

export const Welcome = ({
  item,
  welcomeTemplate,
  refreshWelcomeTemplate,
  setWelcomeTemplates,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [flag, setFlag] = useState(welcomeTemplate !== null);
  const [error, setError] = useState(null);

  const handleCreateModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    refreshWelcomeTemplate();
  }, []);

  useEffect(() => {
    setFlag(welcomeTemplate !== null);
  }, [welcomeTemplate]);

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      {flag ? (
        <Details
          item={welcomeTemplate}
          onClose={handleClose}
          refresh={''}
          refreshWelcomeTemplate={refreshWelcomeTemplate}
          welcomeTemplate={welcomeTemplate}
          setWelcomeTemplates={setWelcomeTemplates}
        />
      ) : (
        <>
          <NoRecord 
            type="callback"
            moduleName="Welcome Template"
            title="Create engaging push notifications with our easy-to-use welcome template"
            description="Get started by creating your first template to send beautiful push notifications to your audience."
            onAction={handleCreateModal}
          />
          <CreateTemplateModal
            open={openModal}
            onClose={handleClose}
            welcome={true}
            refreshWelcomeTemplate={refreshWelcomeTemplate}
          />
        </>
      )}
    </>
  );
};
