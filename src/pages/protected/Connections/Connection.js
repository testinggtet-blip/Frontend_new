import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
} from '@mui/material';
import connectionImage from '../../../assets/Images/Connection/connecion.png';
import CreateConnections from './CreateConnection';
import CodeInjection from './CodeInjection';
import { loginScrollbar } from 'components/Style';
import ConnectionKey from './ConnectionKey';
import { FetchAllConnnection } from 'Api/Api';

// Platform icons
import { ImageGridLayout } from 'components/ImageGridLayout';

export default function Connections() {
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [connectionName, setConnectionName] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [connectionId, setConnectionId] = useState('');

  const steps = [
    {
      label: connectionName || 'Create Connection',
      description:
        connectionName && connectionId
          ? `Connected to  ${connectionId}`
          : 'Connect your project and start exploring',
      component: (
        <CreateConnections
          setConnectionName={setConnectionName}
          connectionId={connectionId}
          setFlag={setFlag}
          setApiKey={setApiKey}
          setSecretKey={setSecretKey}
          setConnectionId={setConnectionId}
        />
      ),
    },
    {
      label: 'API Generation',
      description: '',
      component: <ConnectionKey apiKey={apiKey} secretKey={secretKey} />,
    },
    {
      label: 'Code Injection',
      description: '',
      component: (
        <CodeInjection
          apiKey={apiKey}
          secretKey={secretKey}
          connectionId={connectionId}
          setApiKey={setApiKey}
          setSecretKey={setSecretKey}
        />
      ),
    },
  ];

  const fetchConnectionData = async () => {
    try {
      const response = await FetchAllConnnection({ page: 1, limit: 15 });
      if (response?.data?.status === true) {
        if (response?.data?.data !== null) {
          setConnectionId(response?.data?.data?.[0].id);
          setConnectionName(response?.data?.data?.[0].connectionName);
          setActiveStep(steps.length - 1);
        }
      }
    } catch (error) {}
  };

  const handleStep = (step) => () => {
    if ((connectionId && step === 0) || step === 1) {
      return;
    }
    if (!flag || step !== 0) {
      setActiveStep(step);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted(false);
    setFlag(false);
  };

  useEffect(() => {
    fetchConnectionData();
  }, []);

  useEffect(() => {
    if (flag) {
      setActiveStep(1);
    }
  }, [flag]);

  return (
    <>
      <ImageGridLayout
        title="One platform, endless possibilities —connect with the provider that powers your "
        subtitle="online sucess"
        maxWidth="48%"
        imageMarginTop="0%"
        logoMarginTop="5%"
        subtitleWidth="85%"
        image={connectionImage}
        children={
          <>
            <Box
              sx={{
                ...loginScrollbar,
                paddingX: 1,
                boxShadow: 3,
                borderRadius: 1,
                width: '100%',
                height: '100%',
                maxWidth: 800,
                boxSizing: 'border-box',
                overflowY: 'scroll',
              }}
            >
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      onClick={handleStep(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        {index === 2 && selectedPlatform ? (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mt: 1,
                            }}
                          >
                            <img
                              src={selectedPlatform.icon}
                              alt={selectedPlatform.name}
                              style={{
                                width: '35px',
                                height: '35px',
                                marginRight: '8px',
                              }}
                            />
                            <Typography
                              variant="h6"
                              style={{
                                fontWeight: 'bold',
                              }}
                            >
                              {selectedPlatform.name}
                            </Typography>
                          </Box>
                        ) : (
                          <>{step.label}</>
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          marginTop: '4px',
                          color:
                            activeStep >= index
                              ? 'rgba(0, 0, 0, 0.6)'
                              : 'rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        {step.description}
                      </Typography>
                    </StepLabel>
                    <StepContent>{step.component}</StepContent>
                  </Step>
                ))}
              </Stepper>
              {completed && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                  </Button>
                </Paper>
              )}
            </Box>
          </>
        }
      />
    </>
  );
}
