"use client"

import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Skeleton from '@mui/material/Skeleton'

const TableSkeleton = ({ rows = 5, columns = 6, withHeader = true, cellHeight = 36 }) => {
  const cols = Array.from({ length: columns })
  const rws = Array.from({ length: rows })

  return (
    <TableContainer component={Paper} elevation={0} sx={{ boxShadow: (theme) => theme.shadows[1] }}>
      <Table>
        {withHeader && (
          <TableHead>
            <TableRow>
              {cols.map((_, idx) => (
                <TableCell key={`th-${idx}`}>
                  <Skeleton variant="text" width={120} height={20} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {rws.map((_, r) => (
            <TableRow key={`tr-${r}`}>
              {cols.map((__, c) => (
                <TableCell key={`td-${r}-${c}`}>
                  <Skeleton variant="rectangular" height={cellHeight} sx={{ borderRadius: 1 }} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableSkeleton


