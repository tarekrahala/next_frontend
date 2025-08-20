"use client"

import React, { useState } from 'react'
import Switch from '@mui/material/Switch'
import Tooltip from '@mui/material/Tooltip'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

 
export default function TenantStatusToggle({ tenantId, initialStatus }) {
  const [checked, setChecked] = useState(String(initialStatus).toLowerCase() === 'active')
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleChange = async (event) => {
    const nextChecked = event.target.checked
    const prev = checked
    setChecked(nextChecked)
    setPending(true)
    try {
      const nextStatus = nextChecked ? 'active' : 'inactive'
      const res = await fetch(`http://localhost:3000/api/admin/tenants/${tenantId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      if (!res.ok) throw new Error('Failed to update status')
      toast.success(`Status updated to ${nextStatus}`)
      router.refresh()
    } catch (e) {
      setChecked(prev) // revert on error
      toast.error('Failed to update status')
    } finally {
      setPending(false)
    }
  }

  return (
    <Tooltip title={checked ? 'Deactivate' : 'Activate'} arrow>
      <span>
        <Switch color="primary" checked={checked} onChange={handleChange} disabled={pending} />
      </span>
    </Tooltip>
  )
}


