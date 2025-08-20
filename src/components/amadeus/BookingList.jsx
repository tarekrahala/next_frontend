import React, { useState, useEffect } from 'react';
import { AmadeusBookingService } from '../../services/amadeus-booking.service';
import BookingRow from './BookingRow';
import { Box, Grid, FormControl, Select, MenuItem, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import CustomFormLabel from '../../app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../app/components/forms/theme-elements/CustomTextField';
import DashboardCard from '../../app/components/shared/DashboardCard';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    limit: 50,
    offset: 0,
  });

  const bookingService = new AmadeusBookingService();

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getBookings(filters);
      setBookings(response.bookings || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [filters]);

  const handleRefreshBooking = async (reference) => {
    try {
      await bookingService.refreshBooking(reference);
      loadBookings(); // Reload the list
    } catch (error) {
      console.error('Failed to refresh booking:', error);
    }
  };

  const handleBookingAction = async (reference, action, data) => {
    try {
      await bookingService.performBookingAction(reference, { action, data });
      loadBookings(); // Reload the list
    } catch (error) {
      console.error('Failed to perform action:', error);
    }
  };

  const handleDeleteBooking = async (reference) => {
    if (window.confirm(`Are you sure you want to delete booking ${reference}?`)) {
      try {
        await bookingService.deleteBooking(reference);
        loadBookings(); // Reload the list
      } catch (error) {
        console.error('Failed to delete booking:', error);
      }
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
      offset: 0 // Reset to first page when filters change
    }));
  };

  const handlePreviousPage = () => {
    setFilters(prev => ({
      ...prev,
      offset: Math.max(0, (prev.offset || 0) - (prev.limit || 50))
    }));
  };

  const handleNextPage = () => {
    setFilters(prev => ({
      ...prev,
      offset: (prev.offset || 0) + (prev.limit || 50)
    }));
  };

  return (
    <DashboardCard 
      title="📋 Booking Management"
      subtitle={`Showing ${bookings.length} of ${total} bookings`}
      action={
        <Button 
          variant="outlined" 
          color="primary"
          onClick={loadBookings}
        >
          🔄 Refresh All
        </Button>
      }
    >
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <CustomFormLabel htmlFor="queueId">Queue ID</CustomFormLabel>
          <CustomTextField 
            id="queueId"
            fullWidth
            placeholder="Queue ID" 
            value={filters.queueId || ''} 
            onChange={(e) => handleFilterChange('queueId', e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} md={3}>
          <CustomFormLabel htmlFor="status">Status</CustomFormLabel>
          <FormControl fullWidth>
            <Select 
              id="status"
              value={filters.status || ''} 
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="ERROR">Error</MenuItem>
              <MenuItem value="DELETED">Deleted</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomFormLabel htmlFor="ticketingStatus">Ticketing Status</CustomFormLabel>
          <FormControl fullWidth>
            <Select 
              id="ticketingStatus"
              value={filters.ticketingStatus || ''} 
              onChange={(e) => handleFilterChange('ticketingStatus', e.target.value)}
            >
              <MenuItem value="">All Ticketing Statuses</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
              <MenuItem value="TICKETED">Ticketed</MenuItem>
              <MenuItem value="CANCELLED">Cancelled</MenuItem>
              <MenuItem value="EXPIRED">Expired</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomFormLabel htmlFor="reference">Reference</CustomFormLabel>
          <CustomTextField 
            id="reference"
            fullWidth
            placeholder="Search by reference" 
            value={filters.reference || ''} 
            onChange={(e) => handleFilterChange('reference', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomFormLabel htmlFor="limit">Results per page</CustomFormLabel>
          <FormControl fullWidth>
            <Select
              id="limit"
              value={filters.limit || 50}
              onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
            >
              <MenuItem value={25}>25 per page</MenuItem>
              <MenuItem value={50}>50 per page</MenuItem>
              <MenuItem value={100}>100 per page</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={loadBookings}
              fullWidth
            >
              🔍 Search
            </Button>
          </Box>
        </Grid>
      </Grid>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6">🔄 Loading bookings...</Typography>
        </Box>
      ) : (
        <>
          {bookings.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6">No bookings found matching your criteria.</Typography>
            </Box>
          ) : (
            <>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Reference</TableCell>
                      <TableCell>Travelers</TableCell>
                      <TableCell>Route</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Ticketing</TableCell>
                      <TableCell>PNR Type</TableCell>
                      <TableCell>Last Updated</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <BookingRow 
                        key={booking.id} 
                        booking={booking} 
                        onRefresh={handleRefreshBooking}
                        onAction={handleBookingAction}
                        onDelete={handleDeleteBooking}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 3 }}>
                <Button 
                  variant="outlined"
                  onClick={handlePreviousPage}
                  disabled={(filters.offset || 0) === 0}
                >
                  ← Previous
                </Button>
                
                <Typography variant="body2">
                  Page {Math.floor((filters.offset || 0) / (filters.limit || 50)) + 1} of {Math.ceil(total / (filters.limit || 50))}
                </Typography>
                
                <Button 
                  variant="outlined"
                  onClick={handleNextPage}
                  disabled={(filters.offset || 0) + (filters.limit || 50) >= total}
                >
                  Next →
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </DashboardCard>
  );
};

export default BookingList;
