
import React from 'react'
import Link from 'next/link'
import { Box, Grid, Paper, Typography, Stack, Chip, Divider, Button, IconButton, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'

export default function OfflineBookingPage({ params }) {
  const booking = {
        "id": 70,
        "tenant_user_id": 7,
        "booking_date": "2025-08-23T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Abul Kalam Mohammad",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Boudl Al Munsiyah Hotel",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-24T00:00:00.000000Z",
        "check_out_date": "2025-08-28T00:00:00.000000Z",
        "number_of_nights": 4,
        "meal": "BB",
        "original_net": "1673.84",
        "hcn": "349904064",
        "category": "Junior Suite",
        "pax": 1,
        "net_cost": "1673.84",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1880.00",
        "profit": "206.16",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086811",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016125101",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-23T13:38:06.000000Z",
        "updated_at": "2025-08-23T13:38:06.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    }

  const { id } = params

  const formatDate = (iso) => {
    if (!iso) return 'N/A'
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  }
  const currencyFormat = (v, c = 'SAR') => {
    if (v === null || v === undefined || v === '') return 'N/A'
    const num = Number(v)
    if (Number.isNaN(num)) return String(v)
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: c }).format(num)
  }

  const isHotel = String(booking.service || '').toLowerCase() === 'hotel'
  const getStatusChip = () => {
    const today = new Date()
    const checkIn = booking.check_in_date ? new Date(booking.check_in_date) : null
    if (!checkIn) return null
    if (checkIn < new Date(today.toDateString())) return <Chip size="small" color="error" label="Completed" />
    if (checkIn.toDateString() === today.toDateString()) return <Chip size="small" color="warning" label="Today" />
    return <Chip size="small" color="success" label="Upcoming" />
  }

  const KeyValue = ({ label, children }) => (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.75, borderBottom: '1px dashed', borderColor: 'divider' }}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ ml: 2, textAlign: 'right' }}>{children || 'N/A'}</Typography>
    </Stack>
  )

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={600}>Booking Details</Typography>
          <Typography variant="body2" color="text.secondary">View offline booking information</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Link href="/offline-bookings" passHref legacyBehavior>
            <Button variant="outlined">Back To List</Button>
          </Link>
          <Link href={`/offline-bookings/create`} passHref legacyBehavior>
            <Button variant="contained" color="primary">Edit Booking</Button>
          </Link>
        </Stack>
      </Box>

      <Grid container spacing={2} alignItems="stretch" sx={{ flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }} >
        {/* Basic Information */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }} >
          <Paper sx={{ p: 2, height: '100%', width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <InfoOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Basic Information</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={0.5}>
              <KeyValue label="Booking Date">{formatDate(booking.booking_date)}</KeyValue>
              <KeyValue label="Guest Name">{booking.guest_name}</KeyValue>
              <KeyValue label="Client Type">{booking.client_type}</KeyValue>
              <KeyValue label="Sender">{booking.sender}</KeyValue>
              <KeyValue label="Account">{booking.account}</KeyValue>
              <KeyValue label="CTA">{booking.cta}</KeyValue>
              <KeyValue label="LPO">{booking.lpo}</KeyValue>
              <KeyValue label="Destination">{booking.destination}</KeyValue>
            </Stack>
          </Paper>
        </Grid>

        {/* Agent Information */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, height: '100%', width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <PersonOutlineOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Agent Information</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Agent Name</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">{booking.tenant_user?.name || 'N/A'}</Typography>
                
                </Stack>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Agent Email</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">{booking.tenant_user?.email || 'N/A'}</Typography>
                   
                </Stack>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Email Attachment</Typography>
                <Typography variant="body2">{booking.email_attachment ? 'Yes' : 'No'}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Service Information */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, height: '100%', width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <RoomServiceOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Service Information</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={0.5}>
              <KeyValue label="Destination">{booking.destination}</KeyValue>
              <KeyValue label="Hotel Name">{isHotel ? booking.hotel_name : 'N/A'}</KeyValue>
              <KeyValue label="Reservation Type">{booking.reservation_type}</KeyValue>
              <KeyValue label="Service Type">{booking.service}</KeyValue>
              <KeyValue label="Category">{booking.category}</KeyValue>
              <KeyValue label="Passengers">{booking.pax}</KeyValue>
              <KeyValue label="Check-in Date">{isHotel ? formatDate(booking.check_in_date) : 'N/A'}</KeyValue>
              <KeyValue label="Check-out Date">{isHotel ? formatDate(booking.check_out_date) : 'N/A'}</KeyValue>
              <KeyValue label="Nights">{isHotel ? booking.number_of_nights : 'N/A'}</KeyValue>
              <KeyValue label="Meal Plan">{booking.meal}</KeyValue>
              <KeyValue label="Original Net">{currencyFormat(booking.original_net, booking.currency_to || 'SAR')}</KeyValue>
              <KeyValue label="HCN">{isHotel ? booking.hcn : 'N/A'}</KeyValue>
            </Stack>
          </Paper>
        </Grid>

        {/* Image Attachments */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160 }}>
            <Stack alignItems="center" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ImageOutlinedIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight={600}>Image Attachments (0)</Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">No images attached</Typography>
            </Stack>
          </Paper>
        </Grid>

        {/* Financial Information */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, height: '100%', width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <PaidOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Financial Information</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={0.5}>
              <KeyValue label="Net Cost">{currencyFormat(booking.net_cost, booking.currency_to || 'SAR')}</KeyValue>
              <KeyValue label="Selling Price">{currencyFormat(booking.selling_price, booking.currency_to || 'SAR')}</KeyValue>
              <KeyValue label="Profit">{currencyFormat(booking.profit, booking.currency_to || 'SAR')}</KeyValue>
              <KeyValue label="Conversion Rate">{booking.currency_from} — {booking.currency_to}: {booking.conversion_rate}</KeyValue>
              <KeyValue label="Payment Method">{booking.payment}</KeyValue>
              <KeyValue label="Supplier">{booking.supplier || booking.offline_supplier_name}</KeyValue>
            </Stack>
          </Paper>
        </Grid>

        {/* Reference Information */}
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, height: '100%', width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <ReceiptLongOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Reference Information</Typography>
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={0.5}>
              <KeyValue label="Reference">{booking.reference}</KeyValue>
              <KeyValue label="Ticket Number">{booking.ticket_number}</KeyValue>
              <KeyValue label="TRAACS Number">{booking.traacs_number}</KeyValue>
              <KeyValue label="VAT Invoice">{booking.vat_invoice}</KeyValue>
              <KeyValue label="VCC Details">{booking.vcc_details}</KeyValue>
              <KeyValue label="HCN">{isHotel ? booking.hcn : 'N/A'}</KeyValue>
              <KeyValue label="Zoho Link">{booking.zoho_link ? (
                <Link href={booking.zoho_link} target="_blank" rel="noopener noreferrer">
                    <Button size="small" variant="outlined" endIcon={<OpenInNewOutlinedIcon />} >Open</Button>
                </Link>
                ) : 'N/A'}</KeyValue>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}