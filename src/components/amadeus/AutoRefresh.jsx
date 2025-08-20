import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Chip,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Grid
} from '@mui/material';
import { 
  Refresh, 
  AutoAwesome, 
  Timer, 
  CheckCircle,
  Warning,
  Error
} from '@mui/icons-material';
import DashboardCard from '../../app/components/shared/DashboardCard';

const AutoRefresh = ({ queueId, onUpdate }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [status, setStatus] = useState('idle'); // idle, updating, success, error
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    if (isEnabled) {
      const interval = setInterval(() => {
        handleAutoUpdate();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [isEnabled, queueId]);

  const handleAutoUpdate = async () => {
    try {
      setStatus('updating');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLastUpdate(new Date());
      setUpdateCount(prev => prev + 1);
      setStatus('success');
      
      if (onUpdate) {
        onUpdate();
      }
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleManualUpdate = () => {
    handleAutoUpdate();
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'updating':
        return <Refresh sx={{ animation: 'spin 1s linear infinite' }} />;
      case 'success':
        return <CheckCircle color="success" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <Timer color="info" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'updating':
        return 'warning';
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'updating':
        return 'Updating...';
      case 'success':
        return 'Updated Successfully';
      case 'error':
        return 'Update Failed';
      default:
        return 'Idle';
    }
  };

  return (
    <DashboardCard 
      title="Auto-Refresh System"
      subtitle="Real-time queue monitoring and automatic updates"
    >
      <Box sx={{ p: 3 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Status Display */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              bgcolor: 'grey.50'
            }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  bgcolor: 'primary.50',
                  color: 'primary.main'
                }}>
                  <AutoAwesome sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600} color="text.primary">
                    System Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Real-time monitoring active
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Current Status
                  </Typography>
                  <Chip 
                    icon={getStatusIcon()}
                    label={getStatusText()}
                    color={getStatusColor()}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Update
                  </Typography>
                  <Typography variant="body2" fontWeight={500} color="text.primary">
                    {lastUpdate.toLocaleTimeString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Update Count
                  </Typography>
                  <Typography variant="body2" fontWeight={500} color="primary.main">
                    {updateCount}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Queue ID
                  </Typography>
                  <Chip 
                    label={queueId}
                    color="primary"
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Controls */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              bgcolor: 'grey.50'
            }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3, color: 'text.primary' }}>
                Control Panel
              </Typography>

              <Stack spacing={3}>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isEnabled}
                        onChange={(e) => setIsEnabled(e.target.checked)}
                        color="primary"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'primary.main',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight={500}>
                          Enable Auto-Refresh
                        </Typography>
                        <Chip 
                          label={isEnabled ? 'ON' : 'OFF'} 
                          color={isEnabled ? 'success' : 'default'}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>
                    }
                  />
                </Box>

                <Divider />

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Manual Update
                  </Typography>
                  <Tooltip title="Force immediate update">
                    <IconButton
                      onClick={handleManualUpdate}
                      disabled={status === 'updating'}
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                        '&:disabled': {
                          bgcolor: 'grey.300',
                          color: 'grey.500',
                        },
                        width: 48,
                        height: 48,
                      }}
                    >
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Update Interval
                  </Typography>
                  <Typography variant="body1" fontWeight={500} color="primary.main">
                    30 seconds
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Automatic refresh every 30 seconds when enabled
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Status Messages */}
        {status === 'success' && (
          <Alert 
            severity="success" 
            sx={{ 
              mt: 3,
              borderRadius: 2,
              '& .MuiAlert-message': { fontWeight: 500 }
            }}
          >
            Queue data updated successfully at {lastUpdate.toLocaleTimeString()}
          </Alert>
        )}

        {status === 'error' && (
          <Alert 
            severity="error" 
            sx={{ 
              mt: 3,
              borderRadius: 2,
              '& .MuiAlert-message': { fontWeight: 500 }
            }}
          >
            Failed to update queue data. Please check your connection and try again.
          </Alert>
        )}

        {status === 'updating' && (
          <Alert 
            severity="info" 
            sx={{ 
              mt: 3,
              borderRadius: 2,
              '& .MuiAlert-message': { fontWeight: 500 }
            }}
          >
            Updating queue data... Please wait.
          </Alert>
        )}
      </Box>
    </DashboardCard>
  );
};

export default AutoRefresh;
