import React, { useState } from 'react';
import { TableRow, TableCell, Button, Box, Chip, Typography, IconButton, Tooltip, Paper, Divider } from '@mui/material';
import { Refresh, CheckCircle, NoteAdd, Edit, ExpandMore, ExpandLess } from '@mui/icons-material';
import BookingDetails from './BookingDetails';
import DashboardCard from '../../app/components/shared/DashboardCard';

const BookingRow = ({ booking, onRefresh, onAction, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getRoute = () => {
    const firstSegment = booking.flightOffers?.[0]?.itineraries?.[0]?.segments?.[0];
    const lastSegment = booking.flightOffers?.[0]?.itineraries?.[0]?.segments?.slice(-1)[0];
    if (firstSegment && lastSegment) {
      return `${firstSegment.departure.iataCode} → ${lastSegment.arrival.iataCode}`;
    }
    return 'N/A';
  };

  const getTravelerNames = () => {
    if (!booking.travelers || booking.travelers.length === 0) return 'N/A';
    return booking.travelers.map(t => `${t.name?.firstName || ''} ${t.name?.lastName || ''}`.trim()).join(', ');
  };

  const getPrice = () => {
    if (booking.totalPrice && booking.currency) {
      return `${booking.currency} ${booking.totalPrice}`;
    }
    return 'N/A';
  };

  const getPnrTypeLabel = (pnrType) => {
    const pnrLabels = {
      'SCH': 'SCH - Scheduled',
      'TK': 'TK - Ticketed',
      'UN': 'UN - Unconfirmed',
      'HX': 'HX - Hold/Expired',
      'UC': 'UC - Unconfirmed',
      'HN': 'HN - Hold/No Action',
      'NO': 'NO - No Action',
      'TN': 'TN - Ticketed/No Action',
      'KL': 'KL - Kill/Cancelled'
    };
    return pnrLabels[pnrType] || pnrType;
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'ACTIVE': 'success',
      'COMPLETED': 'info',
      'CANCELLED': 'error',
      'ERROR': 'error',
      'DELETED': 'default'
    };
    return statusColors[status] || 'default';
  };

  const getTicketingColor = (status) => {
    const ticketingColors = {
      'TICKETED': 'success',
      'PENDING': 'warning',
      'CANCELLED': 'error',
      'EXPIRED': 'error'
    };
    return ticketingColors[status] || 'default';
  };

  const handleAddNote = () => {
    // TODO: Implement add note functionality
    console.log('Add note for booking:', booking.reference);
  };

  const handleEditLossDetails = () => {
    // TODO: Implement edit loss details functionality
    console.log('Edit loss details for booking:', booking.reference);
  };

  return (
    <>
      <TableRow 
        onClick={() => setShowDetails(!showDetails)} 
        sx={{ 
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'action.hover' },
          backgroundColor: showDetails ? 'action.selected' : 'inherit',
          transition: 'all 0.2s ease-in-out'
        }}
      >
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold" color="primary.main">
              {booking.reference}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 20,
              height: 20,
              borderRadius: '50%',
              bgcolor: showDetails ? 'primary.main' : 'grey.300',
              color: showDetails ? 'white' : 'text.secondary',
              transition: 'all 0.2s ease-in-out'
            }}>
              {showDetails ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2">
            {getTravelerNames()}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight="medium">
            {getRoute()}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight="bold" color="primary.main">
            {getPrice()}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip 
            label={booking.status || 'N/A'} 
            color={getStatusColor(booking.status)}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </TableCell>
        <TableCell>
          <Chip 
            label={booking.ticketingStatus || 'N/A'} 
            color={getTicketingColor(booking.ticketingStatus)}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </TableCell>
        <TableCell>
          <Chip 
            label={getPnrTypeLabel(booking.pnrType)} 
            color="primary"
            size="small"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
            {booking.lastFetchedAt ? new Date(booking.lastFetchedAt).toLocaleString() : 'N/A'}
          </Typography>
        </TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title="Refresh from Amadeus">
              <IconButton 
                size="small" 
                color="primary"
                onClick={() => onRefresh(booking.reference)}
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'primary.50',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mark Complete">
              <IconButton 
                size="small" 
                color="success"
                onClick={() => onAction(booking.reference, 'COMPLETE')}
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'success.50',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <CheckCircle fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Note">
              <IconButton 
                size="small" 
                color="info"
                onClick={handleAddNote}
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'info.50',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <NoteAdd fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Loss Details">
              <IconButton 
                size="small" 
                color="warning"
                onClick={handleEditLossDetails}
                sx={{ 
                  '&:hover': { 
                    bgcolor: 'warning.50',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
      
      {showDetails && (
        <TableRow>
          <TableCell colSpan={9} sx={{ p: 0, border: 0 }}>
            <Box sx={{ 
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #1976d2, #42a5f5, #90caf9)',
                borderRadius: '2px 2px 0 0'
              }
            }}>
              {/* Expanded Row Header */}
              <Paper 
                elevation={0} 
                sx={{ 
                  mx: 2, 
                  mb: 2, 
                  mt: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'background.paper'
                }}
              >
                <Box sx={{ 
                  p: 2.5, 
                  bgcolor: 'primary.50',
                  borderBottom: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6" fontWeight={600} color="primary.main">
                        📋 Booking Details
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reference: {booking.reference} • {getTravelerNames()} • {getRoute()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={booking.status || 'N/A'} 
                        color={getStatusColor(booking.status)}
                        size="small"
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip 
                        label={booking.ticketingStatus || 'N/A'} 
                        color={getTicketingColor(booking.ticketingStatus)}
                        size="small"
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Box>
                </Box>
                
                {/* Quick Summary Cards */}
                <Box sx={{ p: 2.5, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ 
                      textAlign: 'center', 
                      p: 1.5, 
                      bgcolor: 'white',
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      minWidth: 120
                    }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Total Price
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="primary.main">
                        {getPrice()}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      textAlign: 'center', 
                      p: 1.5, 
                      bgcolor: 'white',
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      minWidth: 120
                    }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        PNR Type
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="text.primary">
                        {getPnrTypeLabel(booking.pnrType)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      textAlign: 'center', 
                      p: 1.5, 
                      bgcolor: 'white',
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: 'divider',
                      minWidth: 120
                    }}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Last Updated
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="text.primary">
                        {booking.lastFetchedAt ? new Date(booking.lastFetchedAt).toLocaleDateString() : 'N/A'}
                      </Typography>
                    </Box>
                    
                    {booking.department && (
                      <Box sx={{ 
                        textAlign: 'center', 
                        p: 1.5, 
                        bgcolor: 'white',
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        minWidth: 120
                      }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Department
                        </Typography>
                        <Typography variant="body1" fontWeight={600} color="secondary.main">
                          {booking.department}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
              
              {/* Detailed Information */}
              <Box sx={{ mx: 2, mb: 2 }}>
                <BookingDetails booking={booking} />
              </Box>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default BookingRow;
