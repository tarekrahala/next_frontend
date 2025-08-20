import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import TenantsPagination from './TenantsPagination'
import Link from 'next/link'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Visibility from '@mui/icons-material/Visibility'
import Edit from '@mui/icons-material/Edit'
import TenantStatusToggle from './TenantStatusToggle'
import Stack from '@mui/material/Stack'
import TenantDeleteButton from './TenantDeleteButton'
import DeleteIcon from '@mui/icons-material/Delete'

async function fetchTenants(page, limit) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
  const url = `${baseUrl}/admin/tenants?page=${page}&limit=${limit}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch tenants')
  return res.json()
}

export default async function TenantsPage({ searchParams }) {
  const page = Number(searchParams?.page ?? 1)
  const limit = Number(searchParams?.limit ?? 10)

  let data
  try {
    data = await fetchTenants(page, limit)
  } catch (e) {
    return (
      <Alert severity="error">Unable to load tenants.</Alert>
    )
  }

  const tenants = data?.tenants ?? []
  const totalPages = Number(data?.pagination?.pages ?? 1)

  const renderStatusChip = (status) => {
    const normalized = String(status || '').toLowerCase()
    let color = 'default'
    if (normalized === 'active') color = 'success'
    else if (normalized === 'pending') color = 'warning'
    else if (normalized === 'inactive' || normalized === 'disabled') color = 'default'
    else if (normalized === 'suspended' || normalized === 'blocked') color = 'error'
    else if (normalized === 'trial') color = 'info'
    const label = normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'Unknown'
    return <Chip size="small" color={color} label={label} />
  }

  return (
    <Box style={{marginTop: '32px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Tenants</Typography>
        <Button component={Link} href="/tenants/create-tenant" variant="contained" color="primary">
          Create Tenant
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}  >
        <Table>
          <TableHead>
            <TableRow>
               <TableCell>Name</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="text.secondary">No tenants found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              tenants.map((t) => (
                <TableRow key={t.id} hover>
                   <TableCell>{t.name}</TableCell>
                  <TableCell>{t.domain}</TableCell>
                  <TableCell>{t.email}</TableCell>
                  <TableCell>{t.phone}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {renderStatusChip(t.status)}
                     </Stack>
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{t.type}</TableCell>
                  <TableCell>{new Date(t.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Tooltip title="View" arrow>
                        <IconButton color="primary" component={Link} href={`/tenants/${t.id}`}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <IconButton color="secondary" component={Link} href={`/tenants/update/${t.id}`}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <TenantDeleteButton tenantId={t.id} />
                      <TenantStatusToggle tenantId={t.id} initialStatus={t.status} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TenantsPagination page={page} totalPages={totalPages} limit={limit} />
    </Box>
  )
}


