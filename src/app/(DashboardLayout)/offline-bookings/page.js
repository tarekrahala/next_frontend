 "use client"
 
import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material'
import Link from 'next/link'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined'
const dummyData = [
    {
        "id": 70,
        "tenant_user_id": 7,
        "booking_date": "2025-08-23T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Abul Kalam Mohammad",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Boudl Al Munsiyah Hotel",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-24T00:00:00.000000Z",
        "check_out_date": "2025-08-28T00:00:00.000000Z",
        "number_of_nights": 4,
        "meal": "BB",
        "original_net": "1673.84",
        "hcn": "349904064",
        "category": "Junior Suite",
        "pax": 1,
        "net_cost": "1673.84",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1880.00",
        "profit": "206.16",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086811",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016125101",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-23T13:38:06.000000Z",
        "updated_at": "2025-08-23T13:38:06.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 71,
        "tenant_user_id": 7,
        "booking_date": "2025-08-23T00:00:00.000000Z",
        "sender": "Jean Ventura",
        "account": "ICAD",
        "cta": "MBL - MOD Project\nDone under account MBL CTA",
        "lpo": null,
        "guest_name": "Ghassan Sayegh",
        "client_type": "NORMAL",
        "destination": "Italy",
        "hotel_name": "BRISTOL PALACE GENOA",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-24T00:00:00.000000Z",
        "check_out_date": "2025-08-26T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "BB",
        "original_net": "1808.68",
        "hcn": "S202508230009",
        "category": "Suite",
        "pax": 1,
        "net_cost": "6782.55",
        "currency_from": "USD",
        "currency_to": "SAR",
        "conversion_rate": "3.7500",
        "selling_price": "8100.00",
        "profit": "1317.45",
        "supplier": "Smile",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "1402260H20250823",
        "ticket_number": null,
        "traacs_number": "HV25086810",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016106001",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-23T13:42:05.000000Z",
        "updated_at": "2025-08-23T13:42:05.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 69,
        "tenant_user_id": 7,
        "booking_date": "2025-08-22T00:00:00.000000Z",
        "sender": "Mona",
        "account": "First Fix",
        "cta": null,
        "lpo": null,
        "guest_name": "Tarek Al Halabi",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-22T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "931.50",
        "hcn": null,
        "category": "Economy",
        "pax": 1,
        "net_cost": "931.50",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1035.00",
        "profit": "103.50",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Amadues",
        "reference": "83BUFT",
        "ticket_number": "065 3001711216",
        "traacs_number": "3001711216",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-22T10:40:43.000000Z",
        "updated_at": "2025-08-22T10:40:43.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 59,
        "tenant_user_id": 9,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": null,
        "guest_name": "mohammed khalil // abdullah kassan",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Millennium Makkah Al Naseem",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-23T00:00:00.000000Z",
        "check_out_date": "2025-08-24T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "446.17",
        "hcn": "M203S4",
        "category": null,
        "pax": 2,
        "net_cost": "446.17",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "520.00",
        "profit": "73.83",
        "supplier": "TBO",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "M203S4",
        "ticket_number": null,
        "traacs_number": "HV25086800",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016047002",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T08:20:31.000000Z",
        "updated_at": "2025-08-21T08:20:31.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 60,
        "tenant_user_id": 9,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "JOHARUDEEN/HAROON",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-26T00:00:00.000000Z",
        "check_out_date": "2025-09-11T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "990.00",
        "hcn": null,
        "category": "y",
        "pax": 1,
        "net_cost": "990.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1090.00",
        "profit": "100.00",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "7S66V4",
        "ticket_number": "3001688680",
        "traacs_number": "3001688680",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016046223",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T09:12:59.000000Z",
        "updated_at": "2025-08-21T09:12:59.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 61,
        "tenant_user_id": 9,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": null,
        "lpo": null,
        "guest_name": "muhammad hayat",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Makarim Palm Hotel",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-23T00:00:00.000000Z",
        "check_out_date": "2025-08-28T00:00:00.000000Z",
        "number_of_nights": 5,
        "meal": "BB",
        "original_net": "883.31",
        "hcn": "3LAMXL",
        "category": null,
        "pax": 1,
        "net_cost": "883.31",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1050.00",
        "profit": "166.69",
        "supplier": "TBO",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "3LAMXL",
        "ticket_number": null,
        "traacs_number": "HV25086801",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016040056",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T10:55:43.000000Z",
        "updated_at": "2025-08-21T10:55:43.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 62,
        "tenant_user_id": 11,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Hanin",
        "account": "MBL",
        "cta": "Employee number: 8767\nProject information: 119 PLANNING & RISK MANAGEMENT DEPT",
        "lpo": null,
        "guest_name": "Mohamed Helmy Mohamed Farag",
        "client_type": "NORMAL",
        "destination": "Mecca",
        "hotel_name": "Millennium Makkah Al Naseem",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-23T00:00:00.000000Z",
        "check_out_date": "2025-08-28T00:00:00.000000Z",
        "number_of_nights": 5,
        "meal": "HB",
        "original_net": "1275.00",
        "hcn": "144263",
        "category": "Standard",
        "pax": 1,
        "net_cost": "1275.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1900.00",
        "profit": "625.00",
        "supplier": "Smart Booking",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "#: SB165912",
        "ticket_number": null,
        "traacs_number": null,
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015447371",
        "vat_invoice": "done vat",
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T11:57:58.000000Z",
        "updated_at": "2025-08-21T11:57:58.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 63,
        "tenant_user_id": 9,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": null,
        "lpo": null,
        "guest_name": "muhammad gul",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "Al Muhaidb Al Hamra",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-09-01T00:00:00.000000Z",
        "check_out_date": "2025-09-06T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "1267.15",
        "hcn": "415301855",
        "category": null,
        "pax": 1,
        "net_cost": "1267.15",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1450.00",
        "profit": "182.85",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "415301855",
        "ticket_number": null,
        "traacs_number": "HV25086803",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016040192",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T12:30:31.000000Z",
        "updated_at": "2025-08-21T12:30:31.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 64,
        "tenant_user_id": 12,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": "•\tEmployee Number: 12887\n•\tProject/Department:  KAP  -  1020060\n•\tPurpose of Trip: transfer",
        "lpo": null,
        "guest_name": "Mr. MD Waliullah MD Sharfraraj",
        "client_type": "NORMAL",
        "destination": "makkah",
        "hotel_name": "Makarim Palm Hotel",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-23T00:00:00.000000Z",
        "check_out_date": "2025-08-28T00:00:00.000000Z",
        "number_of_nights": 5,
        "meal": "BB",
        "original_net": "910.00",
        "hcn": "C29NL1",
        "category": "Classic Single Room",
        "pax": 1,
        "net_cost": "910.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "1050.00",
        "profit": "140.00",
        "supplier": "TBO",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": null,
        "ticket_number": null,
        "traacs_number": null,
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T12:33:17.000000Z",
        "updated_at": "2025-08-21T12:33:17.000000Z",
        "tenant_user": {
            "id": 12,
            "name": "Abdulrahman Sherif",
            "email": "Abdelrahman.Shiref@rahala.com.sa"
        }
    },
    {
        "id": 65,
        "tenant_user_id": 12,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": "•\tEmployee Number: 16032\nProject/Department: 1020100  -   JCD SPMI - ADDENDUM\n•\tPurpose of Trip: Recruitment",
        "lpo": null,
        "guest_name": "Vinod Madam Varansai",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "Ewa express Alhamra - Jeddah",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-23T00:00:00.000000Z",
        "check_out_date": "2025-08-31T00:00:00.000000Z",
        "number_of_nights": 8,
        "meal": "BB",
        "original_net": "2168.90",
        "hcn": "414878541 / extend",
        "category": "standard",
        "pax": 1,
        "net_cost": "2168.90",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "2800.00",
        "profit": "631.10",
        "supplier": null,
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": null,
        "ticket_number": null,
        "traacs_number": null,
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T13:00:11.000000Z",
        "updated_at": "2025-08-21T13:00:11.000000Z",
        "tenant_user": {
            "id": 12,
            "name": "Abdulrahman Sherif",
            "email": "Abdelrahman.Shiref@rahala.com.sa"
        }
    },
    {
        "id": 66,
        "tenant_user_id": 10,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Mohamed Khaled Mohamed Bahaaeldin",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "ملاذ فاخر",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-24T00:00:00.000000Z",
        "check_out_date": "2025-08-27T00:00:00.000000Z",
        "number_of_nights": 3,
        "meal": "RO",
        "original_net": "600.00",
        "hcn": "TBA",
        "category": "standard",
        "pax": 1,
        "net_cost": "600.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "690.00",
        "profit": "90.00",
        "supplier": null,
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086806",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T16:08:30.000000Z",
        "updated_at": "2025-08-21T16:08:30.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 67,
        "tenant_user_id": 10,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "Ahmed Anis Mansour",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "Holiday Plus Al-Salamah",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-23T00:00:00.000000Z",
        "check_out_date": "2025-08-30T00:00:00.000000Z",
        "number_of_nights": 7,
        "meal": "RO",
        "original_net": "1127.00",
        "hcn": "LEMH03646",
        "category": "standard",
        "pax": 1,
        "net_cost": "1127.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "1330.00",
        "profit": "203.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEMH03646",
        "ticket_number": null,
        "traacs_number": "HV25086807",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016050553",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T18:31:57.000000Z",
        "updated_at": "2025-08-21T18:31:57.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 68,
        "tenant_user_id": 10,
        "booking_date": "2025-08-21T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Faisal Waseem Iqbal / Mohammad Shoiab",
        "client_type": "NORMAL",
        "destination": "tabuk",
        "hotel_name": "City Landmark Hotel",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-24T00:00:00.000000Z",
        "check_out_date": "2025-08-26T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "RO",
        "original_net": "848.00",
        "hcn": "LEMH03647",
        "category": "standard",
        "pax": 2,
        "net_cost": "848.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "940.00",
        "profit": "92.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEMH03647",
        "ticket_number": null,
        "traacs_number": "HV25086808",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000016050421",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-21T19:02:28.000000Z",
        "updated_at": "2025-08-21T19:04:36.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 56,
        "tenant_user_id": 10,
        "booking_date": "2025-08-20T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": null,
        "guest_name": "Samer Mustapha",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "landmark",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-20T00:00:00.000000Z",
        "check_out_date": "2025-08-23T00:00:00.000000Z",
        "number_of_nights": 3,
        "meal": "RO",
        "original_net": "540.00",
        "hcn": "25000379",
        "category": "standard",
        "pax": 1,
        "net_cost": "540.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "690.00",
        "profit": "150.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "25000379",
        "ticket_number": null,
        "traacs_number": "HV25086797",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015969001",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-20T10:00:07.000000Z",
        "updated_at": "2025-08-20T12:17:35.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 57,
        "tenant_user_id": 11,
        "booking_date": "2025-08-20T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": "#11276 #J0256",
        "guest_name": "Samer Ilyas Farah",
        "client_type": "NORMAL",
        "destination": "Riyadh",
        "hotel_name": "Muhaidb Jawazat 1",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-23T00:00:00.000000Z",
        "check_out_date": "2025-08-25T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "BB",
        "original_net": "589.37",
        "hcn": "415282749",
        "category": "standard",
        "pax": 1,
        "net_cost": "589.37",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "670.00",
        "profit": "80.63",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "415282749",
        "ticket_number": null,
        "traacs_number": "HV25086796",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015968036",
        "vat_invoice": "Done",
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-20T12:09:31.000000Z",
        "updated_at": "2025-08-20T12:09:31.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 58,
        "tenant_user_id": 7,
        "booking_date": "2025-08-20T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "Abdullah Wahib",
        "client_type": "NORMAL",
        "destination": "Jeddah",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-24T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "351.90",
        "hcn": null,
        "category": "Economy",
        "pax": 1,
        "net_cost": "351.90",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "400.00",
        "profit": "48.10",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Amadues",
        "reference": "7LTRA5",
        "ticket_number": "065 3001667032",
        "traacs_number": "3001667032",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-20T16:00:49.000000Z",
        "updated_at": "2025-08-20T16:00:49.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 53,
        "tenant_user_id": 11,
        "booking_date": "2025-08-19T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": "Employee Number: 16052\nProject/Department: 1020097  -  JCD - OPERA HOUSE\nPurpose of Trip: Recruitment",
        "lpo": null,
        "guest_name": "VAN DILLEN BENJAMIN JAMES",
        "client_type": "NORMAL",
        "destination": "Jeddah",
        "hotel_name": "Ewaa Express Al-Hamra",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-25T00:00:00.000000Z",
        "check_out_date": "2025-08-31T00:00:00.000000Z",
        "number_of_nights": 6,
        "meal": "BB",
        "original_net": "1768.12",
        "hcn": "415265175",
        "category": "standard",
        "pax": 1,
        "net_cost": "1768.12",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "2100.00",
        "profit": "331.88",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "415265175",
        "ticket_number": null,
        "traacs_number": "HV25086791",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015900125",
        "vat_invoice": "Done",
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-19T12:44:27.000000Z",
        "updated_at": "2025-08-19T12:44:27.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 54,
        "tenant_user_id": 9,
        "booking_date": "2025-08-19T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "Ravi Soundararajan",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-23T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "515.00",
        "hcn": null,
        "category": "j",
        "pax": 1,
        "net_cost": "515.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "567.00",
        "profit": "52.00",
        "supplier": "Offline Supplier",
        "offline_supplier_name": "airindia",
        "payment": "Credit",
        "reference": "7CW54G000",
        "ticket_number": "7CW54G000",
        "traacs_number": "7CW54G000",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015903001",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-19T14:08:29.000000Z",
        "updated_at": "2025-08-19T14:08:29.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 55,
        "tenant_user_id": 12,
        "booking_date": "2025-08-19T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Mr. Hassan Allouch",
        "client_type": "NORMAL",
        "destination": "dammam",
        "hotel_name": "Braira Al Dammam",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-19T00:00:00.000000Z",
        "check_out_date": "2025-08-20T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "446.00",
        "hcn": "HZ8174",
        "category": "Deluxe king room",
        "pax": 1,
        "net_cost": "446.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "550.00",
        "profit": "104.00",
        "supplier": "Smart Booking",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "SB165855",
        "ticket_number": null,
        "traacs_number": "HV25086792",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-19T14:17:08.000000Z",
        "updated_at": "2025-08-19T14:20:55.000000Z",
        "tenant_user": {
            "id": 12,
            "name": "Abdulrahman Sherif",
            "email": "Abdelrahman.Shiref@rahala.com.sa"
        }
    },
    {
        "id": 43,
        "tenant_user_id": 11,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Mr. Hassan Allouch",
        "client_type": "NORMAL",
        "destination": "dammam",
        "hotel_name": "Braira Dammam",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-18T00:00:00.000000Z",
        "check_out_date": "2025-08-19T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "538.00",
        "hcn": "349827076",
        "category": "Premium room",
        "pax": 1,
        "net_cost": "538.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "600.00",
        "profit": "62.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEMH03503",
        "ticket_number": null,
        "traacs_number": "HV25086773",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015753005",
        "vat_invoice": "done vat",
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-18T07:53:42.000000Z",
        "updated_at": "2025-08-18T11:17:56.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 44,
        "tenant_user_id": 9,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": null,
        "guest_name": "hassan abbass  ahmed hussein",
        "client_type": "NORMAL",
        "destination": "Mecca",
        "hotel_name": "Four Points by Sheraton Makkah Al Naseem",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-18T00:00:00.000000Z",
        "check_out_date": "2025-08-20T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "BB",
        "original_net": "713.10",
        "hcn": "W1E8QL",
        "category": null,
        "pax": 2,
        "net_cost": "713.10",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1020.00",
        "profit": "306.90",
        "supplier": "TBO",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "W1E8QL",
        "ticket_number": null,
        "traacs_number": "HV25086775",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015825519",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T09:14:52.000000Z",
        "updated_at": "2025-08-18T09:14:52.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 45,
        "tenant_user_id": 9,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Jean Ventura",
        "account": "ICAD",
        "cta": null,
        "lpo": null,
        "guest_name": "BAPARE/ASHEK MR",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": null,
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "204.00",
        "hcn": null,
        "category": "u",
        "pax": 1,
        "net_cost": "204.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "270.00",
        "profit": "66.00",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "7RWCF6",
        "ticket_number": "1921035103",
        "traacs_number": "1921035103",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000013106583",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T09:47:32.000000Z",
        "updated_at": "2025-08-18T09:47:32.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 46,
        "tenant_user_id": 9,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Jean Ventura",
        "account": "ICAD",
        "cta": null,
        "lpo": null,
        "guest_name": "MUSLEH/KHALIL MR",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": null,
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "204.00",
        "hcn": null,
        "category": "u",
        "pax": 1,
        "net_cost": "204.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "270.00",
        "profit": "66.00",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "7RWCF6",
        "ticket_number": "1921035104",
        "traacs_number": "1921035104",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000013106583",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T09:48:57.000000Z",
        "updated_at": "2025-08-18T09:48:57.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 47,
        "tenant_user_id": 10,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": null,
        "guest_name": "Samer Mustapha",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "Diwan Residence Hotel Alnaeem",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-19T00:00:00.000000Z",
        "check_out_date": "2025-08-20T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "250.00",
        "hcn": null,
        "category": "standard",
        "pax": 1,
        "net_cost": "250.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "370.00",
        "profit": "120.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086779",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T12:19:32.000000Z",
        "updated_at": "2025-08-18T12:19:32.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 48,
        "tenant_user_id": 11,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Jean Ventura",
        "account": "ICAD",
        "cta": null,
        "lpo": null,
        "guest_name": "Mr. Marc Willi Lindike",
        "client_type": "NORMAL",
        "destination": "Jeddah",
        "hotel_name": "Radisson Blu Hotel, Jeddah Al Salam",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-28T00:00:00.000000Z",
        "check_out_date": "2025-09-06T00:00:00.000000Z",
        "number_of_nights": 9,
        "meal": "BB",
        "original_net": "5112.00",
        "hcn": "0138384545",
        "category": "standard",
        "pax": 1,
        "net_cost": "5112.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "6300.00",
        "profit": "1188.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEMH03528",
        "ticket_number": null,
        "traacs_number": "HV25086781",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015873194",
        "vat_invoice": "Done",
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-18T14:08:32.000000Z",
        "updated_at": "2025-08-19T06:56:58.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 49,
        "tenant_user_id": 7,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": "Business trip 1020070\nID: 14444",
        "lpo": null,
        "guest_name": "Ibrahim ElSharkawy",
        "client_type": "NORMAL",
        "destination": "Jeddah",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-19T00:00:00.000000Z",
        "check_out_date": "2025-08-19T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "1020.15",
        "hcn": null,
        "category": "Economy",
        "pax": 1,
        "net_cost": "1020.15",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1150.00",
        "profit": "129.85",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Amadues",
        "reference": "75UNBL",
        "ticket_number": "593 3001602797",
        "traacs_number": "3001602797",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T18:39:05.000000Z",
        "updated_at": "2025-08-18T18:39:05.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 50,
        "tenant_user_id": 7,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": "Business trip 1020070\nID: 14444",
        "lpo": null,
        "guest_name": "Ibrahim ElSharkawy",
        "client_type": "NORMAL",
        "destination": "Jeddah",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-19T00:00:00.000000Z",
        "check_out_date": "2025-08-19T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "378.35",
        "hcn": null,
        "category": "Economy",
        "pax": 1,
        "net_cost": "378.35",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "450.00",
        "profit": "71.65",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Amadues",
        "reference": "75UNBL",
        "ticket_number": "065 3001602798",
        "traacs_number": "3001602798",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T18:41:53.000000Z",
        "updated_at": "2025-08-18T18:41:53.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 51,
        "tenant_user_id": 7,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Jean Ventura",
        "account": "ICAD",
        "cta": null,
        "lpo": null,
        "guest_name": "Ghassan Sayegh",
        "client_type": "NORMAL",
        "destination": "Jeddah",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-10-10T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "16.00",
        "hcn": null,
        "category": "Business",
        "pax": 1,
        "net_cost": "16.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "120.00",
        "profit": "104.00",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Amadues",
        "reference": "8KAH5W",
        "ticket_number": "076 3001602799",
        "traacs_number": "3001602799",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T20:07:30.000000Z",
        "updated_at": "2025-08-18T20:07:30.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 52,
        "tenant_user_id": 14,
        "booking_date": "2025-08-18T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": "•\tEmployee Number:   10882 \nProject/Department: 1020096   -  JCD   Oceanarium\n•\tPurpose of Trip:  Business Trip",
        "lpo": null,
        "guest_name": "Mr. Ahmed Elshazli",
        "client_type": "NORMAL",
        "destination": "jed",
        "hotel_name": "Al Muhaidib Al Hamra",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-19T00:00:00.000000Z",
        "check_out_date": "2025-08-25T00:00:00.000000Z",
        "number_of_nights": 6,
        "meal": "BB",
        "original_net": "1520.58",
        "hcn": "415247815",
        "category": null,
        "pax": 1,
        "net_cost": "1520.58",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "1740.00",
        "profit": "219.42",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "415247815",
        "ticket_number": null,
        "traacs_number": "HV25086783",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-19T07:56:52.000000Z",
        "updated_at": "2025-08-19T09:20:20.000000Z",
        "tenant_user": {
            "id": 14,
            "name": "Raneem Yousef",
            "email": "Raneem.Yousef@rahala.com.sa"
        }
    },
    {
        "id": 23,
        "tenant_user_id": 10,
        "booking_date": "2025-08-17T00:00:00.000000Z",
        "sender": "Hanin",
        "account": "MBL",
        "cta": "Employee number: 8767\nProject information: 119 PLANNING & RISK MANAGEMENT DEPT",
        "lpo": null,
        "guest_name": "Mohamed Helmy Farag",
        "client_type": "NORMAL",
        "destination": "makkah",
        "hotel_name": "Four points Makkah AL Nassim",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-21T00:00:00.000000Z",
        "number_of_nights": 5,
        "meal": "BB",
        "original_net": "891.33",
        "hcn": "SROQB5",
        "category": "standard",
        "pax": 1,
        "net_cost": "891.33",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "1200.00",
        "profit": "308.67",
        "supplier": "TBO",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "SROQB5",
        "ticket_number": null,
        "traacs_number": "HV25086771",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015447371",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-14T12:43:48.000000Z",
        "updated_at": "2025-08-18T07:35:00.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 24,
        "tenant_user_id": 10,
        "booking_date": "2025-08-17T00:00:00.000000Z",
        "sender": "Hanin",
        "account": "MBL",
        "cta": "Employee ID: 2660\nDepartment information:\n1020015       L01 project",
        "lpo": null,
        "guest_name": "Fouad Gharizi",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Ramada By Wyndham Riyadh",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-25T00:00:00.000000Z",
        "check_out_date": "2025-08-26T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "661.00",
        "hcn": "LEMH03441",
        "category": "standard",
        "pax": 1,
        "net_cost": "661.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "730.00",
        "profit": "69.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEMH03441",
        "ticket_number": null,
        "traacs_number": "HV25086772",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000010571001",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-14T12:49:44.000000Z",
        "updated_at": "2025-08-18T07:44:58.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 38,
        "tenant_user_id": 11,
        "booking_date": "2025-08-17T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": "•\tEmployee Number: 13331\n•\tProject/Department: 1020097  -  JCD - OPERA HOUSE\n•\tPurpose of Trip: Transfer",
        "lpo": null,
        "guest_name": "Mohamed Jaffar",
        "client_type": "NORMAL",
        "destination": "Jeddah",
        "hotel_name": "Muhaidb Al Hamra",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-18T00:00:00.000000Z",
        "check_out_date": "2025-08-23T00:00:00.000000Z",
        "number_of_nights": 5,
        "meal": "BB",
        "original_net": "1267.16",
        "hcn": "415227676",
        "category": "standard",
        "pax": 1,
        "net_cost": "1267.16",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1450.00",
        "profit": "182.84",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "415227676",
        "ticket_number": null,
        "traacs_number": "HV25086763",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015862281",
        "vat_invoice": "done",
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-17T12:41:12.000000Z",
        "updated_at": "2025-08-17T12:41:12.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 39,
        "tenant_user_id": 10,
        "booking_date": "2025-08-17T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Faisal Aljabr",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "Hayatt House Jeddah",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-18T00:00:00.000000Z",
        "check_out_date": "2025-08-21T00:00:00.000000Z",
        "number_of_nights": 3,
        "meal": "BB",
        "original_net": "1449.00",
        "hcn": "798617",
        "category": "standard",
        "pax": 1,
        "net_cost": "1449.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "1755.00",
        "profit": "306.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "798617",
        "ticket_number": null,
        "traacs_number": "HV25086764",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-17T13:02:16.000000Z",
        "updated_at": "2025-08-17T13:02:16.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 40,
        "tenant_user_id": 9,
        "booking_date": "2025-08-17T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": null,
        "guest_name": "Wissam Kaddah",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Al Muhaidb Residence Jawazat 2",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-20T00:00:00.000000Z",
        "check_out_date": "2025-08-21T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "341.83",
        "hcn": "415228183",
        "category": null,
        "pax": 1,
        "net_cost": "341.83",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "390.00",
        "profit": "48.17",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "415228183",
        "ticket_number": null,
        "traacs_number": "HV25086765",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015814429",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-17T13:29:50.000000Z",
        "updated_at": "2025-08-18T07:39:16.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 41,
        "tenant_user_id": 9,
        "booking_date": "2025-08-17T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "SHEHATA/MOHAMED MR",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": null,
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "442.75",
        "hcn": null,
        "category": "u",
        "pax": 1,
        "net_cost": "442.75",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "505.00",
        "profit": "505.00",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "9U2YR6",
        "ticket_number": "3001587445",
        "traacs_number": "3001587445",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015818922",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T06:18:48.000000Z",
        "updated_at": "2025-08-18T06:18:48.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 42,
        "tenant_user_id": 9,
        "booking_date": "2025-08-17T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "SHEHATA/MOHAMED MR",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": null,
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "381.80",
        "hcn": null,
        "category": "u",
        "pax": 1,
        "net_cost": "381.80",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "425.00",
        "profit": "43.20",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "9U7FTL",
        "ticket_number": "3001587447",
        "traacs_number": "3001587447",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015814556",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-18T06:20:05.000000Z",
        "updated_at": "2025-08-18T06:20:05.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 28,
        "tenant_user_id": 9,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": null,
        "guest_name": "hassan abbass // ahmed hussein",
        "client_type": "NORMAL",
        "destination": "makkah",
        "hotel_name": "Four Points by Sheraton Makkah Al Naseem",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-18T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "BB",
        "original_net": "713.10",
        "hcn": "HV25086757",
        "category": null,
        "pax": 2,
        "net_cost": "713.10",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1020.00",
        "profit": "306.90",
        "supplier": "TBO",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "MWCIGI",
        "ticket_number": null,
        "traacs_number": "HV25086757",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015825519",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-16T08:23:06.000000Z",
        "updated_at": "2025-08-16T08:23:06.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 29,
        "tenant_user_id": 9,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Yahia Asiri",
        "account": "Power Support",
        "cta": null,
        "lpo": null,
        "guest_name": "TAIMOOR/MUHAMMAD AHMAD",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-22T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "529.00",
        "hcn": null,
        "category": "u",
        "pax": 1,
        "net_cost": "529.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "640.00",
        "profit": "111.00",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "9ISH6Q",
        "ticket_number": "3001569550",
        "traacs_number": "3001569550",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015818373",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-16T08:39:02.000000Z",
        "updated_at": "2025-08-16T08:39:02.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 30,
        "tenant_user_id": 9,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Yahia Asiri",
        "account": "Power Support",
        "cta": null,
        "lpo": null,
        "guest_name": "ABDULLAH/HAFIZ MUHAMMAD",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-22T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "529.00",
        "hcn": null,
        "category": "u",
        "pax": 1,
        "net_cost": "529.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "640.00",
        "profit": "111.00",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "9ISH6Q",
        "ticket_number": "3001531699",
        "traacs_number": "3001531699",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015818373",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-16T08:40:31.000000Z",
        "updated_at": "2025-08-16T08:40:31.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 31,
        "tenant_user_id": 9,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "MUSTAPHA/AHMAD",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-17T00:00:00.000000Z",
        "check_out_date": "2025-08-19T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "1667.50",
        "hcn": null,
        "category": "u",
        "pax": 1,
        "net_cost": "1667.50",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1920.00",
        "profit": "252.50",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "9KH6HO",
        "ticket_number": "3001569604",
        "traacs_number": "3001569604",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015824580",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-16T12:31:15.000000Z",
        "updated_at": "2025-08-16T12:31:15.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 32,
        "tenant_user_id": 7,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "Fares Kazzaz",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "1705.45",
        "hcn": null,
        "category": "Economy",
        "pax": 1,
        "net_cost": "1705.45",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1877.00",
        "profit": "171.55",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Amadues",
        "reference": "9DA4WX",
        "ticket_number": "3001531669",
        "traacs_number": "3001531669",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-16T12:31:56.000000Z",
        "updated_at": "2025-08-16T12:31:56.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 33,
        "tenant_user_id": 7,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Ashiq",
        "account": "MSB",
        "cta": null,
        "lpo": null,
        "guest_name": "Mhdmazen Nassif",
        "client_type": "VIP",
        "destination": "Jeddah",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-24T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "480.70",
        "hcn": null,
        "category": "Economy",
        "pax": 1,
        "net_cost": "480.70",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "580.00",
        "profit": "99.30",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Amadues",
        "reference": "9K7EWS",
        "ticket_number": "065 3001569592",
        "traacs_number": "3001569592",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-16T13:39:28.000000Z",
        "updated_at": "2025-08-16T13:39:28.000000Z",
        "tenant_user": {
            "id": 7,
            "name": "Karim Assem",
            "email": "karim.kassem@rahala.com.sa"
        }
    },
    {
        "id": 34,
        "tenant_user_id": 9,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Salim Rifai",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Boudl Al Munsiyah Hotel",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-17T00:00:00.000000Z",
        "check_out_date": "2025-08-19T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "BB",
        "original_net": "836.92",
        "hcn": "349809879",
        "category": null,
        "pax": 1,
        "net_cost": "836.92",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "940.00",
        "profit": "103.08",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086758",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015829517",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-17T06:13:38.000000Z",
        "updated_at": "2025-08-17T07:13:52.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 35,
        "tenant_user_id": 9,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Youssef Magdy Saeid Abdelghany",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Boudl Al Munsiyah Hotel",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-17T00:00:00.000000Z",
        "check_out_date": "2025-08-21T00:00:00.000000Z",
        "number_of_nights": 4,
        "meal": "BB",
        "original_net": "1673.84",
        "hcn": "349810051",
        "category": null,
        "pax": 1,
        "net_cost": "1673.84",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1880.00",
        "profit": "206.16",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086759",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015824735",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-17T06:17:23.000000Z",
        "updated_at": "2025-08-17T07:14:22.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 36,
        "tenant_user_id": 9,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Abul Kalam Mohammad",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Boudl Al Munsiyah Hotel",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-17T00:00:00.000000Z",
        "check_out_date": "2025-08-21T00:00:00.000000Z",
        "number_of_nights": 4,
        "meal": "BB",
        "original_net": "1673.84",
        "hcn": "349810132",
        "category": null,
        "pax": 1,
        "net_cost": "1673.84",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1880.00",
        "profit": "206.16",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086760",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015824735",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-17T06:23:01.000000Z",
        "updated_at": "2025-08-17T07:14:01.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 37,
        "tenant_user_id": 11,
        "booking_date": "2025-08-16T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": "#11276 #J0256",
        "guest_name": "Samer Ilyas Farah",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Muhaidb Jawazat 1",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-18T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "BB",
        "original_net": "589.37",
        "hcn": "415188188",
        "category": "standard",
        "pax": 1,
        "net_cost": "589.37",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "670.00",
        "profit": "80.63",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "415188188",
        "ticket_number": null,
        "traacs_number": "HV25086761",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015825163",
        "vat_invoice": "done",
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-17T08:49:16.000000Z",
        "updated_at": "2025-08-17T08:49:16.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 20,
        "tenant_user_id": 12,
        "booking_date": "2025-08-14T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "SAMI FAKHRY",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Dana Hotel Residence 2",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-14T00:00:00.000000Z",
        "check_out_date": "2025-08-21T00:00:00.000000Z",
        "number_of_nights": 7,
        "meal": "RO",
        "original_net": "2450.00",
        "hcn": "0576271545",
        "category": "standard",
        "pax": 1,
        "net_cost": "2450.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "2800.00",
        "profit": "350.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086749",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-14T10:32:48.000000Z",
        "updated_at": "2025-08-14T10:32:48.000000Z",
        "tenant_user": {
            "id": 12,
            "name": "Abdulrahman Sherif",
            "email": "Abdelrahman.Shiref@rahala.com.sa"
        }
    },
    {
        "id": 21,
        "tenant_user_id": 11,
        "booking_date": "2025-08-14T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "Muhammad Touseef Muhammad",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Golden Dune Hotel Al Malz",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-21T00:00:00.000000Z",
        "number_of_nights": 5,
        "meal": "BB",
        "original_net": "1200.00",
        "hcn": "tba",
        "category": "standard",
        "pax": 1,
        "net_cost": "1200.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1400.00",
        "profit": "200.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": "tba",
        "ticket_number": null,
        "traacs_number": "HV25086751",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015670002",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-14T10:36:08.000000Z",
        "updated_at": "2025-08-14T10:36:08.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 22,
        "tenant_user_id": 10,
        "booking_date": "2025-08-14T00:00:00.000000Z",
        "sender": "Mohannad",
        "account": "MBL",
        "cta": "•\tProject/Department: 1020107\n•\tPurpose of Trip: Transfer",
        "lpo": null,
        "guest_name": "SIVAKUMAR PERIASAMY + 6 Pax",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "BUS",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-16T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "1295.00",
        "hcn": "TBA",
        "category": "standard",
        "pax": 7,
        "net_cost": "1295.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "1540.00",
        "profit": "245.00",
        "supplier": null,
        "offline_supplier_name": null,
        "payment": "New NCB",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "CV25080556",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015754860",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-14T12:25:07.000000Z",
        "updated_at": "2025-08-14T12:32:54.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 25,
        "tenant_user_id": 10,
        "booking_date": "2025-08-14T00:00:00.000000Z",
        "sender": "Hanin",
        "account": "MBL",
        "cta": "Employee ID: 2660\nDepartment information:\n1020015       L01 project",
        "lpo": null,
        "guest_name": "Fouad Gharizi",
        "client_type": "NORMAL",
        "destination": "tabuk",
        "hotel_name": "Holiday Inn Tabuk",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-26T00:00:00.000000Z",
        "check_out_date": "2025-08-27T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "404.00",
        "hcn": "LEMH03443",
        "category": "standard",
        "pax": 1,
        "net_cost": "404.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "510.00",
        "profit": "106.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEMH03443",
        "ticket_number": null,
        "traacs_number": "HV25086774",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000010571001",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-14T12:52:26.000000Z",
        "updated_at": "2025-08-18T07:59:27.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 26,
        "tenant_user_id": 9,
        "booking_date": "2025-08-14T00:00:00.000000Z",
        "sender": "Hanin",
        "account": "MBL",
        "cta": null,
        "lpo": null,
        "guest_name": "mohammed sulaiman masri",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "Ramada by Wyndham",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-17T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "568.47",
        "hcn": "ATALU0",
        "category": null,
        "pax": 1,
        "net_cost": "568.47",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "655.00",
        "profit": "86.53",
        "supplier": "TBO",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "ATALU0",
        "ticket_number": null,
        "traacs_number": "HV25086754",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015838126",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-14T18:55:05.000000Z",
        "updated_at": "2025-08-17T08:27:31.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 27,
        "tenant_user_id": 9,
        "booking_date": "2025-08-14T00:00:00.000000Z",
        "sender": "Hanin",
        "account": "MBL",
        "cta": null,
        "lpo": null,
        "guest_name": "MASRI/MOHAMMED SULAIMAN",
        "client_type": "NORMAL",
        "destination": "jed/ruh/jed",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-17T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "4718.45",
        "hcn": null,
        "category": "jj",
        "pax": 1,
        "net_cost": "4718.45",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "5588.00",
        "profit": "869.55",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "95OR6Q",
        "ticket_number": "3001531656",
        "traacs_number": "3001531656",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015838126",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-14T18:57:49.000000Z",
        "updated_at": "2025-08-14T18:57:49.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 15,
        "tenant_user_id": 11,
        "booking_date": "2025-08-13T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Hassan Allouch",
        "client_type": "NORMAL",
        "destination": "dammam",
        "hotel_name": "Braira Dammam",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-17T00:00:00.000000Z",
        "check_out_date": "2025-08-18T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "431.00",
        "hcn": "14733222802",
        "category": "Deluxe king room",
        "pax": 1,
        "net_cost": "431.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "480.00",
        "profit": "49.44",
        "supplier": "Smart Booking",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "SB165672",
        "ticket_number": null,
        "traacs_number": "HV25086745",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015753005",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-13T11:47:16.000000Z",
        "updated_at": "2025-08-13T12:07:28.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 16,
        "tenant_user_id": 12,
        "booking_date": "2025-08-13T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Faisal Al Jabri // Abdulrhaman Kharsan N Alagimi",
        "client_type": "NORMAL",
        "destination": "dammam",
        "hotel_name": "Braira Al Dammam",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-18T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "BB",
        "original_net": "1722.26",
        "hcn": "14733225757",
        "category": "2* Deluxe King Room",
        "pax": 2,
        "net_cost": "1722.26",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "1920.00",
        "profit": "197.74",
        "supplier": "Smart Booking",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "SB165671",
        "ticket_number": null,
        "traacs_number": "HV25086750",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-13T11:53:10.000000Z",
        "updated_at": "2025-08-14T10:36:27.000000Z",
        "tenant_user": {
            "id": 12,
            "name": "Abdulrahman Sherif",
            "email": "Abdelrahman.Shiref@rahala.com.sa"
        }
    },
    {
        "id": 17,
        "tenant_user_id": 11,
        "booking_date": "2025-08-13T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": "#10110 #PMO",
        "guest_name": "Rakan Mahmoud Ali Alfaouri",
        "client_type": "NORMAL",
        "destination": "naem",
        "hotel_name": "Diwan Residence",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-17T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "250.00",
        "hcn": "tba",
        "category": "standard",
        "pax": 1,
        "net_cost": "250.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "370.00",
        "profit": "120.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": "tba",
        "ticket_number": null,
        "traacs_number": "HV25086748",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015754363",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-13T14:33:57.000000Z",
        "updated_at": "2025-08-13T14:33:57.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 18,
        "tenant_user_id": 10,
        "booking_date": "2025-08-13T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": null,
        "guest_name": "Abdullah Kassan",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "Diwan Residence Hotel Alnaeem",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-16T00:00:00.000000Z",
        "check_out_date": "2025-08-18T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "BB",
        "original_net": "500.00",
        "hcn": "TBA",
        "category": "standard",
        "pax": 1,
        "net_cost": "500.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "740.00",
        "profit": "240.00",
        "supplier": null,
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086752",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015750784",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-13T15:23:37.000000Z",
        "updated_at": "2025-08-14T10:41:04.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 10,
        "tenant_user_id": 14,
        "booking_date": "2025-08-12T00:00:00.000000Z",
        "sender": "Minhaj",
        "account": "First Fix",
        "cta": null,
        "lpo": "#10131 #CEER",
        "guest_name": "Mohamed Soliman Mobarak Hassan",
        "client_type": "NORMAL",
        "destination": "RUH",
        "hotel_name": "Roof Hotel Apartments",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-11T00:00:00.000000Z",
        "check_out_date": "2025-08-14T00:00:00.000000Z",
        "number_of_nights": 3,
        "meal": "BB",
        "original_net": "1102.81",
        "hcn": "LVWTRG",
        "category": null,
        "pax": 1,
        "net_cost": "1102.81",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "1400.00",
        "profit": "297.19",
        "supplier": "Smart Booking",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "SB165625",
        "ticket_number": null,
        "traacs_number": "HV25086744",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015670125",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-12T13:22:03.000000Z",
        "updated_at": "2025-08-13T07:47:12.000000Z",
        "tenant_user": {
            "id": 14,
            "name": "Raneem Yousef",
            "email": "Raneem.Yousef@rahala.com.sa"
        }
    },
    {
        "id": 11,
        "tenant_user_id": 10,
        "booking_date": "2025-08-12T00:00:00.000000Z",
        "sender": "Mohammed Khalid",
        "account": "MBL",
        "cta": "•\tEmployee Number: 2902\n•\tProject/Department: 1020100  –  JCD SPMI - ADDENDUM\n•\tPurpose of Trip: Business Trip",
        "lpo": null,
        "guest_name": "Mohammed Saeed Alafifi",
        "client_type": "NORMAL",
        "destination": "abha",
        "hotel_name": "golden tulip abha",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-13T00:00:00.000000Z",
        "check_out_date": "2025-08-14T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "RO",
        "original_net": "364.00",
        "hcn": "LEMH03410",
        "category": "standard",
        "pax": 1,
        "net_cost": "364.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "410.00",
        "profit": "46.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEMH03410",
        "ticket_number": null,
        "traacs_number": "HV25086743",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015761123",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-12T14:51:18.000000Z",
        "updated_at": "2025-08-13T07:44:04.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 12,
        "tenant_user_id": 11,
        "booking_date": "2025-08-12T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Fahad Hamdan Alaslani",
        "client_type": "NORMAL",
        "destination": "Abha",
        "hotel_name": "Memsy Rose",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-17T00:00:00.000000Z",
        "check_out_date": "2025-08-20T00:00:00.000000Z",
        "number_of_nights": 3,
        "meal": "RO",
        "original_net": "720.00",
        "hcn": "TBA",
        "category": "Standard room",
        "pax": 1,
        "net_cost": "720.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "840.00",
        "profit": "120.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": "tba",
        "ticket_number": null,
        "traacs_number": "HV25086741",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015765178",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-12T14:58:47.000000Z",
        "updated_at": "2025-08-12T14:58:47.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 13,
        "tenant_user_id": 9,
        "booking_date": "2025-08-12T00:00:00.000000Z",
        "sender": "Malik Shajiuddin",
        "account": "MBL",
        "cta": null,
        "lpo": null,
        "guest_name": "Mohammed Ahmed",
        "client_type": "NORMAL",
        "destination": "jed/ruh/jed",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-12T00:00:00.000000Z",
        "check_out_date": "2025-08-13T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "1704.98",
        "hcn": null,
        "category": "j",
        "pax": 1,
        "net_cost": "1704.98",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1965.00",
        "profit": "260.02",
        "supplier": null,
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEB3SQ",
        "ticket_number": "LEB3SQ",
        "traacs_number": "LEB3SQ0000",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015749003",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-12T16:34:53.000000Z",
        "updated_at": "2025-08-12T16:34:53.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 14,
        "tenant_user_id": 9,
        "booking_date": "2025-08-12T00:00:00.000000Z",
        "sender": "CEO",
        "account": "msb",
        "cta": null,
        "lpo": null,
        "guest_name": "MAKHOUL/RABIH MR",
        "client_type": "VIP",
        "destination": "jed/bey//jed",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-13T00:00:00.000000Z",
        "check_out_date": "2025-08-26T00:00:00.000000Z",
        "number_of_nights": null,
        "meal": null,
        "original_net": "3384.00",
        "hcn": null,
        "category": "j",
        "pax": 1,
        "net_cost": "3384.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "4760.00",
        "profit": "1376.00",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "8MRIUO",
        "ticket_number": "3001490378",
        "traacs_number": "3001490378",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-12T19:45:23.000000Z",
        "updated_at": "2025-08-12T19:45:23.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 19,
        "tenant_user_id": 10,
        "booking_date": "2025-08-12T00:00:00.000000Z",
        "sender": "CEO",
        "account": "MSB CO2",
        "cta": null,
        "lpo": null,
        "guest_name": "Ms. Maram Al tassan",
        "client_type": "VIP",
        "destination": "London",
        "hotel_name": "four season Park lane London",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-12T00:00:00.000000Z",
        "check_out_date": "2025-08-13T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "2600.00",
        "hcn": "4366427438",
        "category": "suite",
        "pax": 1,
        "net_cost": "13598.00",
        "currency_from": "GBP",
        "currency_to": "SAR",
        "conversion_rate": "5.2300",
        "selling_price": "15700.00",
        "profit": "2102.00",
        "supplier": "GTE",
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086742",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-13T16:51:38.000000Z",
        "updated_at": "2025-08-13T16:51:38.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 1,
        "tenant_user_id": 10,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Abdul Rahim Hakmi",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "landmark",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-13T00:00:00.000000Z",
        "check_out_date": "2025-08-20T00:00:00.000000Z",
        "number_of_nights": 7,
        "meal": "RO",
        "original_net": "1260.00",
        "hcn": "25000367",
        "category": "standard",
        "pax": 1,
        "net_cost": "1260.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1610.00",
        "profit": "350.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "25000367",
        "ticket_number": null,
        "traacs_number": "HV25086736",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015716310",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-11T13:00:33.000000Z",
        "updated_at": "2025-08-12T06:49:40.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 2,
        "tenant_user_id": 11,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "Muhammad Siddique",
        "account": "FIRST FIX",
        "cta": null,
        "lpo": "#FF17683 # Seven Makkah",
        "guest_name": "Mr. Ajmalkhan Sirajudeen",
        "client_type": "NORMAL",
        "destination": "Mecca",
        "hotel_name": "Millennium Makkah Al Naseem",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-17T00:00:00.000000Z",
        "check_out_date": "2025-08-20T00:00:00.000000Z",
        "number_of_nights": 3,
        "meal": "BB",
        "original_net": "561.00",
        "hcn": "799104085",
        "category": "Classic Rooms",
        "pax": 1,
        "net_cost": "561.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "735.00",
        "profit": "174.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "799104085 //LEMH03381",
        "ticket_number": null,
        "traacs_number": "HV25086726",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015670125",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-11T13:09:29.000000Z",
        "updated_at": "2025-08-11T13:09:29.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 3,
        "tenant_user_id": 10,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Raheem Arshad",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "landmark",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-13T00:00:00.000000Z",
        "check_out_date": "2025-08-19T00:00:00.000000Z",
        "number_of_nights": 6,
        "meal": "RO",
        "original_net": "1080.00",
        "hcn": "25000368",
        "category": "standard",
        "pax": 1,
        "net_cost": "1080.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "1380.00",
        "profit": "300.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "25000368",
        "ticket_number": null,
        "traacs_number": "HV25086737",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015716310",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-11T13:09:29.000000Z",
        "updated_at": "2025-08-12T06:53:25.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 4,
        "tenant_user_id": 10,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Abdullah Saeed S Alharbi",
        "client_type": "NORMAL",
        "destination": "jeddah",
        "hotel_name": "landmark",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-12T00:00:00.000000Z",
        "check_out_date": "2025-08-14T00:00:00.000000Z",
        "number_of_nights": 2,
        "meal": "RO",
        "original_net": "360.00",
        "hcn": "25000369",
        "category": "standard",
        "pax": 1,
        "net_cost": "360.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "0.0000",
        "selling_price": "460.00",
        "profit": "100.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "25000369",
        "ticket_number": null,
        "traacs_number": "HV25086738",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015716310",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-11T13:12:23.000000Z",
        "updated_at": "2025-08-12T06:55:37.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 5,
        "tenant_user_id": 9,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "1.\tSalam Khalife 2.\tAssem Alkhatib",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": "EWAA EXPRESS KHURAIS",
        "reservation_type": "online",
        "service": "Hotel",
        "check_in_date": "2025-08-13T00:00:00.000000Z",
        "check_out_date": "2025-08-14T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "801.54",
        "hcn": "415132474 // 415132665",
        "category": null,
        "pax": 2,
        "net_cost": "801.54",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "900.00",
        "profit": "98.46",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": null,
        "ticket_number": null,
        "traacs_number": "HV25086739",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-11T14:10:43.000000Z",
        "updated_at": "2025-08-12T07:01:40.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 6,
        "tenant_user_id": 9,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "Naufal",
        "account": "Baumat",
        "cta": null,
        "lpo": null,
        "guest_name": "KAZZAZ/FARES MR",
        "client_type": "NORMAL",
        "destination": "riyadh",
        "hotel_name": null,
        "reservation_type": "online",
        "service": "Flight",
        "check_in_date": "2025-08-12T00:00:00.000000Z",
        "check_out_date": null,
        "number_of_nights": null,
        "meal": null,
        "original_net": "2462.15",
        "hcn": null,
        "category": "j",
        "pax": 1,
        "net_cost": "2462.15",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "2790.00",
        "profit": "327.85",
        "supplier": "Amadeus",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "8CGNRP",
        "ticket_number": "3001464365",
        "traacs_number": "3001464365",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015722928",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-11T15:15:08.000000Z",
        "updated_at": "2025-08-12T13:19:47.000000Z",
        "tenant_user": {
            "id": 9,
            "name": "Alber Nozahy",
            "email": "Alber.Rasmy@rahala.com.sa"
        }
    },
    {
        "id": 7,
        "tenant_user_id": 11,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "Sanjid",
        "account": "icad",
        "cta": null,
        "lpo": null,
        "guest_name": "Sudheer Abdulla Kunju",
        "client_type": "NORMAL",
        "destination": "Riyadh",
        "hotel_name": "Ross Hotel",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-11T00:00:00.000000Z",
        "check_out_date": "2025-08-12T00:00:00.000000Z",
        "number_of_nights": 1,
        "meal": "BB",
        "original_net": "525.00",
        "hcn": "273-2875445",
        "category": "Standard double room",
        "pax": 1,
        "net_cost": "525.00",
        "currency_from": "SAR",
        "currency_to": "SAR",
        "conversion_rate": "1.0000",
        "selling_price": "595.00",
        "profit": "70.00",
        "supplier": "Lemonde",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "LEMH03389",
        "ticket_number": null,
        "traacs_number": "HV25086730",
        "zoho_link": "https://reservations.rahala.com.sa/agent/reservations/operations-department/tickets/details/926186000015712501",
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": true,
        "created_at": "2025-08-11T16:11:53.000000Z",
        "updated_at": "2025-08-11T16:11:53.000000Z",
        "tenant_user": {
            "id": 11,
            "name": "Malak Ehab",
            "email": "Malak.Ehab@rahala.com.sa"
        }
    },
    {
        "id": 8,
        "tenant_user_id": 10,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "Ashiq",
        "account": "MSB",
        "cta": null,
        "lpo": null,
        "guest_name": "MHDMAZEN NASSIF",
        "client_type": "VIP",
        "destination": "Swizerland",
        "hotel_name": "Hôtel du Port",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-17T00:00:00.000000Z",
        "check_out_date": "2025-08-20T00:00:00.000000Z",
        "number_of_nights": 3,
        "meal": "BB",
        "original_net": "540.00",
        "hcn": "ADECA59AEE",
        "category": "standard",
        "pax": 1,
        "net_cost": "2592.00",
        "currency_from": "CHF",
        "currency_to": "SAR",
        "conversion_rate": "4.8000",
        "selling_price": "2950.00",
        "profit": "358.00",
        "supplier": "Hotel Direct",
        "offline_supplier_name": null,
        "payment": "Bank Transfer",
        "reference": "ADECA59AEE",
        "ticket_number": null,
        "traacs_number": "HV25086728",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-12T06:51:21.000000Z",
        "updated_at": "2025-08-12T06:55:31.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    },
    {
        "id": 9,
        "tenant_user_id": 10,
        "booking_date": "2025-08-11T00:00:00.000000Z",
        "sender": "CEO",
        "account": "said mohamed",
        "cta": null,
        "lpo": null,
        "guest_name": "Mr. Samaa Abdeghafar",
        "client_type": "VIP",
        "destination": "Sharm El-Sheikh",
        "hotel_name": "pickalbatros aqua park sharm el sheikh",
        "reservation_type": "offline",
        "service": "Hotel",
        "check_in_date": "2025-08-18T00:00:00.000000Z",
        "check_out_date": "2025-08-24T00:00:00.000000Z",
        "number_of_nights": 6,
        "meal": "AL",
        "original_net": "3150.00",
        "hcn": "991576",
        "category": "2 Deluxe rooms",
        "pax": 4,
        "net_cost": "11812.50",
        "currency_from": "USD",
        "currency_to": "SAR",
        "conversion_rate": "3.7500",
        "selling_price": "11812.50",
        "profit": "0.00",
        "supplier": "Royal Wings",
        "offline_supplier_name": null,
        "payment": "Credit",
        "reference": "991576",
        "ticket_number": null,
        "traacs_number": "HV25086740",
        "zoho_link": null,
        "vat_invoice": null,
        "vcc_details": null,
        "remarks": null,
        "email_attachment": false,
        "created_at": "2025-08-12T07:01:35.000000Z",
        "updated_at": "2025-08-12T07:08:42.000000Z",
        "tenant_user": {
            "id": 10,
            "name": "Suzan Raouf",
            "email": "Suzan.Raouf@rahala.com.sa"
        }
    }
]
function OfflineBooking() {
  const [offlineBookings, setOfflineBookings] = useState(null)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState('all')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    service: '',
    bookingDate: '',
    agentId: '',
    destination: '',
    guestName: '',
    reference: '',
    clientType: '',
    reservationType: '',
    payment: '',
  })

  useEffect(() => {
  const tenantDomain = window.location.hostname
  console.log("tenantDomain", tenantDomain)

    const fetchOfflineBookings = async () => {
        const token = "551|nS8tE8FtEycY2C89yA5GGCHdJaJ47BNCXsT5uPaf9bcb1b5d"
      try {
        const response = await fetch(
          'https://api-new.rahala.com.sa/api/myrahala/offline-bookings/excel-mapping-options',
          {
            headers: {
              'Authorization': `Bearer ${token}`,
             "Content-Type": "application/json",
             "tenant-domain": `x.${tenantDomain}`
            },
          }
        )


        const data = await response.json()
        console.log("data from the api:", data)
        setOfflineBookings(data)
      } catch (err) {
        console.log("error in the api", err)
        setError(err.message)
      }
    }
    fetchOfflineBookings()
  }, [])

  const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A'
    const date = new Date(isoDate)
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    })
    const parts = formatter.formatToParts(date)
    const month = parts.find(p => p.type === 'month')?.value || ''
    const day = parts.find(p => p.type === 'day')?.value || ''
    const year = parts.find(p => p.type === 'year')?.value || ''
    return `${month} ${day} ${year}`
  }

  const getStatusChip = (booking) => {
    const today = new Date()
    const checkInDate = booking.check_in_date ? new Date(booking.check_in_date) : null
    if (!checkInDate) return null
    const isSameDay = checkInDate.toDateString() === today.toDateString()
    if (checkInDate < new Date(today.toDateString())) {
      return <Chip size="small" color="error" label="Completed" />
    } else if (isSameDay) {
      return <Chip size="small" color="warning" label="Today" />
    }
    return <Chip size="small" color="success" label="Upcoming" />
  }

  const currencyFormat = (value, currency = 'SAR') => {
    if (value === null || value === undefined || value === '') return 'N/A'
    const num = Number(value)
    if (Number.isNaN(num)) return String(value)
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(num)
  }

  const serviceLower = (s) => (s || '').toString().trim().toLowerCase()

  const isHotel = (b) => serviceLower(b.service) === 'hotel'
  const isTransport = (b) => ['flight', 'bus', 'train', 'car', 'transport'].includes(serviceLower(b.service))
  const isActivity = (b) => ['activity', 'activities', 'tour', 'excursion'].includes(serviceLower(b.service))
  const isVip = (b) => (b.client_type || '').toString().toUpperCase() === 'VIP'
  const isNoTraacs = (b) => !b.traacs_number

  const bookings = dummyData || []

  const optionLists = useMemo(() => {
    const by = {
      services: new Set(),
      clientTypes: new Set(),
      reservationTypes: new Set(),
      payments: new Set(),
      destinations: new Set(),
      guests: new Set(),
    }
    bookings.forEach(b => {
      if (b.service) by.services.add(b.service)
      if (b.client_type) by.clientTypes.add(b.client_type)
      if (b.reservation_type) by.reservationTypes.add(b.reservation_type)
      if (b.payment) by.payments.add(b.payment)
      if (b.destination) by.destinations.add(b.destination)
      if (b.guest_name) by.guests.add(b.guest_name)
    })
    return {
      services: Array.from(by.services),
      clientTypes: Array.from(by.clientTypes),
      reservationTypes: Array.from(by.reservationTypes),
      payments: Array.from(by.payments),
      destinations: Array.from(by.destinations),
      guests: Array.from(by.guests),
    }
  }, [bookings])

  const agents = useMemo(() => {
    const uniqueById = new Map()
    bookings.forEach((b) => {
      const u = b.tenant_user
      if (u && u.id !== undefined && u.id !== null) {
        if (!uniqueById.has(u.id)) {
          uniqueById.set(u.id, {
            id: u.id,
            name: u.name || '',
            email: u.email || ''
          })
        }
      }
    })
    return Array.from(uniqueById.values())
  }, [bookings])

  console.log("agents", agents)

  const applyFilters = (list) => {
    return list.filter(b => {
      if (filters.service && serviceLower(b.service) !== serviceLower(filters.service)) return false
      if (filters.bookingDate) {
        const d = b.booking_date ? new Date(b.booking_date) : null
        const want = new Date(filters.bookingDate)
        if (!d) return false
        const dStr = d.toISOString().slice(0,10)
        const wStr = want.toISOString().slice(0,10)
        if (dStr !== wStr) return false
      }
      if (filters.agentId && String(b.tenant_user?.id || '') !== String(filters.agentId)) return false
      if (filters.destination && !String(b.destination || '').toLowerCase().includes(String(filters.destination).toLowerCase())) return false
      if (filters.guestName && !String(b.guest_name || '').toLowerCase().includes(String(filters.guestName).toLowerCase())) return false
      if (filters.reference) {
        const ref = `${b.hcn || ''} ${b.reference || ''}`.toLowerCase()
        if (!ref.includes(String(filters.reference).toLowerCase())) return false
      }
      if (filters.clientType && String(b.client_type || '') !== String(filters.clientType)) return false
      if (filters.reservationType && String(b.reservation_type || '') !== String(filters.reservationType)) return false
      if (filters.payment && String(b.payment || '') !== String(filters.payment)) return false
      return true
    })
  }

  const preTab = applyFilters(bookings)

  const counts = {
    all: preTab.length,
    hotels: preTab.filter(isHotel).length,
    transports: preTab.filter(isTransport).length,
    activities: preTab.filter(isActivity).length,
    vip: preTab.filter(isVip).length,
    noTraacs: preTab.filter(isNoTraacs).length,
  }

  const stats = useMemo(() => {
    const totalBookings = preTab.length
    let totalRevenue = 0
    let totalProfit = 0
    preTab.forEach(b => {
      const rev = Number(b.selling_price) || 0
      const prof = Number(b.profit) || 0
      totalRevenue += rev
      totalProfit += prof
    })
    const averageProfit = totalBookings ? totalProfit / totalBookings : 0
    const averageProfitPct = totalRevenue ? (totalProfit / totalRevenue) * 100 : 0
    return { totalBookings, totalRevenue, totalProfit, averageProfit, averageProfitPct }
  }, [preTab])

  const filterByTab = (list, tab) => {
    switch (tab) {
      case 'hotels':
        return list.filter(isHotel)
      case 'transports':
        return list.filter(isTransport)
      case 'activities':
        return list.filter(isActivity)
      case 'vip':
        return list.filter(isVip)
      case 'noTraacs':
        return list.filter(isNoTraacs)
      case 'all':
      default:
        return list
    }
  }

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
    setPage(0)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filtered = filterByTab(preTab, tabValue)
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const getServiceChip = (b) => {
    const label = b.service || 'N/A'
    if (isHotel(b)) return <Chip size="small" color="primary" label={label} />
    if (isTransport(b)) return <Chip size="small" color="info" label={label} />
    if (isActivity(b)) return <Chip size="small" color="secondary" label={label} />
    return <Chip size="small" variant="outlined" label={label} />
  }

  const getReservationChip = (b) => (
    <Chip size="small" variant="outlined" label={b.reservation_type || 'N/A'} />
  )

  const getClientTypeChip = (b) => (
    <Chip
      size="small"
      variant={isVip(b) ? 'filled' : 'outlined'}
      color={isVip(b) ? 'secondary' : 'default'}
      label={b.client_type || 'N/A'}
    />
  )





  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }} style={{ marginTop: '40px' , marginBottom: '80px'     }}>
        <Box>
          <Typography variant="h5" fontWeight={600}>Offline Bookings</Typography>
          <Typography variant="body2" color="text.secondary">View, filter and manage all offline reservations</Typography>
        </Box>
        <Link href="/offline-bookings/create" passHref legacyBehavior>
          <Button variant="contained" color="primary">Create Booking</Button>
        </Link>
      </Box>

