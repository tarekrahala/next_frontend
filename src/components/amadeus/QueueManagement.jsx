import React, { useState, useEffect } from 'react';
import { AmadeusBookingService } from '../../services/amadeus-booking.service';
import { Box, Grid, FormControl, Select, MenuItem, Button, Alert, Paper, Typography, Chip, Divider } from '@mui/material';
import CustomFormLabel from '../../app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../app/components/forms/theme-elements/CustomTextField';
import CustomCheckbox from '../../app/components/forms/theme-elements/CustomCheckbox';
import DashboardCard from '../../app/components/shared/DashboardCard';

const QueueManagement = ({ onQueueChange }) => {
  const [queueId, setQueueId] = useState('77');
  const [officeId, setOfficeId] = useState('JEDS2242J');
  const [category, setCategory] = useState(0);
  const [fetchBookings, setFetchBookings] = useState(true);
  const [pnrType, setPnrType] = useState('TK');
  const [maxResults, setMaxResults] = useState(999);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);

  const bookingService = new AmadeusBookingService();

  useEffect(() => {
    if (onQueueChange) {
      onQueueChange(queueId);
    }
  }, [queueId, onQueueChange]);

  const handleFetchQueue = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await bookingService.fetchQueueAndBookings({
        queueId,
        officeId,
        category,
        max: maxResults,
        fetchBookings,
        pnrType,
      });
      
      setResult(response);
      
      // Also fetch statistics
      const stats = await bookingService.getQueueStatistics(queueId, category);
      setStatistics(stats);
    } catch (error) {
      console.error('Failed to fetch queue:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const pnrTypeOptions = [
    { value: 'SCH', label: 'SCH - Scheduled' },
    { value: 'TK', label: 'TK - Ticketed' },
    { value: 'UN', label: 'UN - Unconfirmed' },
    { value: 'HX', label: 'HX - Hold/Expired' },
    { value: 'UC', label: 'UC - Unconfirmed' },
    { value: 'HN', label: 'HN - Hold/No Action' },
    { value: 'NO', label: 'NO - No Action' },
    { value: 'TN', label: 'TN - Ticketed/No Action' },
    { value: 'KL', label: 'KL - Kill/Cancelled' }
  ];

  return (
    <Box className="queue-management">
      <DashboardCard 
        title="🗂️ Queue Management"
        subtitle="Configure and fetch Amadeus queue information"
        action={
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={handleFetchQueue}
            disabled={loading}
            sx={{ minWidth: '200px' }}
          >
            {loading ? '🔄 Fetching...' : '🚀 Fetch Queue'}
          </Button>
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="queueId">Queue ID</CustomFormLabel>
            <CustomTextField 
              id="queueId"
              fullWidth
              value={queueId} 
              onChange={(e) => setQueueId(e.target.value)}
              placeholder="Enter queue ID (e.g., 77)"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="officeId">Office ID</CustomFormLabel>
            <CustomTextField 
              id="officeId"
              fullWidth
              value={officeId} 
              onChange={(e) => setOfficeId(e.target.value)}
              placeholder="JEDS2242J"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="category">Category</CustomFormLabel>
            <CustomTextField 
              id="category"
              fullWidth
              type="number" 
              value={category} 
              onChange={(e) => setCategory(parseInt(e.target.value))}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="maxResults">Max Results</CustomFormLabel>
            <CustomTextField 
              id="maxResults"
              fullWidth
              type="number" 
              value={maxResults} 
              onChange={(e) => setMaxResults(parseInt(e.target.value))}
              inputProps={{ min: 1, max: 999 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="pnrType">PNR Type</CustomFormLabel>
            <FormControl fullWidth>
              <Select 
                id="pnrType"
                value={pnrType} 
                onChange={(e) => setPnrType(e.target.value)}
              >
                {pnrTypeOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 3 }}>
              <CustomCheckbox 
                checked={fetchBookings} 
                onChange={(e) => setFetchBookings(e.target.checked)}
              />
              <span style={{ marginLeft: '8px' }}>Fetch detailed booking information</span>
            </Box>
          </Grid>
        </Grid>

        {error && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="error">
              ❌ {error}
            </Alert>
          </Box>
        )}
      </DashboardCard>

      {statistics && (
        <DashboardCard 
          title="📊 Queue Statistics"
          subtitle="Real-time queue performance metrics"
        >
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {statistics.totalItems}
                </Typography>
                <Typography variant="body2">Total Items</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="secondary" gutterBottom>
                  {statistics.totalBookings}
                </Typography>
                <Typography variant="body2">Total Bookings</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {new Date(statistics.lastUpdated).toLocaleString()}
                </Typography>
                <Typography variant="body2">Last Updated</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Booking Status Breakdown</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(statistics.bookingsByStatus || {}).map(([status, count]) => (
                <Chip
                  key={status}
                  label={`${status}: ${count}`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>Ticketing Status Breakdown</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {Object.entries(statistics.bookingsByTicketingStatus || {}).map(([status, count]) => (
                <Chip
                  key={status}
                  label={`${status}: ${count}`}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        </DashboardCard>
      )}

      {result && (
        <DashboardCard 
          title="✅ Fetch Results"
          subtitle="Queue processing results and summary"
        >
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="success" gutterBottom>
                  {result.newBookings}
                </Typography>
                <Typography variant="body2">New Bookings</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="info" gutterBottom>
                  {result.updatedBookings}
                </Typography>
                <Typography variant="body2">Updated Bookings</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="error" gutterBottom>
                  {result.errors.length}
                </Typography>
                <Typography variant="body2">Errors</Typography>
              </Paper>
            </Grid>
          </Grid>

          {result.errors.length > 0 && (
            <Box>
              <Typography variant="h6" color="error" gutterBottom>❌ Errors</Typography>
              {result.errors.map((error, index) => (
                <Alert key={index} severity="error" sx={{ mb: 1 }}>
                  {error}
                </Alert>
              ))}
            </Box>
          )}
        </DashboardCard>
      )}
    </Box>
  );
};

export default QueueManagement;
