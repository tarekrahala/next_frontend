"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Paper from '@mui/material/Paper'
import toast from 'react-hot-toast'

const TITLES = ['Manager', 'System Administrator', 'Analyst', 'Developer', 'Support']
const DEPARTMENTS = ['Sales', 'IT', 'Finance', 'HR', 'Operations']
const USER_TYPES = ['admin', 'agent', 'user']

export default function UpdateUserPage() {
    const { id } = useParams()
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [pending, setPending] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [tenants, setTenants] = useState([])
    const [loadingTenants, setLoadingTenants] = useState(true)

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: 'admin',
        phone: '',
        tenantId: '',
        profile_title: 'Manager',
        profile_department: 'Sales',
        profile_employeeId: '',
    })


    console.log("user id", form)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true)
                const res = await fetch(`http://localhost:3000/api/users/${id}`, { cache: 'no-store' })
                if (!res.ok) throw new Error('Failed to fetch user')
                const u = await res.json()
                setForm({
                    firstName: u.firstName || '',
                    lastName: u.lastName || '',
                    email: u.email || '',
                    password: '',
                    userType: u.userType || 'admin',
                    phone: u.phone || '',
                    tenantId: u.tenantId || '',
                    profile_title: u.profile_title || 'Manager',
                    profile_department: u.profile_department || 'Sales',
                    profile_employeeId: u.profile_employeeId || '',
                })
            } catch (e) {
                setErrorMsg('Unable to load user')
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchUser()
    }, [id])

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                setLoadingTenants(true)
                const res = await fetch(`http://localhost:3000/api/admin/tenants?page=1&limit=100`, { cache: 'no-store' })
                const data = await res.json().catch(() => ({}))
                if (res.ok && Array.isArray(data.tenants)) setTenants(data.tenants)
                else if (res.ok && Array.isArray(data)) setTenants(data)
                else setTenants([])
            } catch {
                setTenants([])
            } finally {
                setLoadingTenants(false)
            }
        }
        fetchTenants()
    }, [])

    const handleText = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
    const handleSelect = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        setPending(true)
        try {
            if (!form.firstName || !form.lastName || !form.email || !form.userType) {
                setErrorMsg('Please fill all required fields')
                setPending(false)
                return
            }
            const body = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                userType: form.userType,
                phone: form.phone,
                tenantId: form.tenantId || undefined,
                profile: {
                    title: form.profile_title,
                    department: form.profile_department,
                    employeeId: form.profile_employeeId,
                },
            }
            if (form.password) body.password = form.password

            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err?.message || 'Failed to update user')
            }
            toast.success('User updated')
            router.replace(`/users/${id}`)
        } catch (err) {
            setErrorMsg(err.message || 'Unexpected error updating user')
            toast.error('Failed to update user')
        } finally {
            setPending(false)
        }
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h5" fontWeight={700}>Update User</Typography>
            </Stack>
            <Divider />

            {errorMsg ? (
                <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>
            ) : null}

            {loading ? (
                <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Loading...</Typography>
                </Box>
            ) : (
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12} md={7}>
                            <Box component={Paper} variant="outlined" sx={{ p: 3, mb: 3 }}>
                                <Typography variant="h6" mb={2}>Basic Info</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <CustomFormLabel htmlFor="firstName">First Name</CustomFormLabel>
                                        <CustomTextField id="firstName" name="firstName" fullWidth required placeholder="Jane" value={form.firstName} onChange={handleText('firstName')} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomFormLabel htmlFor="lastName">Last Name</CustomFormLabel>
                                        <CustomTextField id="lastName" name="lastName" fullWidth required placeholder="Smith" value={form.lastName} onChange={handleText('lastName')} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                                        <CustomTextField id="email" name="email" type="email" fullWidth required placeholder="jane.smith@example.com" value={form.email} onChange={handleText('email')} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomFormLabel htmlFor="password">Password (leave blank to keep)</CustomFormLabel>
                                        <CustomTextField id="password" name="password" type="password" fullWidth placeholder="••••••••" value={form.password} onChange={handleText('password')} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomFormLabel htmlFor="phone">Phone</CustomFormLabel>
                                        <CustomTextField id="phone" name="phone" fullWidth placeholder="+1234567890" value={form.phone} onChange={handleText('phone')} />
                                    </Grid>
                                    <Grid item xs={12} md={6} style={{marginTop:'10px' , width:'250px'}}>
                                        <CustomFormLabel htmlFor="userType">User Type</CustomFormLabel>
                                        <FormControl fullWidth>
                                            <Select id="userType" name="userType" value={form.userType} onChange={handleSelect('userType')}>
                                                {USER_TYPES.map((t) => (
                                                    <MenuItem key={t} value={t} sx={{ textTransform: 'capitalize' }}>{t}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box component={Paper} variant="outlined" sx={{ p: 3 }}>
                                <Typography variant="h6" mb={2}>Profile</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4} style={{marginTop:'10px' , width:'250px'}}>
                                        <CustomFormLabel htmlFor="profile_title">Title</CustomFormLabel>
                                        <FormControl fullWidth>
                                            <Select id="profile_title" name="profile_title" value={form.profile_title} onChange={handleSelect('profile_title')}>
                                                {TITLES.map((t) => (
                                                    <MenuItem key={t} value={t}>{t}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4} style={{marginTop:'10px' , width:'250px'}}>
                                        <CustomFormLabel htmlFor="profile_department">Department</CustomFormLabel>
                                        <FormControl fullWidth>
                                            <Select id="profile_department" name="profile_department" value={form.profile_department} onChange={handleSelect('profile_department')}>
                                                {DEPARTMENTS.map((d) => (
                                                    <MenuItem key={d} value={d}>{d}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4} style={{marginTop:'10px' , width:'250px'}}>
                                        <CustomFormLabel htmlFor="profile_employeeId">Employee ID</CustomFormLabel>
                                        <CustomTextField id="profile_employeeId" name="profile_employeeId" fullWidth placeholder="EMP001" value={form.profile_employeeId} onChange={handleText('profile_employeeId')} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Box component={Paper} variant="outlined" sx={{ p: 3 }}>
                                <Typography variant="h6" mb={2}>Tenant</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} style={{marginTop:'10px' , width:'250px'}}>
                                        <CustomFormLabel htmlFor="tenantId">Select Tenant</CustomFormLabel>
                                        <FormControl fullWidth>
                                            <Select id="tenantId" name="tenantId" value={form.tenantId} onChange={handleSelect('tenantId')} disabled={loadingTenants}>
                                                {tenants.map((t) => (
                                                    <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                            <Button variant="outlined" color="inherit" onClick={() => router.back()}>Cancel</Button>
                            <LoadingButton type="submit" variant="contained" color="primary" loading={pending}>Save Changes</LoadingButton>
                        </Stack>
                    </Grid>
                </Box>
            )}
        </Box>
    )
}