"use client"

import React, { useState, useActionState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel'
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField'
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { loginAction } from '@/app/actions/auth-action'
import { useRouter } from 'next/navigation'
import LoadingButton from '@mui/lab/LoadingButton'
import { useFormStatus } from 'react-dom'
import Alert from '@mui/material/Alert'

function LoginPage() {



    const [showPassword, setShowPassword] = useState(false)
    const [state, formAction] = useActionState(loginAction, { success: false, message: '' })
    const [mounted, setMounted] = useState(false)
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [suppressError, setSuppressError] = useState(false)

    useEffect(() => setMounted(true), [])
    const router = useRouter()  

    useEffect(() => {
        if (state?.success) {
            router.replace('/')
        }
    }, [state?.success, router])
    
    const showError = Boolean(state?.message && !state?.success && !suppressError)

    // Ensure a new server error becomes visible even if an input remains focused
    useEffect(() => {
        if (state?.message && !state?.success) {
            setSuppressError(false)
        }
    }, [state?.message, state?.success])
    


    if (!mounted) return null

    const SubmitButton = () => {
        const { pending } = useFormStatus()
        return (
            <LoadingButton type="submit" color="primary" variant="contained" size="large" fullWidth loading={pending}>
                Login
            </LoadingButton>
        )
    }

    return (
        <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 170px)', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 420 }}>
                <Box sx={{
                    backgroundColor: (theme) => theme.palette.background.paper,
                    boxShadow: (theme) => theme.shadows[8],
                    p: 4,
                    borderRadius: (theme) => theme.shape.borderRadius * 1,
                    marginTop: '80px'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                        <Logo />
                    </Box>
                    <Typography variant="h4" fontWeight={700} mb={1}>
                        Sign in
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Use your email and password to access your account.
                    </Typography>

                    <Box component="form" action={formAction}>
                        <Stack spacing={2}>
                            <Box>
                                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                                <CustomTextField id="email" name="email" type="email" placeholder="you@example.com" variant="outlined" fullWidth required value={formValues.email} onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))} onFocus={() => setSuppressError(true)} onBlur={() => setSuppressError(false)} />
                            </Box>
                            <Box>
                                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                                <CustomTextField
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formValues.password}
                                    onChange={(e) => setFormValues((prev) => ({ ...prev, password: e.target.value }))}
                                    onFocus={() => setSuppressError(true)}
                                    onBlur={() => setSuppressError(false)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                            <FormControlLabel control={<CustomCheckbox />} label="Remember me" sx={{ mt: 1 }} />
                            {showError ? (
                                <Alert severity="error" variant="filled" sx={{ mt: 1 }} role="alert" aria-live="polite">
                                    {state.message}
                                </Alert>
                            ) : null}
                            <SubmitButton />
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginPage