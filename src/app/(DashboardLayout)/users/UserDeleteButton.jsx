"use client"

import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

export default function UserDeleteButton({ userId }) {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (pending) return
    const result = await Swal.fire({
      title: 'Delete user?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
    })
    if (!result.isConfirmed) return
    try {
      setPending(true)
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, { method: 'DELETE' })
      if (!res.ok) {
        toast.error('Failed to delete user')
        return
      }
      toast.success('User deleted successfully')
      await Swal.fire('Deleted!', 'User has been deleted.', 'success')
      router.refresh()
    } catch (e) {
      toast.error('Failed to delete user')
      await Swal.fire('Error', 'Failed to delete user', 'error')
    } finally {
      setPending(false)
    }
  }

  return (
    <Tooltip title="Delete" arrow>
      <span>
        <IconButton color="error" onClick={handleDelete} disabled={pending}>
          <DeleteIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}


