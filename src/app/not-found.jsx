"use client"

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <Box sx={{
      display: 'flex',
      minHeight: 'calc(100vh - 170px)',
      alignItems: 'center',
      justifyContent: 'center',
      px: 2,
    }}>
      <Box sx={{ textAlign: 'center', maxWidth: 560 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Image src={"/images/backgrounds/errorimg.svg"} alt="Not found" width={320} height={200} />
        </Box>
        <Typography variant="h1" fontWeight={800} sx={{ fontSize: { xs: 64, sm: 96 }, lineHeight: 1 }}>
          404
        </Typography>
        <Typography variant="h4" fontWeight={700} mt={1}>
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1} mb={3}>
          The page you are looking for doesn’t exist or has been moved.
        </Typography>
        <Button component={Link} href="/" variant="contained" color="primary">
          Go to Home
        </Button>
      </Box>
    </Box>
  )
}


