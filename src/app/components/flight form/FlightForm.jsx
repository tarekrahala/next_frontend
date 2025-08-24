"use client";

import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

const MAX_LEGS = 6;

const defaultLeg = () => ({ origin: '', destination: '', date: null });

const FlightForm = ({ onSubmit }) => {
	const FIELD_HEIGHT = 56;
	const [search, setSearch] = useState({
		type: 'oneway',
		passengers: { adults: 1, children: 0, infants: 0 },
		legs: [defaultLeg()],
		returnDate: null,
		cabin: 'economy',
	});

	const tab = search.type;

	const [paxAnchorEl, setPaxAnchorEl] = useState(null);
	const paxOpen = Boolean(paxAnchorEl);
	const handleOpenPax = (e) => setPaxAnchorEl(e.currentTarget);
	const handleClosePax = () => setPaxAnchorEl(null);

	useEffect(() => {
		if (search.passengers.infants > search.passengers.adults) {
			setSearch((prev) => ({
				...prev,
				passengers: { ...prev.passengers, infants: prev.passengers.adults },
			}));
		}
	}, [search.passengers.infants, search.passengers.adults]);

	const paxSummary = useMemo(() => {
		const { adults, children, infants } = search.passengers;
		const total = adults + children + infants;
		const tLabel = total === 1 ? 'Traveler' : 'Travelers';
		const cabinLabel =
			search.cabin === 'premium_economy' ? 'Premium Economy' :
			search.cabin === 'business' ? 'Business' :
			search.cabin === 'first' ? 'First' : 'Economy';
		return `${total} ${tLabel}, ${cabinLabel}`;
	}, [search.passengers, search.cabin]);

	const disablePast = (date) => date && date.isBefore(moment().startOf('day'));

	const setType = (nextType) => {
		setSearch((prev) => {
			const next = { ...prev, type: nextType };
			if (nextType === 'oneway') {
				next.legs = prev.legs.length ? [prev.legs[0]] : [defaultLeg()];
				next.returnDate = null;
			}
			if (nextType === 'roundtrip') {
				next.legs = prev.legs.length ? [prev.legs[0]] : [defaultLeg()];
			}
			if (nextType === 'multicity') {
				next.returnDate = null;
				if (prev.legs.length < 2) {
					next.legs = [prev.legs[0] || defaultLeg(), defaultLeg()];
				}
			}
			return next;
		});
	};

	const addLeg = () => {
		setSearch((prev) => {
			if (prev.legs.length >= MAX_LEGS) return prev;
			return { ...prev, legs: [...prev.legs, defaultLeg()] };
		});
	};

	const removeLeg = (i) => {
		setSearch((prev) => ({ ...prev, legs: prev.legs.filter((_, idx) => idx !== i) }));
	};

	const updateLeg = (i, key, value) => {
		setSearch((prev) => ({
			...prev,
			legs: prev.legs.map((leg, idx) => (idx === i ? { ...leg, [key]: value } : leg)),
		}));
	};

	const swapLegCities = (i) => {
		setSearch((prev) => ({
			...prev,
			legs: prev.legs.map((leg, idx) => (idx === i ? { ...leg, origin: leg.destination, destination: leg.origin } : leg)),
		}));
	};

	const handleSearch = () => {
		const payload = { ...search };
		if (onSubmit && typeof onSubmit === 'function') {
			onSubmit(payload);
		} else {
			console.log('Flight search payload', payload);
		}
	};

	return (
		<Box sx={{ width: '100%', minHeight: 300 }}>
			<Card elevation={3} sx={{ width: '100%', height: '100%' }}>
				<CardContent>
					<Stack spacing={3}>
						<Typography variant="h5" fontWeight={600}>Flight Search</Typography>

						<Tabs
							value={tab}
							onChange={(_, v) => setType(v)}
							variant="scrollable"
							allowScrollButtonsMobile
						>
							<Tab value="oneway" label="One-way" />
							<Tab value="roundtrip" label="Round trip" />
							<Tab value="multicity" label="Multi-city" />
						</Tabs>

						{tab === 'oneway' && (
							<Grid container spacing={2} alignItems="stretch">
								<Grid item xs={12} md={12} lg={6}>
									<Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
										<TextField
											label="Origin"
											placeholder="City or airport"
											value={search.legs[0]?.origin || ''}
											onChange={(e) => updateLeg(0, 'origin', e.target.value)}
											InputProps={{ startAdornment: (<InputAdornment position="start"><FlightTakeoffIcon fontSize="small" /></InputAdornment>) }}
											size="small"
											fullWidth
										/>
										<TextField
											label="Destination"
											placeholder="City or airport"
											value={search.legs[0]?.destination || ''}
											onChange={(e) => updateLeg(0, 'destination', e.target.value)}
											InputProps={{ startAdornment: (<InputAdornment position="start"><FlightLandIcon fontSize="small" /></InputAdornment>) }}
											size="small"
											fullWidth
										/>
										<IconButton aria-label="swap" onClick={() => swapLegCities(0)} sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: 1, borderColor: 'divider', boxShadow: 1, display: { xs: 'none', sm: 'flex' } }}>
											<SwapHorizIcon />
										</IconButton>
									</Box>
								</Grid>
								<Grid item xs={12} md={6} lg={3}>
									<Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1, px: 2, height: FIELD_HEIGHT }}>
										<CalendarMonthOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
										<LocalizationProvider dateAdapter={AdapterMoment}>
											<DatePicker
												label="Departure date"
												value={search.legs[0]?.date || null}
												onChange={(v) => updateLeg(0, 'date', v)}
												shouldDisableDate={disablePast}
												format="ddd, DD MMM"
												slotProps={{ textField: { sx: { '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiInputBase-root': { p: 0 } } } }}
																						/>
										</LocalizationProvider>
									</Box>
									
								</Grid>
								<Grid item xs={12} md={6} lg={2}>
									<Box onClick={handleOpenPax} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', height: FIELD_HEIGHT, border: 1, borderColor: 'divider', borderRadius: 1, px: 2 }}>
										<GroupOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
										<Typography>{paxSummary}</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={6} lg={1}>
									<Button fullWidth variant="contained" color="error" startIcon={<SearchIcon />} onClick={handleSearch} sx={{ height: FIELD_HEIGHT }}>
										Search
									</Button>
								</Grid>
							</Grid>
						)}

					 

						 

						<Popover
							open={paxOpen}
							anchorEl={paxAnchorEl}
							onClose={handleClosePax}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							transformOrigin={{ vertical: 'top', horizontal: 'left' }}
							PaperProps={{ sx: { p: 2, width: 360 } }}
						>
							<Stack spacing={2}>
								<Stack spacing={1}>
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
										<Typography>Adults</Typography>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<IconButton size="small" onClick={() => setSearch((prev) => ({ ...prev, passengers: { ...prev.passengers, adults: Math.max(1, prev.passengers.adults - 1) } }))} disabled={search.passengers.adults <= 1}>
												<RemoveIcon />
											</IconButton>
											<Typography width={24} textAlign="center">{search.passengers.adults}</Typography>
											<IconButton size="small" onClick={() => setSearch((prev) => ({ ...prev, passengers: { ...prev.passengers, adults: Math.min(9, prev.passengers.adults + 1), infants: Math.min(prev.passengers.infants, Math.min(9, prev.passengers.adults + 1)) } }))} disabled={search.passengers.adults >= 9}>
												<AddIcon />
											</IconButton>
										</Box>
									</Box>
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
										<Typography>Children</Typography>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<IconButton size="small" onClick={() => setSearch((prev) => ({ ...prev, passengers: { ...prev.passengers, children: Math.max(0, prev.passengers.children - 1) } }))} disabled={search.passengers.children <= 0}>
												<RemoveIcon />
											</IconButton>
											<Typography width={24} textAlign="center">{search.passengers.children}</Typography>
											<IconButton size="small" onClick={() => setSearch((prev) => ({ ...prev, passengers: { ...prev.passengers, children: Math.min(7, prev.passengers.children + 1) } }))} disabled={search.passengers.children >= 7}>
												<AddIcon />
											</IconButton>
										</Box>
									</Box>
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
										<Typography>Infants</Typography>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<IconButton size="small" onClick={() => setSearch((prev) => ({ ...prev, passengers: { ...prev.passengers, infants: Math.max(0, prev.passengers.infants - 1) } }))} disabled={search.passengers.infants <= 0}>
												<RemoveIcon />
											</IconButton>
											<Typography width={24} textAlign="center">{search.passengers.infants}</Typography>
											<IconButton size="small" onClick={() => setSearch((prev) => ({ ...prev, passengers: { ...prev.passengers, infants: Math.min(Math.min(8, prev.passengers.adults), prev.passengers.infants + 1) } }))} disabled={search.passengers.infants >= Math.min(8, search.passengers.adults)}>
												<AddIcon />
											</IconButton>
										</Box>
									</Box>
								</Stack>
								<Divider />
								<FormControl fullWidth>
									<InputLabel id="cabin-label">Cabin</InputLabel>
									<Select labelId="cabin-label" label="Cabin" value={search.cabin} onChange={(e) => setSearch((prev) => ({ ...prev, cabin: e.target.value }))}>
										<MenuItem value="economy">Economy</MenuItem>
										<MenuItem value="premium_economy">Premium Economy</MenuItem>
										<MenuItem value="business">Business</MenuItem>
										<MenuItem value="first">First</MenuItem>
									</Select>
								</FormControl>
							</Stack>
						</Popover>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	);
};

export default FlightForm;


