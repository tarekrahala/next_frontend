"use client"

import React, { useMemo, useState } from 'react'
import { Box, Stack, Typography, Rating, Chip, Paper, Button, Divider, Collapse, Avatar, IconButton } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'

function SupplierRow({ name, price, numberOfRooms, onView }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%', px: 1.5, py: 1, borderRadius: 1, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
     <Stack direction="column" spacing={0.5} alignItems="flex-start">
      <Typography variant="body2" color="text.secondary">{name}</Typography>
      <Typography variant="body2" color="text.secondary"> {numberOfRooms > 0 ? `(${numberOfRooms} rooms available)` : ''}</Typography>
     </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="subtitle2">{price}</Typography>
        <Button size="small" variant="contained" onClick={onView}>View</Button>
      </Stack>
    </Stack>
  )
}

function RoomsList({ suppliers = [] }) {
  return (
    <Stack spacing={2} sx={{ p: 2, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }}>
      {suppliers.map((s, idx) => (
        <Box key={`${s.name}-${idx}`}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{s.name}</Typography>
          <Stack spacing={1}>
            {(s.rooms || []).map((r, i) => (
              <Stack key={`${s.name}-room-${i}`} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                <Stack spacing={0.5}>
                  <Typography variant="body2" fontWeight={600}>{r.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{r.policy || 'Flexible cancellation'}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="subtitle2">{r.price}</Typography>
                  <Button size="small" variant="outlined">Select</Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

function HotelCard({
  image,
  name,
  rating = 0,
  location,
  distanceText,
  stars = 5,
  badge = 'POPULAR CHOICE',
  score = 9.1,
  reviews = 564,
  suppliers = [],
}) {
  const [open, setOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const [showAllSuppliers, setShowAllSuppliers] = useState(false)
  const imgSrc = image || '/images/products/s1.jpg'
  const visibleSuppliers = useMemo(() => (showAllSuppliers ? suppliers : suppliers.slice(0,3)), [suppliers, showAllSuppliers])
  const hasMore = suppliers.length > 4
  const fromPrice = useMemo(() => {
    const prices = suppliers.map(s => Number(String(s.price).replace(/[^0-9.]/g, ''))).filter(n => !Number.isNaN(n))
    if (!prices.length) return null
    const min = Math.min(...prices)
    return `From £${min}`
  }, [suppliers])

  return (
    <Paper sx={{ p: 2, borderRadius: 2, width: '100%' , minWidth: '990px'}}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'flex-start' }}>
        {/* Left image */}
        <Box sx={{ position: 'relative', width: { xs: '100%', md: 280 }, height: 180, overflow: 'hidden', borderRadius: 2, flexShrink: 0 }}>
          <img src={imgSrc} alt={name || 'Hotel'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        
         </Box>

        {/* Middle content */}
        <Box sx={{ flex: 1, minWidth: 0, alignSelf: 'flex-start' }}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight={700} noWrap>{name || 'Hotel Name'}</Typography>
            <Stack direction="column" spacing={0.5} alignItems="flex-start">
              <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">{distanceText || '0.2 miles to city centre'}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                <StarBorderRoundedIcon fontSize="small" />
                <Typography variant="body2">{stars} star hotel</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack spacing={0}>
                <Typography variant="subtitle1" fontWeight={700}>Outstanding</Typography>
                <Typography variant="caption" color="text.secondary">({reviews} reviews)</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 'auto' }}>
                <Rating value={Number(rating) || 0} precision={0.5} readOnly size="small" />
                <Typography variant="caption" color="text.secondary">{(Number(rating) || 0).toFixed(1)}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Right suppliers summary */}
        <Box sx={{ width: { xs: '100%', md: 320 }, flexShrink: 0 }}>
          <Stack spacing={1.25}>
            <Box sx={{ maxHeight: 260, overflowY: 'auto', pr: 0.5 }}>
              <Stack spacing={1.25}>
                {visibleSuppliers.map((s, i) => (
                  <SupplierRow
                    key={`${s.name}-${i}`}
                    name={s.name}
                    price={s.price}
                    numberOfRooms={(s.rooms || []).length}
                    onView={() => {
                      setSelectedSupplier(s)
                      setOpen(true)
                    }}
                  />
                ))}
              </Stack>
            </Box>
            {hasMore && (
              <Button size="small" variant="text" onClick={() => setShowAllSuppliers(v => !v)}>
                {showAllSuppliers ? 'Show fewer suppliers' : `Show more suppliers (+${suppliers.length - 4})`}
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (selectedSupplier) {
                  setSelectedSupplier(null)
                  setOpen(true)
                } else {
                  setOpen(v => !v)
                }
              }}
            >
              {selectedSupplier ? 'View all rooms' : (open ? 'Hide rooms' : 'View rooms')}
            </Button>
          </Stack>
        </Box>
      </Stack>

      {/* Rooms collapse */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider sx={{ my: 2 }} />
        <RoomsList suppliers={selectedSupplier ? [selectedSupplier] : suppliers} />
      </Collapse>
    </Paper>
  )
}

export default HotelCard


