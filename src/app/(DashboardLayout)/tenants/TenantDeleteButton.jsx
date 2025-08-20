"use client"

import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const getApiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

export default function TenantDeleteButton({ tenantId }) {
    const [pending, setPending] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (pending) return
        const result = await Swal.fire({
            title: 'Delete tenant?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it',
        })
        if (!result.isConfirmed) return
        try {
            setPending(true)
            const res = await fetch(`http://localhost:3000/api/admin/tenants/${tenantId}`, {
                method: 'DELETE'
            })
            if (!res.ok) {
                toast.error('Failed to delete tenant')
                return
            }
            toast.success('Tenant deleted successfully')
            await Swal.fire('Deleted!', 'Tenant has been deleted.', 'success')
            router.refresh()
        } catch (e) {
            toast.error('Failed to delete tenant')
            await Swal.fire('Error', 'Failed to delete tenant', 'error')
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


