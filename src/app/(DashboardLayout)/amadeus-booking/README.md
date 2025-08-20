# 🚀 Amadeus Booking Management System

A comprehensive frontend system for managing Amadeus airline bookings, queues, and fare optimization.

## ✨ Features

- **Queue Management**: Fetch and monitor Amadeus queues with real-time statistics
- **Booking Management**: View, filter, and manage all bookings with detailed information
- **Real-time Updates**: Auto-refresh functionality for live data
- **Advanced Filtering**: Search bookings by multiple criteria
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Robust error handling with user-friendly messages

## 🏗️ Architecture

The system is built with modern React patterns and follows a component-based architecture:

```
src/
├── app/(DashboardLayout)/amadeus-booking/
│   ├── page.jsx                 # Main page component
│   └── README.md               # This file
├── components/
│   ├── ErrorBoundary.jsx       # Error boundary for graceful error handling
│   └── amadeus/
│       ├── QueueManagement.jsx # Queue fetching and statistics
│       ├── BookingList.jsx     # Booking list with filters
│       ├── BookingRow.jsx      # Individual booking row
│       ├── BookingDetails.jsx  # Expandable booking details
│       └── AutoRefresh.jsx     # Auto-refresh functionality
├── services/
│   └── amadeus-booking.service.js # API service layer
└── styles/
    └── amadeus-booking.css     # Comprehensive styling
```

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18+ and npm
- Next.js 13+ with App Router
- Backend API running on `http://localhost:3000/api`

### 2. Installation

The components are already integrated into your Next.js project. Make sure all dependencies are installed:

```bash
npm install
```

### 3. Configuration

The system uses hardcoded Amadeus credentials for queue and booking operations:

- **Client ID**: `7s3hw5AA6jEaQMuk1qznTVhrmCImyky3`
- **Client Secret**: `omjvprUntk2VA9vC`
- **Office ID**: `JEDS2242J`
- **Base URL**: `https://travel.api.amadeus.com`

### 4. Access the System

Navigate to `/amadeus-booking` in your application to access the booking management system.

## 📋 Usage Guide

### Queue Management

1. **Set Queue Parameters**:
   - Queue ID (default: 77)
   - Office ID (default: JEDS2242J)
   - Category (default: 0)
   - Max Results (default: 999)
   - PNR Type (default: TK - Ticketed)

2. **Fetch Queue**: Click "🚀 Fetch Queue" to retrieve queue items and bookings

3. **View Statistics**: After fetching, view detailed statistics including:
   - Total items and bookings
   - Status breakdowns
   - Ticketing status breakdowns

### Booking Management

1. **Filter Bookings**: Use the filter controls to search by:
   - Queue ID
   - Booking status
   - Ticketing status
   - Reference number
   - Results per page

2. **View Bookings**: Browse through the booking list with pagination

3. **Expand Details**: Click on any booking row to view comprehensive details including:
   - Flight information and segments
   - Traveler details and documents
   - Ticket information
   - Contact details
   - Operational information

4. **Perform Actions**: Use action buttons for each booking:
   - 🔄 Refresh from Amadeus
   - ✅ Mark Complete
   - ❌ Cancel Booking
   - 🗑️ Delete Booking

### Auto-Refresh

- Toggle auto-refresh on/off
- System checks for updates every 30 seconds
- Automatic page refresh when updates are detected

## 🔧 API Integration

The system integrates with your backend API endpoints:

- `POST /api/myrahala/bookings/queues/fetch` - Fetch queue and bookings
- `GET /api/myrahala/bookings/queues/{id}/statistics` - Get queue statistics
- `GET /api/myrahala/bookings` - List bookings with filters
- `GET /api/myrahala/bookings/{reference}` - Get specific booking
- `PUT /api/myrahala/bookings/{reference}` - Update booking
- `POST /api/myrahala/bookings/{reference}/refresh` - Refresh booking
- `POST /api/myrahala/bookings/{reference}/actions` - Perform booking actions
- `DELETE /api/myrahala/bookings/{reference}` - Delete booking

## 🎨 Customization

### Styling

The system uses a comprehensive CSS file (`amadeus-booking.css`) with:
- Modern gradient designs
- Responsive grid layouts
- Interactive hover effects
- Status-based color coding
- Mobile-first responsive design

### Component Customization

Each component can be customized by modifying:
- Props and state management
- UI layout and styling
- Business logic and validation
- API integration patterns

## 📱 Responsive Design

The system is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚨 Error Handling

The system includes comprehensive error handling:
- **Error Boundary**: Catches and displays React errors gracefully
- **API Error Handling**: User-friendly error messages for API failures
- **Validation**: Input validation and user feedback
- **Loading States**: Clear loading indicators during operations

## 🔒 Security Features

- **Input Sanitization**: All user inputs are properly sanitized
- **API Security**: Secure API communication with proper headers
- **Error Masking**: Sensitive information is not exposed in error messages

## 🧪 Testing

To test the system:

1. **Start your backend API**
2. **Navigate to `/amadeus-booking`**
3. **Test queue fetching** with different parameters
4. **Test booking filters** and pagination
5. **Test booking actions** (refresh, complete, cancel, delete)
6. **Test responsive design** on different screen sizes

## 📊 Performance Features

- **Lazy Loading**: Components load only when needed
- **Efficient Rendering**: Optimized React rendering with proper keys
- **Debounced Updates**: Prevents excessive API calls
- **Pagination**: Efficient handling of large datasets

## 🔄 State Management

The system uses React hooks for state management:
- `useState` for local component state
- `useEffect` for side effects and API calls
- Custom hooks for reusable logic

## 🌟 Future Enhancements

Potential improvements for future versions:
- **Real-time WebSocket updates**
- **Advanced analytics dashboard**
- **Bulk operations**
- **Export functionality**
- **Advanced search and filtering**
- **User role management**
- **Audit logging**

## 📞 Support

For technical support or questions about the Amadeus Booking Management System, refer to the main project documentation or contact the development team.

---

**Built with ❤️ using Next.js and React**
