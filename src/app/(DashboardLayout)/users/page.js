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
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import Edit from '@mui/icons-material/Edit'
import Link from 'next/link'
import TenantsPagination from '../tenants/TenantsPagination'
import CheckCircle from '@mui/icons-material/CheckCircle'
import Close from '@mui/icons-material/Close'
import UserDeleteButton from './UserDeleteButton'

async function fetchUsers(page, limit, userType) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
  const qp = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (userType) qp.set('userType', String(userType))
  const url = `${baseUrl}/users?${qp.toString()}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

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

const renderBoolChip = (val, trueLabel, falseLabel) => {
  return val ? (
    <Chip size="small" color="success" label={trueLabel} />
  ) : (
    <Chip size="small" color="default" label={falseLabel} />
  )
}

export default async function UsersPage({ searchParams }) {
  const page = Number(searchParams?.page ?? 1)
  const limit = Number(searchParams?.limit ?? 10)
  const userType = searchParams?.userType ?? ''

  let data
  try {
    data = await fetchUsers(page, limit, userType)
  } catch (e) {
    return <Alert severity="error">Unable to load users.</Alert>
  }

  const users = data?.users ?? []
  const totalPages = Number(data?.pagination?.pages ?? 1)

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Users</Typography>
        <Button component={Link} href="/users/create-user" variant="contained" color="primary">
          Create User
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email Verified</TableCell>
              <TableCell>Phone Verified</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Title</TableCell>
               <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  <Typography variant="body2" color="text.secondary">No users found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>{`${u.firstName ?? ''} ${u.lastName ?? ''}`.trim()}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{u.userType}</TableCell>
                  <TableCell>{renderStatusChip(u.status)}</TableCell>
                  <TableCell>{u.phone ?? '-'}</TableCell>
                    <TableCell>{u.emailVerified ? (
                <CheckCircle fontSize="small" sx={{ color: 'success.main' }} />
              ) : (
                <Close fontSize="small" sx={{ color: 'error.main' }} />
              )}</TableCell>
                  <TableCell>{u.phoneVerified ? (
                <CheckCircle fontSize="small" sx={{ color: 'success.main' }} />
              ) : (
                <Close fontSize="small" sx={{ color: 'error.main' }} />
              )}</TableCell>
                  <TableCell>{u.profile?.department ?? '-'}</TableCell>
                  <TableCell>{u.profile?.title ?? '-'}</TableCell>
                   <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Tooltip title="View" arrow>
                        <IconButton color="primary" component={Link} href={`/users/${u.id}`}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <IconButton color="secondary" component={Link} href={`/users/update/${u.id}`}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <UserDeleteButton userId={u.id} />
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