<Paper sx={{ p: 2, mb: 2 }}>
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
    <Paper sx={{ p: 2, height: '100%', width: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider', display: 'flex' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Total Bookings</Typography>
          <Typography variant="h6">{stats.totalBookings}</Typography>
        </Box>
        <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main' }}>
          <AssignmentTurnedInOutlinedIcon fontSize="small" />
        </Box>
      </Stack>
    </Paper>
    <Paper sx={{ p: 2, height: '100%', width: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider', display: 'flex' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Total Revenue</Typography>
          <Typography variant="h6">{currencyFormat(stats.totalRevenue, 'SAR')}</Typography>
        </Box>
        <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'success.light', color: 'success.main' }}>
          <AttachMoneyOutlinedIcon fontSize="small" />
        </Box>
      </Stack>
    </Paper>
    <Paper sx={{ p: 2, height: '100%', width: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider', display: 'flex' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Total Profit</Typography>
          <Typography variant="h6">{currencyFormat(stats.totalProfit, 'SAR')}</Typography>
        </Box>
        <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'warning.light', color: 'warning.main' }}>
          <TrendingUpOutlinedIcon fontSize="small" />
        </Box>
      </Stack>
    </Paper>
    <Paper sx={{ p: 2, height: '100%', width: '100%', borderRadius: 2, border: '1px solid', borderColor: 'divider', display: 'flex' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
        <Box>
          <Typography variant="caption" color="text.secondary">Avg Profit %</Typography>
          <Typography variant="h6">{stats.averageProfitPct.toFixed(2)}%</Typography>
        </Box>
        <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'info.light', color: 'info.main' }}>
          <QueryStatsOutlinedIcon fontSize="small" />
        </Box>
      </Stack>
    </Paper>
  </Box>
</Paper>



      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} flexWrap="wrap" useFlexGap>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Service Type</InputLabel>
            <Select label="Service Type" value={filters.service} onChange={(e) => setFilters(f => ({ ...f, service: e.target.value }))}>
              <MenuItem value=""><em>All</em></MenuItem>
              {optionLists.services.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Booking Date"
            type="date"
            size="small"
            value={filters.bookingDate}
            onChange={(e) => setFilters(f => ({ ...f, bookingDate: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Agent</InputLabel>
            <Select label="Agent" value={filters.agentId} onChange={(e) => setFilters(f => ({ ...f, agentId: e.target.value }))}>
              <MenuItem value=""><em>All</em></MenuItem>
              {agents.map(a => (
                <MenuItem key={a.id} value={a.id}>{a.name} </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField size="small" label="Destination" value={filters.destination} onChange={(e) => setFilters(f => ({ ...f, destination: e.target.value }))} />
          <TextField size="small" label="Guest Name" value={filters.guestName} onChange={(e) => setFilters(f => ({ ...f, guestName: e.target.value }))} />
          <TextField size="small" label="Reference" value={filters.reference} onChange={(e) => setFilters(f => ({ ...f, reference: e.target.value }))} />

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Client Type</InputLabel>
            <Select label="Client Type" value={filters.clientType} onChange={(e) => setFilters(f => ({ ...f, clientType: e.target.value }))}>
              <MenuItem value=""><em>All</em></MenuItem>
              {optionLists.clientTypes.map(v => (
                <MenuItem key={v} value={v}>{v}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Reservation Type</InputLabel>
            <Select label="Reservation Type" value={filters.reservationType} onChange={(e) => setFilters(f => ({ ...f, reservationType: e.target.value }))}>
              <MenuItem value=""><em>All</em></MenuItem>
              {optionLists.reservationTypes.map(v => (
                <MenuItem key={v} value={v}>{v}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Payment Method</InputLabel>
            <Select label="Payment Method" value={filters.payment} onChange={(e) => setFilters(f => ({ ...f, payment: e.target.value }))}>
              <MenuItem value=""><em>All</em></MenuItem>
              {optionLists.payments.map(v => (
                <MenuItem key={v} value={v}>{v}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="outlined" color="secondary" onClick={() => setFilters({ service: '', bookingDate: '', agentId: '', destination: '', guestName: '', reference: '', clientType: '', reservationType: '', payment: '' })}>
            Clear Filters
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="all" label={`All (${counts.all})`} />
          <Tab value="hotels" label={`Hotels (${counts.hotels})`} />
          <Tab value="transports" label={`Transports (${counts.transports})`} />
          <Tab value="activities" label={`Activities (${counts.activities})`} />
          <Tab value="vip" label={`VIP (${counts.vip})`} />
          <Tab value="noTraacs" label={`No Traacs (${counts.noTraacs})`} />
        </Tabs>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden' , marginTop :"20px"}}>
        <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto', maxHeight: 520 }}>
          <Table
            stickyHeader
            size="small"
            sx={{ width: '100%', tableLayout: 'auto', '& td, & th': { whiteSpace: 'nowrap' } }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Guest & Destination</TableCell>
                <TableCell>Service Details</TableCell>
                <TableCell>Reservation Type</TableCell>
                <TableCell>Client Type</TableCell>
                <TableCell>Financial</TableCell>
                <TableCell>Agent</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography variant="body2" color="text.secondary">No records</Typography>
                  </TableCell>
                </TableRow>
              )}

              {paginated.map((b) => (
                <TableRow
                  key={`${b.id}-${b.hcn || 'no-ref'}`}
                  hover
                  sx={isNoTraacs(b) ? { backgroundColor: (theme) => theme.palette.error.light, '&:hover': { backgroundColor: (theme) => theme.palette.error.light } } : {}}
                >
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">#{b.id}</Typography>
                      <Typography variant="caption" color="text.secondary">{formatDate(b.booking_date)}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Ref: {isHotel(b) ? (b.hcn || 'N/A') : (b.reference || 'N/A')}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">{b.guest_name || 'N/A'}</Typography>
                      <Typography variant="caption" color="text.secondary">Dest: {b.destination || 'N/A'}</Typography>
                      <Typography variant="caption" color="text.secondary">PAX: {b.pax ?? 'N/A'}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      {getServiceChip(b)}
                      <Typography variant="caption" color="text.secondary">
                        {isHotel(b) ? (b.hotel_name || 'Hotel N/A') : (b.hotel_name ? `Hotel: ${b.hotel_name}` : null)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {b.check_in_date ? ` ${formatDate(b.check_in_date) + " - "}` : ''}
                        {b.check_out_date ? ` ${formatDate(b.check_out_date)}` : ''}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {isTransport(b) ? ` ${b.category}` : ""}
                      </Typography>
                   
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {getReservationChip(b)}
                  </TableCell>
                  <TableCell>
                    {getClientTypeChip(b)}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary"> {currencyFormat(b.selling_price, b.currency_to || 'SAR')}</Typography>
                      <Typography variant="caption" color="text.secondary">Net: {currencyFormat(b.net_cost, b.currency_to || 'SAR')}</Typography>
                      <Typography variant="caption" color="text.secondary">Profit: {currencyFormat(b.profit, b.currency_to || 'SAR')}</Typography>
                      <Typography variant="caption" color="text.secondary"> {b.payment}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="body2">{b.tenant_user?.name || 'N/A'}</Typography>
                      <Typography variant="caption" color="text.secondary">{b.tenant_user?.email || 'N/A'}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {getStatusChip(b)}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="View">
                       <Link href={`/offline-bookings/${b.id}`} passHref legacyBehavior>
                        <IconButton size="small" >
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Link href="/offline-bookings/create" passHref legacyBehavior>
                          <IconButton size="small" component="a">
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => { if (window.confirm('Delete this booking?')) { console.log('Delete booking', b.id) } }}>
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>
    </Box>
  )
}

export default OfflineBooking


