"use client"

import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function TenantsPagination({ page, totalPages, limit }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (_event, value) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(value))
    params.set('limit', String(limit))
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
      <Pagination page={page} count={totalPages} color="primary" onChange={handleChange} />
    </Box>
  )
}


