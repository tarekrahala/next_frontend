"use client"

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import { useRouter } from 'next/navigation'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import OutlinedInput from '@mui/material/OutlinedInput'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import toast from 'react-hot-toast'

export default function CreateTenantPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    domain: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    type: 'corporate',
    status: 'active',
    timezone: '',
    currency: 'USD',
    language: 'en',
    bh_start: '',
    bh_end: '',
    bh_timezone: '',
    maxBudget: '',
    requireApproval: false,
    allowedDestinations: [],
    restrictedDestinations: [],
  })

  const handleText = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
  const handleSelect = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
  const handleMulti = (key) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [key]: Array.isArray(value) ? value : value.split(',') }))
  }
  const handleCheckbox = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.checked }))

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setPending(true)
    try {
      if (!form.name || !form.domain || !form.email) {
        setErrorMsg('Name, domain and email are required')
        setPending(false)
        return
      }
      const body = {
        name: form.name,
        domain: form.domain,
        companyName: form.companyName,
        contactPerson: form.contactPerson,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        country: form.country,
        postalCode: form.postalCode,
        type: form.type,
        status: form.status,
        settings: {
          timezone: form.timezone,
          currency: form.currency,
          language: form.language,
          businessHours: {
            start: form.bh_start,
            end: form.bh_end,
            timezone: form.bh_timezone,
          },
          travelPolicy: {
            maxBudget: Number(form.maxBudget || 0),
            requireApproval: form.requireApproval,
            allowedDestinations: form.allowedDestinations,
            restrictedDestinations: form.restrictedDestinations,
          },
        },
      }

      const res = await fetch(`http://localhost:3000/api/admin/tenants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message || 'Failed to create tenant')
      }
      toast.success('Tenant created')
      router.replace('/tenants')
    } catch (err) {
      setErrorMsg(err.message || 'Unexpected error creating tenant')
      toast.error('Failed to create tenant')
    } finally {
      setPending(false)
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight={700}>Create Tenant</Typography>
      </Stack>
      <Divider />

      {errorMsg ? (
        <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>
      ) : null}

      <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Box component={Paper} variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" mb={2}>Basic Info</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
                  <CustomTextField id="name" name="name" fullWidth required placeholder="Example Corporation" value={form.name} onChange={handleText('name')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="domain">Domain</CustomFormLabel>
                  <CustomTextField id="domain" name="domain" fullWidth required placeholder="example.com" value={form.domain} onChange={handleText('domain')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="companyName">Company Name</CustomFormLabel>
                  <CustomTextField id="companyName" name="companyName" fullWidth placeholder="Example Corporation Ltd" value={form.companyName} onChange={handleText('companyName')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="contactPerson">Contact Person</CustomFormLabel>
                  <CustomTextField id="contactPerson" name="contactPerson" fullWidth placeholder="John Doe" value={form.contactPerson} onChange={handleText('contactPerson')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                  <CustomTextField id="email" name="email" type="email" fullWidth required placeholder="contact@example.com" value={form.email} onChange={handleText('email')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="phone">Phone</CustomFormLabel>
                  <CustomTextField id="phone" name="phone" fullWidth placeholder="+1234567890" value={form.phone} onChange={handleText('phone')} />
                </Grid>
              </Grid>
            </Box>

            <Box component={Paper} variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Address</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="address">Address</CustomFormLabel>
                  <CustomTextField id="address" name="address" fullWidth placeholder="123 Business Street" value={form.address} onChange={handleText('address')} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel htmlFor="city">City</CustomFormLabel>
                  <CustomTextField id="city" name="city" fullWidth placeholder="New York" value={form.city} onChange={handleText('city')} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel htmlFor="country">Country</CustomFormLabel>
                  <CustomTextField id="country" name="country" fullWidth placeholder="USA" value={form.country} onChange={handleText('country')} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel htmlFor="postalCode">Postal Code</CustomFormLabel>
                  <CustomTextField id="postalCode" name="postalCode" fullWidth placeholder="10001" value={form.postalCode} onChange={handleText('postalCode')} />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box component={Paper} variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" mb={2}>Classification</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="type">Type</CustomFormLabel>
                  <CustomTextField id="type" name="type" fullWidth placeholder="corporate" value={form.type} onChange={handleText('type')} />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="status">Status</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select id="status" name="status" value={form.status} onChange={handleSelect('status')}>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Box component={Paper} variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" mb={2}>Settings</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="timezone">Timezone</CustomFormLabel>
                  <CustomTextField id="timezone" name="timezone" fullWidth placeholder="America/New_York" value={form.timezone} onChange={handleText('timezone')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="currency">Currency</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select id="currency" name="currency" value={form.currency} onChange={handleSelect('currency')}>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                      <MenuItem value="GBP">GBP</MenuItem>
                      <MenuItem value="SAR">SAR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="language">Language</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select id="language" name="language" value={form.language} onChange={handleSelect('language')}>
                      <MenuItem value="en">English (en)</MenuItem>
                      <MenuItem value="ar">Arabic (ar)</MenuItem>
                      <MenuItem value="fr">French (fr)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="bh_start">Business Hours Start</CustomFormLabel>
                  <CustomTextField id="bh_start" name="bh_start" fullWidth placeholder="09:00" value={form.bh_start} onChange={handleText('bh_start')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="bh_end">Business Hours End</CustomFormLabel>
                  <CustomTextField id="bh_end" name="bh_end" fullWidth placeholder="17:00" value={form.bh_end} onChange={handleText('bh_end')} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel htmlFor="bh_timezone">BH Timezone</CustomFormLabel>
                  <CustomTextField id="bh_timezone" name="bh_timezone" fullWidth placeholder="America/New_York" value={form.bh_timezone} onChange={handleText('bh_timezone')} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="maxBudget">Max Budget</CustomFormLabel>
                  <CustomTextField id="maxBudget" name="maxBudget" type="number" fullWidth placeholder="5000" value={form.maxBudget} onChange={handleText('maxBudget')} />
                </Grid>
       

                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="allowedDestinations">Allowed Destinations</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select
                      id="allowedDestinations"
                      name="allowedDestinations"
                      multiple
                      input={<OutlinedInput label="Allowed Destinations" />}
                      renderValue={(selected) => (Array.isArray(selected) ? selected.join(', ') : selected)}
                      value={form.allowedDestinations}
                      onChange={handleMulti('allowedDestinations')}
                    >
                      {['US', 'CA', 'MX', 'GB', 'FR', 'DE', 'SA', 'AE'].map((code) => (
                        <MenuItem key={code} value={code}>
                          <Checkbox checked={form.allowedDestinations.indexOf(code) > -1} />
                          <ListItemText primary={code} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="restrictedDestinations">Restricted Destinations</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select
                      id="restrictedDestinations"
                      name="restrictedDestinations"
                      multiple
                      input={<OutlinedInput label="Restricted Destinations" />}
                      renderValue={(selected) => (Array.isArray(selected) ? selected.join(', ') : selected)}
                      value={form.restrictedDestinations}
                      onChange={handleMulti('restrictedDestinations')}
                    >
                      {['US', 'CA', 'MX', 'GB', 'FR', 'DE', 'SA', 'AE'].map((code) => (
                        <MenuItem key={code} value={code}>
                          <Checkbox checked={form.restrictedDestinations.indexOf(code) > -1} />
                          <ListItemText primary={code} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <br />
                <br />
                <br />

                

                <br />
                <br />
                <br />

             
              </Grid>
              <Grid item xs={12}>
  <Box display="flex" alignItems="center" gap={1}>
   
    <input
      id="requireApproval"
      name="requireApproval"
      type="checkbox"
      checked={form.requireApproval}
      onChange={handleCheckbox('requireApproval')}
      style={{ transform: "scale(1.2)" , alignSelf: 'center'}}
    />
     <CustomFormLabel htmlFor="requireApproval" sx={{ mb: 0 , mt:0 , alignSelf: 'center'}}>
      Require Approval
    </CustomFormLabel>
  </Box>
</Grid>



                 <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                    <Button variant="outlined" color="inherit" onClick={() => history.back()}>Cancel</Button>
                    <LoadingButton type="submit" variant="contained" color="primary" loading={pending}>Create Tenant</LoadingButton>
                  </Stack>
                </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}