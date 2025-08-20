import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'   
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Link from 'next/link'
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo'
 
const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
export function formatDate(dateString) {
    if (!dateString) return "";
  
    const date = new Date(dateString);
  
    if (isNaN(date)) return "";
  
 
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
const mapStatusToColor = (status) => {
  const s = String(status || '').toLowerCase()
  if (s === 'active') return 'success'
  if (s === 'pending') return 'warning'
  if (s === 'suspended' || s === 'blocked') return 'error'
  if (s === 'trial') return 'info'
  return 'default'
}

export default async function TenantDetailsPage({ params }) {
  const { id } = params
  const res = await fetch(`${getApiBase()}/admin/tenants/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    return <Alert severity="error">Unable to load tenant details</Alert>
  }
  const tenant = await res.json()
  if (!tenant) {
    return <Alert severity="error">Tenant not found</Alert>
  }

  const createdOn = (() => {
    if (!tenant?.createdAt) return ''
     return tenant.createdAt    
  })()

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={2} mt={4}>
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h5">{tenant.name}</Typography>
          {createdOn ? (
            <Box mt={1}>
              <Chip size="small" color="secondary" variant="outlined" label={formatDate(createdOn)} />
            </Box>
          ) : null}
        </Box>
         <Box textAlign="right">
          <Chip size="small" color={mapStatusToColor(tenant.status)} label={tenant.status || 'Unknown'} sx={{ textTransform: 'capitalize' , padding: '16px 10px' , display: 'flex' , alignItems: 'center' , justifyContent: 'center' , gap: '10px' }} />
        </Box>
      </Stack>

      <Divider />

      <Grid container spacing={3} mt={2} mb={4} alignItems="stretch">
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper variant="outlined" sx={{ height: '100%', width: '100%' }}>
            <Box p={3} display="flex" flexDirection="column" gap="10px">
              <Typography variant="h6" mb={2}>Company</Typography>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Company Name:</Typography>
                <Typography variant="body1">{tenant.companyName || tenant.name}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Domain:</Typography>
                <Typography variant="body1">{tenant.domain}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Type:</Typography>
                <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{tenant.type}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Credit Balance:</Typography>
                <Typography variant="body1">{tenant.creditBalance}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper variant="outlined" sx={{ height: '100%', width: '100%' }}>
            <Box p={3} display="flex" flexDirection="column" gap="10px">
              <Typography variant="h6" mb={2}>Contact</Typography>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Contact Person:</Typography>
                <Typography variant="body1">{tenant.contactPerson}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Email:</Typography>
                <Typography variant="body1">{tenant.email}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Phone:</Typography>
                <Typography variant="body1">{tenant.phone}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Address:</Typography>
                <Typography variant="body1">{tenant.address}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf: 'center'}} variant="body2" fontWeight={600}>Location:</Typography>
                <Typography variant="body1">{[tenant.city, tenant.country, tenant.postalCode].filter(Boolean).join(', ')}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Setting</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Value</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><Typography variant="body1">Currency</Typography></TableCell>
                <TableCell><Typography variant="body1">{tenant.settings?.currency || '-'}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="body1">Language</Typography></TableCell>
                <TableCell><Typography variant="body1">{tenant.settings?.language || '-'}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="body1">Timezone</Typography></TableCell>
                <TableCell><Typography variant="body1">{tenant.settings?.timezone || '-'}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="body1">Business Hours</Typography></TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {tenant.settings?.businessHours?.start || '--:--'} - {tenant.settings?.businessHours?.end || '--:--'} ({tenant.settings?.businessHours?.timezone || '-'})
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="body1">Require Approval</Typography></TableCell>
                <TableCell>
                  {tenant.settings?.travelPolicy?.requireApproval ? (
                    <Chip size="small" color="warning" label="Yes" />
                  ) : (
                    <Chip size="small" color="success" label="No" />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="body1">Max Budget</Typography></TableCell>
                <TableCell><Typography variant="body1">{tenant.settings?.travelPolicy?.maxBudget ?? '-'}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="body1">Allowed Destinations</Typography></TableCell>
                <TableCell>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {(tenant.settings?.travelPolicy?.allowedDestinations || []).map((d) => (
                      <Chip key={d} size="small" label={d} />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><Typography variant="body1">Restricted Destinations</Typography></TableCell>
                <TableCell>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {(tenant.settings?.travelPolicy?.restrictedDestinations || []).map((d) => (
                      <Chip key={d} size="small" label={d} color="error" variant="outlined" />
                    ))}
                    {(!tenant.settings?.travelPolicy?.restrictedDestinations || tenant.settings.travelPolicy.restrictedDestinations.length === 0) && (
                      <Typography variant="body2" color="text.secondary">None</Typography>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box display="flex" alignItems="center" gap={1} mt={3} justifyContent="end">
        <Button variant="contained" color="secondary" component={Link} href={`/tenants/${tenant.id}/edit`}>
          Edit Tenant
        </Button>
        <Button variant="contained" color="primary" component={Link} href="/tenants">
          Back to Tenants
        </Button>
      </Box>
    </>
  )
}