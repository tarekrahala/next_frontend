import React from 'react';
import { Box, Grid, Typography, Paper, Chip, Divider, Stack } from '@mui/material';
import DashboardCard from '../../app/components/shared/DashboardCard';

const BookingDetails = ({ booking }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const formatPrice = (price, currency) => {
    if (!price || !currency) return 'N/A';
    return `${currency} ${price}`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {/* Flight Information */}
        <Grid item xs={12} lg={8}>
          <DashboardCard 
            title="✈️ Flight Information"
            subtitle="Flight offers and itinerary details"
          >
            {booking.flightOffers && booking.flightOffers.length > 0 ? (
              <Stack spacing={3}>
                {booking.flightOffers.map((offer, index) => (
                  <Paper key={offer.id || index} elevation={0} sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    {/* Offer Header */}
                    <Box sx={{ 
                      p: 2.5, 
                      bgcolor: 'background.default',
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight={600}>
                          Offer {index + 1}
                        </Typography>
                        <Chip 
                          label={offer.source || 'N/A'} 
                          color="primary" 
                          size="small" 
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      </Box>
                    </Box>
                    
                    {/* Offer Details */}
                    <Box sx={{ p: 2.5 }}>
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={4}>
                          <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Last Ticketing
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                              {formatDate(offer.lastTicketingDate)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Validating Airlines
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                              {offer.validatingAirlineCodes?.join(', ') || 'N/A'}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Total Price
                            </Typography>
                            <Typography variant="body2" fontWeight={600} color="primary.main">
                              {formatPrice(offer.price?.total, offer.price?.currency)}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      
                      {/* Itineraries */}
                      {offer.itineraries && offer.itineraries.map((itinerary, itinIndex) => (
                        <Box key={itinIndex} sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" sx={{ 
                            mb: 2, 
                            fontWeight: 600,
                            color: 'text.primary',
                            pb: 1,
                            borderBottom: '2px solid',
                            borderColor: 'primary.main'
                          }}>
                            Itinerary {itinIndex + 1}
                          </Typography>
                          
                          <Stack spacing={2}>
                            {itinerary.segments && itinerary.segments.map((segment, segIndex) => (
                              <Paper key={segment.id || segIndex} elevation={0} sx={{ 
                                border: '1px solid', 
                                borderColor: 'divider',
                                borderRadius: 2,
                                overflow: 'hidden'
                              }}>
                                {/* Segment Header */}
                                <Box sx={{ 
                                  p: 2, 
                                  bgcolor: 'primary.50',
                                  borderBottom: '1px solid',
                                  borderColor: 'divider'
                                }}>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" fontWeight={600} color="primary.main">
                                      {segment.departure?.iataCode} → {segment.arrival?.iataCode}
                                    </Typography>
                                    <Chip 
                                      label={`${segment.carrierCode}${segment.number}`}
                                      color="primary" 
                                      size="small" 
                                      variant="filled"
                                      sx={{ fontWeight: 600 }}
                                    />
                                  </Box>
                                </Box>
                                
                                {/* Segment Details */}
                                <Box sx={{ p: 2 }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                      <Box sx={{ mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                          Departure
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                          {formatDate(segment.departure?.at)}
                                          {segment.departure?.terminal && (
                                            <Chip 
                                              label={`T${segment.departure.terminal}`} 
                                              size="small" 
                                              variant="outlined" 
                                              sx={{ ml: 1 }}
                                            />
                                          )}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Box sx={{ mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                          Arrival
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                          {formatDate(segment.arrival?.at)}
                                          {segment.arrival?.terminal && (
                                            <Chip 
                                              label={`T${segment.arrival.terminal}`} 
                                              size="small" 
                                              variant="outlined" 
                                              sx={{ ml: 1 }}
                                            />
                                          )}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                      <Box sx={{ mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                          Aircraft
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                          {segment.aircraft?.code || 'N/A'}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                      <Box sx={{ mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                          Status
                                        </Typography>
                                        <Chip 
                                          label={segment.bookingStatus || 'N/A'}
                                          size="small"
                                          color="default"
                                          variant="outlined"
                                        />
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                      <Box sx={{ mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                          Stops
                                        </Typography>
                                        <Typography variant="body2" fontWeight={500}>
                                          {segment.numberOfStops || 0}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Paper>
                            ))}
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No flight information available
                </Typography>
              </Box>
            )}
          </DashboardCard>
        </Grid>

        {/* Right Sidebar - Travelers, Tickets, Contacts */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={4}>
            {/* Travelers */}
            <DashboardCard 
              title="👥 Travelers"
              subtitle="Passenger information"
            >
              {booking.travelers && booking.travelers.length > 0 ? (
                <Stack spacing={2}>
                  {booking.travelers.map((traveler) => (
                    <Paper key={traveler.id} elevation={0} sx={{ 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'success.50',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                      }}>
                        <Typography variant="subtitle1" fontWeight={600} color="success.main">
                          {traveler.name?.firstName || ''} {traveler.name?.lastName || ''}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ p: 2 }}>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Date of Birth
                              </Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {traveler.dateOfBirth || 'N/A'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Gender
                              </Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {traveler.gender || 'N/A'}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        
                        {traveler.documents && traveler.documents.length > 0 && (
                          <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600, color: 'text.primary' }}>
                              Documents
                            </Typography>
                            <Stack spacing={1.5}>
                              {traveler.documents.map((doc, index) => (
                                <Paper key={index} elevation={0} sx={{ 
                                  p: 1.5, 
                                  bgcolor: 'grey.50',
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  borderRadius: 1
                                }}>
                                  <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                      <Typography variant="body2" fontWeight={500} color="primary.main">
                                        {doc.documentType}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Number
                                      </Typography>
                                      <Typography variant="body2" fontWeight={500}>
                                        {doc.number}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" color="text.secondary">
                                        Expires
                                      </Typography>
                                      <Typography variant="body2" fontWeight={500}>
                                        {formatDate(doc.expiryDate)}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Paper>
                              ))}
                            </Stack>
                          </Box>
                        )}
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No traveler information available
                  </Typography>
                </Box>
              )}
            </DashboardCard>

            {/* Tickets */}
            {booking.tickets && booking.tickets.length > 0 && (
              <DashboardCard 
                title="🎫 Tickets"
                subtitle="Ticket information"
              >
                <Stack spacing={2}>
                  {booking.tickets.map((ticket, index) => (
                    <Paper key={index} elevation={0} sx={{ 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'warning.50',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                      }}>
                        <Typography variant="subtitle1" fontWeight={600} color="warning.main">
                          Ticket {index + 1}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ p: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Type
                              </Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {ticket.documentType || 'N/A'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Status
                              </Typography>
                              <Chip 
                                label={ticket.documentStatus || 'N/A'}
                                size="small"
                                color="default"
                                variant="outlined"
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Number
                              </Typography>
                              <Typography variant="body2" fontWeight={500} fontFamily="monospace">
                                {ticket.documentNumber || 'N/A'}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </DashboardCard>
            )}

            {/* Contacts */}
            {booking.contacts && booking.contacts.length > 0 && (
              <DashboardCard 
                title="📞 Contacts"
                subtitle="Contact information"
              >
                <Stack spacing={2}>
                  {booking.contacts.map((contact, index) => (
                    <Paper key={index} elevation={0} sx={{ 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{ 
                        p: 2, 
                        bgcolor: 'info.50',
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                      }}>
                        <Typography variant="subtitle1" fontWeight={600} color="info.main">
                          {contact.purpose || 'Contact'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ p: 2 }}>
                        {contact.emailAddress && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Email
                            </Typography>
                            <Typography variant="body2" fontWeight={500} color="primary.main">
                              {contact.emailAddress}
                            </Typography>
                          </Box>
                        )}
                        
                        {contact.phones && contact.phones.length > 0 && (
                          <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                              Phone Numbers
                            </Typography>
                            <Stack spacing={1}>
                              {contact.phones.map((phone, phoneIndex) => (
                                <Box key={phoneIndex} sx={{ 
                                  p: 1.5, 
                                  bgcolor: 'grey.50',
                                  borderRadius: 1,
                                  border: '1px solid',
                                  borderColor: 'divider'
                                }}>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    {phone.deviceType}
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500}>
                                    {phone.number}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </Box>
                        )}
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </DashboardCard>
            )}
          </Stack>
        </Grid>

        {/* Bottom Row - Operational Details, Notes, Remarks */}
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {/* Operational Information */}
            <Grid item xs={12} md={6}>
              <DashboardCard 
                title="⚙️ Operational Details"
                subtitle="Business and operational information"
              >
                <Paper elevation={0} sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'secondary.50',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="subtitle1" fontWeight={600} color="secondary.main">
                      Business Information
                    </Typography>
                  </Box>
                  
                  <Box sx={{ p: 2.5 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Department
                          </Typography>
                          <Typography variant="body1" fontWeight={600} color="primary.main">
                            {booking.department || 'Not assigned'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Processed By
                          </Typography>
                          <Typography variant="body1" fontWeight={600} color="primary.main">
                            {booking.doneBy || 'Not assigned'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Loss Amount
                          </Typography>
                          <Typography variant="body1" fontWeight={600} color="error.main">
                            {booking.lossAmount || 0}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            PNR Type
                          </Typography>
                          <Chip 
                            label={booking.pnrType || 'N/A'}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Created
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {formatDate(booking.createdAt)}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Last Updated
                          </Typography>
                          <Typography variant="body2" fontWeight={500}>
                            {formatDate(booking.updatedAt)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </DashboardCard>
            </Grid>

            {/* Notes */}
            <Grid item xs={12} md={6}>
              <DashboardCard 
                title="📝 Notes"
                subtitle="Additional notes and comments"
              >
                <Paper elevation={0} sx={{ 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'warning.50',
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="subtitle1" fontWeight={600} color="warning.main">
                      Notes Content
                    </Typography>
                  </Box>
                  
                  <Box sx={{ p: 2.5 }}>
                    {booking.notes ? (
                      <Typography 
                        variant="body2" 
                        component="pre" 
                        sx={{ 
                          fontFamily: 'monospace', 
                          whiteSpace: 'pre-wrap', 
                          margin: 0,
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: 'text.primary'
                        }}
                      >
                        {booking.notes}
                      </Typography>
                    ) : (
                      <Box sx={{ textAlign: 'center', py: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          No notes available
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </DashboardCard>
            </Grid>

            {/* Remarks */}
            {booking.remarks && (
              <Grid item xs={12}>
                <DashboardCard 
                  title="💬 Remarks"
                  subtitle="General and airline-specific remarks"
                >
                  <Paper elevation={0} sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: 'info.50',
                      borderBottom: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Typography variant="subtitle1" fontWeight={600} color="info.main">
                        Remarks & Comments
                      </Typography>
                    </Box>
                    
                    <Box sx={{ p: 2.5 }}>
                      <Grid container spacing={3}>
                        {booking.remarks.general && booking.remarks.general.length > 0 && (
                          <Grid item xs={12} md={6}>
                            <Box sx={{ 
                              p: 2, 
                              bgcolor: 'grey.50',
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: 'divider'
                            }}>
                              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                                General Remarks
                              </Typography>
                              <Stack spacing={1.5}>
                                {booking.remarks.general.map((remark, index) => (
                                  <Box key={index} sx={{ 
                                    p: 1.5, 
                                    bgcolor: 'white',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider'
                                  }}>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                      {remark.subType}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500}>
                                      {remark.text}
                                    </Typography>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          </Grid>
                        )}
                        {booking.remarks.airline && booking.remarks.airline.length > 0 && (
                          <Grid item xs={12} md={6}>
                            <Box sx={{ 
                              p: 2, 
                              bgcolor: 'grey.50',
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: 'divider'
                            }}>
                              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                                Airline Remarks
                              </Typography>
                              <Stack spacing={1.5}>
                                {booking.remarks.airline.map((remark, index) => (
                                  <Box key={index} sx={{ 
                                    p: 1.5, 
                                    bgcolor: 'white',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: 'divider'
                                  }}>
                                    <Typography variant="caption" color="text.secondary" display="block">
                                      {remark.airlineCode}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500}>
                                      {remark.text}
                                    </Typography>
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Paper>
                </DashboardCard>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingDetails;
