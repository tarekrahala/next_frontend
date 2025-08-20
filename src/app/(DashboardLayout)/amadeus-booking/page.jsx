'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Container,
  Divider,
  Chip,
  Stack
} from '@mui/material';
import { 
  Flight, 
  Queue, 
  BusinessCenter,
  TrendingUp
} from '@mui/icons-material';
import PageContainer from '@/app/components/container/PageContainer';
import ErrorBoundary from '../../../components/ErrorBoundary';
import QueueManagement from '../../../components/amadeus/QueueManagement';
import BookingList from '../../../components/amadeus/BookingList';

const AmadeusBookingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeQueueId, setActiveQueueId] = useState('77');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleQueueUpdate = () => {
    window.location.reload();
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`amadeus-tabpanel-${index}`}
      aria-labelledby={`amadeus-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );

  return (
    <ErrorBoundary>
      <PageContainer title="Amadeus Booking Management" description="Manage queues and bookings with JEDS2242J office">
        {/* Header Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #90caf9 100%)',
            color: 'white',
            mb: 4,
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: 200, 
            height: 200, 
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translate(50%, -50%)'
          }} />
          
          <Container maxWidth="xl">
            <Box sx={{ py: 4, px: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <BusinessCenter sx={{ fontSize: 40, color: 'rgba(255,255,255,0.9)' }} />
                <Box>
                  <Typography variant="h3" component="h1" fontWeight={700} sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    Amadeus Booking Management
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                    Professional fare optimization & booking management system
                  </Typography>
                </Box>
              </Stack>
              
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip 
                  icon={<Flight />} 
                  label="JEDS2242J Office" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' }
                  }} 
                />
                <Chip 
                  icon={<TrendingUp />} 
                  label="Production API" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600,
                    '& .MuiChip-icon': { color: 'white' }
                  }} 
                />
              </Stack>
            </Box>
          </Container>
        </Paper>

        {/* Main Content with Tabs */}
        <Paper 
          elevation={0} 
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            bgcolor: 'background.paper',
            overflow: 'hidden'
          }}
        >
          {/* Tab Navigation */}
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            bgcolor: 'grey.50'
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 64,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 700
                  }
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                }
              }}
            >
              <Tab 
                icon={<Queue sx={{ mb: 0.5 }} />} 
                label="Queue Management" 
                iconPosition="top"
              />
              <Tab 
                icon={<Flight sx={{ mb: 0.5 }} />} 
                label="Booking Management" 
                iconPosition="top"
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ bgcolor: 'background.default', minHeight: 600 }}>
            {/* Queue Management Tab */}
            <TabPanel value={activeTab} index={0}>
              <Container maxWidth="xl">
                <QueueManagement onQueueChange={setActiveQueueId} />
              </Container>
            </TabPanel>

            {/* Booking Management Tab */}
            <TabPanel value={activeTab} index={1}>
              <Container maxWidth="xl">
                <BookingList />
              </Container>
            </TabPanel>
          </Box>
        </Paper>

        {/* Footer */}
        <Paper 
          elevation={0} 
          sx={{ 
            mt: 4, 
            p: 3, 
            textAlign: 'center',
            bgcolor: 'grey.50',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3
          }}
        >
          <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Connected to Amadeus Production API
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" color="text.secondary">
              Office: JEDS2242J
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" color="text.secondary">
              Last Updated: {new Date().toLocaleDateString()}
            </Typography>
          </Stack>
        </Paper>
      </PageContainer>
    </ErrorBoundary>
  );
};

export default AmadeusBookingPage;
