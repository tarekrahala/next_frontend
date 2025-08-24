"use client"

import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Chip
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Autocomplete from '@mui/material/Autocomplete'
import moment from 'moment'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
 
const CreateOfflineBooking = () => {
  const [formData, setFormData] = useState({
    booking_date: null,
    sender: '',
    account: '',
    cta: '',
    lpo: '',
    guest_name: '',
    client_type: '',
    destination: '',
    hotel_name: '',
    reservation_type: '',
    service: '',
    check_in_date: null,
    check_out_date: null,
    category: '',
    pax: '',
    net_cost: '',
    currency_from: '',
    currency_to: '',
    conversion_rate: '',
    selling_price: '',
    profit: '',
    supplier: '',
    offline_supplier_name: '',
    payment: '',
    reference: '',
    ticket_number: '',
    traacs_number: '',
    zoho_link: '',
    vat_invoice: '',
    remarks: '',
    email_attachment: false,
  })

  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({
    services: ['Hotel', 'Flight', 'BUS'],
    suppliers: ['Amadeus', 'TBO', 'Lemonde', 'Hotel Direct', 'Offline Supplier'],
    payments: ['Credit', 'Bank Transfer', 'Amadues', 'New NCB'],
    currencies: ['SAR', 'USD', 'EUR', 'GBP', 'CHF'],
    reservation_types: ['online', 'offline'],
    client_types: ['NORMAL', 'VIP'],
  })
  const [images, setImages] = useState([])
  const [uploadingImage, setUploadingImage] = useState(false)

  const senderAccountList = [
    { sender: 'Sanjid', account: 'icad' },
    { sender: 'Akheel', account: 'Mr. Al Fattah –MBL Projects Follow-Up' },
    { sender: 'Akheel', account: 'Swalac' },
    { sender: 'Akheel', account: 'Mr. Al Fattah – Personal' },
    { sender: 'Amal', account: 'Scaramouch' },
    { sender: 'Hanin', account: 'MBL' },
    { sender: 'Minhaj', account: 'First Fix' },
    { sender: 'Mohannad', account: 'MBL' },
    { sender: 'Mohammed Khalid', account: 'MBL' },
    { sender: 'Mohammed Sabsabeh', account: 'ACCL' },
    { sender: 'Murki', account: 'MBL' },
    { sender: 'Naufal', account: 'Baumat' },
    { sender: 'Rijas', account: 'MSB' },
    { sender: 'Usman Malik', account: 'ACCL' },
    { sender: 'Waad', account: 'IFAS' },
    { sender: 'Junidullah', account: 'ICAD' },
    { sender: 'Jean Ventura', account: 'ICAD' },
    { sender: 'Samaher', account: 'MBL' },
    { sender: 'Ilyas', account: 'MBL' },
    { sender: 'Mona', account: 'First Fix' },
    { sender: 'Malik Shajiuddin', account: 'MBL' },
    { sender: 'Ashiq', account: 'MSB' },
    { sender: 'Aldeshir', account: 'MBL' },
    { sender: 'Megrin', account: 'MBL' },
    { sender: 'Yahia Asiri', account: 'Power Support' },
    { sender: 'CEO', account: '' },
  ]

  const senderOptions = useMemo(() => {
    const unique = Array.from(new Set(senderAccountList.map(s => s.sender)))
    return unique
  }, [])

  const [accountOptions, setAccountOptions] = useState([])
  const [isAccountReadOnly, setIsAccountReadOnly] = useState(false)

  useEffect(() => {
    if (!formData.sender) {
      setAccountOptions([])
      setIsAccountReadOnly(false)
      setFormData(prev => ({ ...prev, account: '' }))
      return
    }
    const matches = senderAccountList.filter(item => item.sender === formData.sender)
    if (formData.sender === 'CEO') {
      setAccountOptions([])
      setIsAccountReadOnly(false)
      setFormData(prev => ({ ...prev, account: '' }))
    } else if (matches.length === 0) {
      setAccountOptions([])
      setIsAccountReadOnly(false)
      setFormData(prev => ({ ...prev, account: '' }))
    } else if (matches.length === 1) {
      setAccountOptions([matches[0].account])
      setIsAccountReadOnly(true)
      setFormData(prev => ({ ...prev, account: matches[0].account }))
    } else {
      setAccountOptions(matches.map(m => m.account))
      setIsAccountReadOnly(false)
      setFormData(prev => ({ ...prev, account: matches[0].account }))
    }
  }, [formData.sender])

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'net_cost' || name === 'selling_price') {
      const netCost = parseFloat(name === 'net_cost' ? value : prevOr(formData.net_cost)) || 0
      const sellingPrice = parseFloat(name === 'selling_price' ? value : prevOr(formData.selling_price)) || 0
      const profit = sellingPrice - netCost
      setFormData(prev => ({ ...prev, profit: profit.toFixed(2) }))
    }
  }

  const prevOr = (v) => (v === null || v === undefined ? '' : v)

  const handleFilePick = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(true)
    try {
      const tempImage = {
        id: Date.now(),
        file,
        file_name: file.name,
        url: URL.createObjectURL(file),
        isTemp: true
      }
      setImages(prev => [...prev, tempImage])
    } finally {
      setUploadingImage(false)
    }
  }

  const handleRemoveImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // TODO: integrate with backend create endpoint
      // For now, just log payload
      const payload = {
        ...formData,
        booking_date: formData.booking_date ? moment(formData.booking_date).toISOString() : null,
        check_in_date: formData.check_in_date ? moment(formData.check_in_date).toISOString() : null,
        check_out_date: formData.check_out_date ? moment(formData.check_out_date).toISOString() : null,
      }
      console.log('Create offline booking payload', payload, images)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Card>
        <CardContent>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" fontWeight={600}>New Offline Booking</Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <InfoOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Basic Information</Typography>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Booking Date"
                    value={formData.booking_date}
                    onChange={(v) => handleInputChange('booking_date', v)}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={6} style={{ width: '20%' }}>
                <Autocomplete
                  freeSolo
                  options={senderOptions}
                  value={formData.sender}
                  onChange={(e, v) => handleInputChange('sender', v || '')}
                  onInputChange={(e, v) => handleInputChange('sender', v || '')}
                  renderInput={(params) => (
                    <TextField {...params} label="Sender" placeholder="Person name from corporate" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ width: '25%' }}>
                {accountOptions.length > 1 ? (
                  <FormControl fullWidth>
                    <InputLabel>Account</InputLabel>
                    <Select
                      label="Account"
                      value={formData.account}
                      onChange={(e) => handleInputChange('account', e.target.value)}
                    >
                      {accountOptions.map((acc) => (
                        <MenuItem key={acc} value={acc}>{acc}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label="Account"
                    value={formData.account}
                    onChange={(e) => handleInputChange('account', e.target.value)}
                    InputProps={{ readOnly: isAccountReadOnly }}
                    fullWidth
                  />
                )}
              </Grid>

              <Grid item xs={12} md={6} style={{ width: '30%' }}>
                <TextField label="CTA" value={formData.cta} onChange={(e) => handleInputChange('cta', e.target.value)} fullWidth multiline minRows={2} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="LPO" value={formData.lpo} onChange={(e) => handleInputChange('lpo', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Guest Name" value={formData.guest_name} onChange={(e) => handleInputChange('guest_name', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={6} style={{ width: '20%' }}>
                <FormControl fullWidth>
                  <InputLabel>Client Type</InputLabel>
                  <Select label="Client Type" value={formData.client_type} onChange={(e) => handleInputChange('client_type', e.target.value)}>
                    {options.client_types.map((t) => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider />
            <Stack direction="row" alignItems="center" spacing={1}>
              <RoomServiceOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Service Information</Typography>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField label="Destination" value={formData.destination} onChange={(e) => handleInputChange('destination', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Hotel Name" value={formData.hotel_name} onChange={(e) => handleInputChange('hotel_name', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={6} style={{ width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel>Reservation Type</InputLabel>
                  <Select label="Reservation Type" value={formData.reservation_type} onChange={(e) => handleInputChange('reservation_type', e.target.value)}>
                    {options.reservation_types.map((t) => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} style={{ width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel>Service Type</InputLabel>
                  <Select label="Service Type" value={formData.service} onChange={(e) => handleInputChange('service', e.target.value)}>
                    {options.services.map((t) => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Category" value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Number of Passengers" type="number" value={formData.pax} onChange={(e) => handleInputChange('pax', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker label="Check-in Date" value={formData.check_in_date} onChange={(v) => handleInputChange('check_in_date', v)} format="YYYY-MM-DD" />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker label="Check-out Date" value={formData.check_out_date} onChange={(v) => handleInputChange('check_out_date', v)} format="YYYY-MM-DD" />
                </LocalizationProvider>
              </Grid>
            </Grid>

            <Divider />
            <Stack direction="row" alignItems="center" spacing={1}>
              <PaidOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Financial Information</Typography>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField label="Net Cost" type="number" value={formData.net_cost} onChange={(e) => handleInputChange('net_cost', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4} style={{ width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel>Currency From</InputLabel>
                  <Select label="Currency From" value={formData.currency_from} onChange={(e) => handleInputChange('currency_from', e.target.value)}>
                    {options.currencies.map((c) => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} style={{ width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel>Currency To</InputLabel>
                  <Select label="Currency To" value={formData.currency_to} onChange={(e) => handleInputChange('currency_to', e.target.value)}>
                    {options.currencies.map((c) => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Conversion Rate" type="number" value={formData.conversion_rate} onChange={(e) => handleInputChange('conversion_rate', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Selling Price" type="number" value={formData.selling_price} onChange={(e) => handleInputChange('selling_price', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField label="Profit (Auto)" type="number" value={formData.profit} InputProps={{ readOnly: true }} fullWidth />
              </Grid>
              <Grid item xs={12} md={4} style={{ width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select label="Payment Method" value={formData.payment} onChange={(e) => handleInputChange('payment', e.target.value)}>
                    {options.payments.map((p) => (
                      <MenuItem key={p} value={p}>{p}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} style={{ width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel>Supplier</InputLabel>
                  <Select label="Supplier" value={formData.supplier} onChange={(e) => handleInputChange('supplier', e.target.value)}>
                    {options.suppliers.map((s) => (
                      <MenuItem key={s} value={s}>{s}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {formData.supplier === 'Offline Supplier' && (
                <Grid item xs={12} md={6}>
                  <TextField label="Offline Supplier Name" value={formData.offline_supplier_name} onChange={(e) => handleInputChange('offline_supplier_name', e.target.value)} fullWidth />
                </Grid>
              )}
            </Grid>

            <Divider />
            <Stack direction="row" alignItems="center" spacing={1}>
              <ReceiptLongOutlinedIcon fontSize="small" />
              <Typography variant="subtitle1" fontWeight={600}>Reference Information</Typography>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField label="Reference" value={formData.reference} onChange={(e) => handleInputChange('reference', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="Ticket Number" value={formData.ticket_number} onChange={(e) => handleInputChange('ticket_number', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField label="TRAACS Number" value={formData.traacs_number} onChange={(e) => handleInputChange('traacs_number', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={6} style={{ width: '30%' }}>
                <TextField label="Zoho Link" value={formData.zoho_link} onChange={(e) => handleInputChange('zoho_link', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="VAT Invoice" value={formData.vat_invoice} onChange={(e) => handleInputChange('vat_invoice', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={formData.email_attachment} onChange={(e) => handleInputChange('email_attachment', e.target.checked)} />}
                  label="Email Attachment"
                />
              </Grid>
            </Grid>

            <Divider />

            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label" disabled={uploadingImage}>
                  {uploadingImage ? 'Uploading...' : 'Upload Image'}
                  <input type="file" accept="image/*" hidden onChange={handleFilePick} />
                </Button>
                {images.length > 0 && (
                  <Chip label={`${images.length} image(s)`} />
                )}
              </Stack>
              {images.length > 0 && (
                <Grid container spacing={2}>
                  {images.map((image) => (
                    <Grid item key={image.id} xs={6} md={3}>
                      <Box sx={{ position: 'relative', border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                        <img src={image.url} alt={image.file_name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                      </Box>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={0.5}>
                        <Typography variant="caption" color="text.secondary" noWrap>{image.file_name}</Typography>
                        <Button color="error" size="small" onClick={() => handleRemoveImage(image.id)}>Remove</Button>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Stack>

            <TextField label="Remarks" value={formData.remarks} onChange={(e) => handleInputChange('remarks', e.target.value)} fullWidth multiline minRows={3} />

            <Stack direction="row" justifyContent="flex-end" spacing={2} pt={2}>
              <Button variant="outlined" onClick={() => history.back()} disabled={loading}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? 'Saving...' : 'Create Booking'}</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CreateOfflineBooking