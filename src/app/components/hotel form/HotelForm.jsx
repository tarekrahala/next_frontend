"use client"

import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SearchIcon from '@mui/icons-material/Search';

const MAX_ROOMS = 8;

const defaultRoom = () => ({
	adults: 2,
	children: 0,
	childrenAges: [],
});

function mapApiOptionToDisplay(option) {
	if (!option) return null;
	const type = option.type || (option.giata_id ? 'hotel' : 'city');
	const label = option.label || option.name || option.city || '';
	return {
		...option,
		label,
		type,
		value: option.value || option.giata_id || label,
	};
}

const fetchDestinations = async (query, signal) => {
	if (!query || query.trim().length < 2) return [];
	const url = `https://api.rahala.com.sa/api/tenant/destinations/giata-search?search=${encodeURIComponent(
		query.trim()
	)}`;
	const res = await fetch(url, { signal });
	if (!res.ok) throw new Error('Failed to fetch destinations');
	const data = await res.json();
	if (!Array.isArray(data)) return [];
	return data.map(mapApiOptionToDisplay);
};

const HotelForm = ({ onSubmit }) => {
	const [destinationInput, setDestinationInput] = useState('');
	const [destinationOptions, setDestinationOptions] = useState([]);
	const [destinationLoading, setDestinationLoading] = useState(false);
	const [selectedDestination, setSelectedDestination] = useState(null);

	

	const [checkIn, setCheckIn] = useState(null);
	const [checkOut, setCheckOut] = useState(null);

	const [rooms, setRooms] = useState([defaultRoom()]);

	const [roomsAnchorEl, setRoomsAnchorEl] = useState(null);
	const roomsOpen = Boolean(roomsAnchorEl);
	const handleOpenRooms = (event) => setRoomsAnchorEl(event.currentTarget);
	const handleCloseRooms = () => setRoomsAnchorEl(null);

	const abortRef = useRef();

	useEffect(() => {
		if (abortRef.current) {
			abortRef.current.abort();
		}
		const controller = new AbortController();
		abortRef.current = controller;

		let active = true;
		const run = async () => {
			if (!destinationInput || destinationInput.trim().length < 2) {
				setDestinationOptions([]);
				setDestinationLoading(false);
				return;
			}
			setDestinationLoading(true);
			try {
				const results = await fetchDestinations(destinationInput, controller.signal);
				if (active) setDestinationOptions(results);
			} catch (e) {
				if (e.name !== 'AbortError') {
					setDestinationOptions([]);
				}
			} finally {
				if (active) setDestinationLoading(false);
			}
		};

		const timeout = setTimeout(run, 350);
		return () => {
			active = false;
			clearTimeout(timeout);
			controller.abort();
		};
	}, [destinationInput]);

	const handleAddRoom = () => {
		if (rooms.length >= MAX_ROOMS) return;
		setRooms((prev) => [...prev, defaultRoom()]);
	};

	const handleRemoveRoom = (index) => {
		setRooms((prev) => prev.filter((_, i) => i !== index));
	};

	const handleAdultsChange = (index, value) => {
		setRooms((prev) =>
			prev.map((room, i) => (i === index ? { ...room, adults: value } : room))
		);
	};

	const handleChildrenChange = (index, value) => {
		setRooms((prev) =>
			prev.map((room, i) => {
				if (i !== index) return room;
				const count = Number(value) || 0;
				const ages = Array.from({ length: count }, (_, k) => room.childrenAges[k] ?? 5);
				return { ...room, children: count, childrenAges: ages };
			})
		);
	};

	const handleChildAgeChange = (roomIndex, ageIndex, value) => {
		setRooms((prev) =>
			prev.map((room, i) => {
				if (i !== roomIndex) return room;
				const ages = [...room.childrenAges];
				const ageNum = Math.max(0, Math.min(17, Number(value) || 0));
				ages[ageIndex] = ageNum;
				return { ...room, childrenAges: ages };
			})
		);
	};

	const disablePast = (date) => {
		return date && date.isBefore(moment().startOf('day'));
	};

	const handleSubmit = () => {
		const payload = {
			destination: selectedDestination,
			checkIn: checkIn ? checkIn.startOf('day').toISOString() : null,
			checkOut: checkOut ? checkOut.startOf('day').toISOString() : null,
			rooms,
		};
		if (onSubmit && typeof onSubmit === 'function') {
			onSubmit(payload);
		} else {
			// fallback
			console.log('Hotel search payload', payload);
		}
	};

	const roomsSummary = useMemo(() => {
		const totalRooms = rooms.length;
		const totalAdults = rooms.reduce((sum, r) => sum + (Number(r.adults) || 0), 0);
		const totalChildren = rooms.reduce((sum, r) => sum + (Number(r.children) || 0), 0);
		const rLabel = totalRooms === 1 ? 'Room' : 'Rooms';
		const aLabel = totalAdults === 1 ? 'Adult' : 'Adults';
		const cLabel = totalChildren === 1 ? 'Child' : 'Children';
		return `${totalRooms} ${rLabel}, ${totalAdults} ${aLabel}, ${totalChildren} ${cLabel}`;
	}, [rooms]);

	useEffect(() => {
		if (checkIn && checkOut && checkOut.isBefore(checkIn, 'day')) {
			setCheckOut(checkIn.clone());
		}
	}, [checkIn, checkOut]);

	return (
		<Box sx={{ width: '100%', minHeight: 300 }}>
			<Card elevation={3} sx={{ width: '100%', height: '100%' }}>
				<CardContent>
					<Stack spacing={3}>
						<Typography variant="h5" fontWeight={600}>
							Hotel Search
						</Typography>
						<Grid container spacing={2} alignItems="stretch" >
							<Grid item xs={12} md={6} lg={4}>
								<Autocomplete
 									fullWidth
									options={destinationOptions}
									loading={destinationLoading}
									value={selectedDestination}
									onChange={(_, newValue) => setSelectedDestination(newValue)}
									inputValue={destinationInput}
									onInputChange={(_, newInputValue) => setDestinationInput(newInputValue)}
									filterOptions={(x) => x}
									getOptionLabel={(option) => (option?.label ? String(option.label) : '')}
									renderOption={(props, option) => (
										<li {...props} key={`${option.type}-${option.value}`}>
											<Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
												<Typography variant="body2" sx={{ flexGrow: 1 }}>
													{option.label}
												</Typography>
												<Typography variant="caption" color="text.secondary">
													{option.type === 'hotel' ? 'Hotel' : 'City'}
												</Typography>
											</Stack>
										</li>
									)}
									renderInput={(params) => (
										<TextField
										sx={{ "& .MuiInputBase-root": { height: 62 , width :320 } }} // 👈 ارتفاع الخانة
											{...params}
											label="City or Hotel"
											placeholder="Search city or hotel name"
											InputProps={{
												...params.InputProps,
												startAdornment: (
													<InputAdornment position="start">
														<PlaceOutlinedIcon fontSize="small" />
													</InputAdornment>
												),
												endAdornment: (
													<>
														{destinationLoading ? <CircularProgress color="inherit" size={20} /> : null}
														{params.InputProps.endAdornment}
													</>
												),
											}}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12} md={6} lg={4}>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										border: 1,
										borderColor: 'divider',
										borderRadius: 1,
										px: 2,
										py: 1,
									}}
								>
									<CalendarMonthOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
									<LocalizationProvider dateAdapter={AdapterMoment}>
										<DatePicker
											label="Check-in"
											value={checkIn}
											onChange={(newValue) => setCheckIn(newValue)}
											shouldDisableDate={disablePast}
											format="ddd, DD MMM"
											sx={{ flex: 1 }}
											slotProps={{
												textField: {
													sx: {
														'& .MuiOutlinedInput-notchedOutline': { border: 'none' },
														'& .MuiInputBase-root': { p: 0 },
													},
												},
											}}
										/>
									</LocalizationProvider>
									<Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
									<LocalizationProvider dateAdapter={AdapterMoment}>
										<DatePicker
											label="Check-out"
											value={checkOut}
											minDate={checkIn || moment()}
											onChange={(newValue) => setCheckOut(newValue)}
											shouldDisableDate={disablePast}
											format="ddd, DD MMM"
											sx={{ flex: 1 }}
											slotProps={{
												textField: {
													sx: {
														'& .MuiOutlinedInput-notchedOutline': { border: 'none' },
														'& .MuiInputBase-root': { p: 0 },
													},
												},
											}}
										/>
									</LocalizationProvider>
								</Box>
							</Grid>
							<Grid item xs={12} md={6} lg={3} style= {{width:"320px" , height : "60px"}}>
								<Box
									onClick={handleOpenRooms}
									sx={{
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										height: '100%',
										border: 1,
										borderColor: 'divider',
										borderRadius: 1,
										px: 2,
										py: 1.25,
									}}
								>
									<GroupOutlinedIcon sx={{ mr: 1, color: 'text.secondary' }} />
									<Typography>{roomsSummary}</Typography>
								</Box>
							</Grid>
							<Grid item xs={12} md={6} lg={2}>
								<Button fullWidth variant="contained" color="error" startIcon={<SearchIcon />} onClick={handleSubmit} sx={{ height: '100%' }}>
									Search
								</Button>
							</Grid>
						</Grid>

						<Popover
							open={roomsOpen}
							anchorEl={roomsAnchorEl}
							onClose={handleCloseRooms}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							transformOrigin={{ vertical: 'top', horizontal: 'left' }}
							PaperProps={{
								sx: {
								  p: 2,
								  maxWidth: 600,
								  width: '100%',        
								  mx: 'auto' ,
								  right: '50% !important'								}
							  }}						>
							<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
								<Typography variant="h6">Rooms</Typography>
								<Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddRoom} disabled={rooms.length >= MAX_ROOMS}>
									Add room
								</Button>
							</Stack>
							<Box>
								<Grid container sx={{ display: { xs: 'none', md: 'flex' }, px: 2 }} spacing={2}>
 
								</Grid>
								<Divider sx={{ my: 1 }} />
								{rooms.map((room, index) => (
									<Box key={index}>
										<Grid container spacing={2} alignItems="center">
											<Grid item xs={12} md={2}>
												<Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between">
													<Typography variant="subtitle2">Room {index + 1}</Typography>
													<IconButton size="small" color="error" onClick={() => handleRemoveRoom(index)} disabled={rooms.length === 1}>
														<RemoveIcon fontSize="small" />
													</IconButton>
												</Stack>
											</Grid>
											<Grid item xs={6} md={2} style={{width : "60px"}}>
												<FormControl fullWidth>
													<InputLabel id={`adults-label-${index}`}>Adults</InputLabel>
													<Select
														labelId={`adults-label-${index}`}
														label="Adults"
														value={room.adults}
														onChange={(e) => handleAdultsChange(index, Number(e.target.value))}
													>
														{Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
															<MenuItem key={num} value={num}>{num}</MenuItem>
														))}
													</Select>
												</FormControl>
											</Grid>
											<Grid item xs={6} md={2} style={{width : "60px"}}>
												<FormControl fullWidth>
													<InputLabel id={`children-label-${index}`}>Children</InputLabel>
													<Select
														labelId={`children-label-${index}`}
														label="Children"
														value={room.children}
														onChange={(e) => handleChildrenChange(index, Number(e.target.value))}
													>
														{Array.from({ length: 7 }, (_, i) => i).map((num) => (
															<MenuItem key={num} value={num}>{num}</MenuItem>
														))}
													</Select>
												</FormControl>
											</Grid> <br />
											<Grid item xs={12} md={6 }>
												{room.children > 0 ? (
													<Grid container spacing={2}>
														{room.childrenAges.map((age, ageIdx) => (
															<Grid item xs={6} sm={4} md={3} lg={2} key={ageIdx}>
																<TextField
																	label={`Child ${ageIdx + 1}`}
																	type="number"
																	inputProps={{ min: 0, max: 17 }}
																	value={age}
																	onChange={(e) => handleChildAgeChange(index, ageIdx, e.target.value)}
																	fullWidth
																/>
															</Grid>
														))}
													</Grid>
												) : (
													<Typography variant="body2" color="text.secondary">No children</Typography>
												)}
											</Grid>
										</Grid>
										{index < rooms.length - 1 && <Divider sx={{ my: 2 }} />}
									</Box>
								))}
							</Box>
						</Popover>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	);
};

export default HotelForm;

