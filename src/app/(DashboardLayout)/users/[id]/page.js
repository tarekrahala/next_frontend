import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import CheckCircle from '@mui/icons-material/CheckCircle'
import Close from '@mui/icons-material/Close'

const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

const mapStatusToColor = (status) => {
  const s = String(status || '').toLowerCase()
  if (s === 'active') return 'success'
  if (s === 'pending') return 'warning'
  if (s === 'suspended' || s === 'blocked') return 'error'
  return 'default'
}

export default async function UserDetailsPage({ params }) {
  const { id } = params
  const res = await fetch(`${getApiBase()}/users/${id}`, { cache: 'no-store' })
  if (!res.ok) {
    return <Alert severity="error">Unable to load user details</Alert>
  }
  const user = await res.json()
  if (!user) {
    return <Alert severity="error">User not found</Alert>
  }

  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.email
  const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'
  const updatedAt = user.updatedAt ? new Date(user.updatedAt).toLocaleString() : '-'

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={2} mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>{(fullName || 'U').slice(0,1)}</Avatar>
          <Box>
            <Typography variant="h5">{fullName}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip size="small" color={mapStatusToColor(user.status)} label={user.status || 'Unknown'} sx={{ textTransform: 'capitalize' }} />
          <Chip size="small" color="info" variant="outlined" label={user.userType || 'user'} sx={{ textTransform: 'capitalize' }} />
        </Stack>
      </Stack>

      <Divider />

      <Grid container spacing={3} mt={3} mb={4} alignItems="stretch">
        <Grid item xs={12} md={8} sx={{ display: 'flex' }}>
          <Paper variant="outlined" sx={{ p: 3, width: '100%' }}>
            <Typography variant="h6" mb={2}>Account</Typography>
            <Box display="flex" gap={1} mb={1}>
              <Typography variant="body2" fontWeight={600}>User Type:</Typography>
              <Chip size="small" color="info" variant="outlined" label={user.userType || 'user'} sx={{ textTransform: 'capitalize' }} />
            </Box>
            <Box display="flex" gap={1} mb={1}>
              <Typography style={{alignSelf:'center'}} variant="body2" fontWeight={600}>Created:</Typography>
              <Typography variant="body1">{createdAt}</Typography>
            </Box>
            <Box display="flex" gap={1} mb={2}>
              <Typography style={{alignSelf:'center'}} variant="body2" fontWeight={600}>Updated:</Typography>
              <Typography variant="body1">{updatedAt}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Profile</Typography>
            <Box display="flex" gap={1} mb={1}>
              <Typography style={{alignSelf:'center'}} variant="body2" fontWeight={600}>Title:</Typography>
              <Typography variant="body1">{user.profile?.title ?? '-'}</Typography>
            </Box>
            <Box display="flex" gap={1} mb={1}>
              <Typography style={{alignSelf:'center'}} variant="body2" fontWeight={600}>Department:</Typography>
              <Typography variant="body1">{user.profile?.department ?? '-'}</Typography>
            </Box>
            {user.profile?.employeeId ? (
              <Box display="flex" gap={1}>
                <Typography style={{alignSelf:'center'}} variant="body2" fontWeight={600}>Employee ID:</Typography>
                <Typography variant="body1">{user.profile.employeeId}</Typography>
              </Box>
            ) : null}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
          <Paper variant="outlined" sx={{ p: 3, width: '100%' }}>
            <Typography variant="h6" mb={2}>Contact & Verification</Typography>
            <Box display="flex" gap={1} mb={1}>
              <Typography style={{alignSelf:'center'}} variant="body2" fontWeight={600}>Phone:</Typography>
              <Typography variant="body1">{user.phone ?? '-'}</Typography>
            </Box>
            <Box display="flex" gap={1} alignItems="center" mb={1}>
              <Typography style={{alignSelf:'center'}} variant="body2" fontWeight={600}>Email Verified:</Typography>
              {user.emailVerified ? (
                <CheckCircle fontSize="small" sx={{ color: 'success.main' }} />
              ) : (
                <Close fontSize="small" sx={{ color: 'error.main' }} />
              )}
            </Box>
            <Box display="flex" gap={1} alignItems="center">
              <Typography style={{alignSelf:'center'}} variant="body2" fontWeight={600}>Phone Verified:</Typography>
              {user.phoneVerified ? (
                <CheckCircle fontSize="small" sx={{ color: 'success.main' }} />
              ) : (
                <Close fontSize="small" sx={{ color: 'error.main' }} />
              )}
            </Box>
          </Paper>
        </Grid>

      </Grid>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Permissions</Typography>
        {Array.isArray(user.profile?.permissions) && user.profile.permissions.length > 0 ? (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {user.profile.permissions.map((p) => (
              <Chip key={p} label={p} size="small" variant="outlined" />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">No permissions</Typography>
        )}
      </Paper>
    </Box>
  )
}

 

 