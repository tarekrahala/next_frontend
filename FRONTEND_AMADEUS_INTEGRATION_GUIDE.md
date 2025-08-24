
# 🚀 **AMADEUS BOOKING MANAGEMENT - FRONTEND INTEGRATION GUIDE**

## 📋 **Table of Contents**
1. [Configuration](#configuration)
2. [API Endpoints](#api-endpoints)
3. [Frontend Implementation](#frontend-implementation)
4. [Queue Management](#queue-management)
5. [Booking Operations](#booking-operations)
6. [Real-time Updates](#real-time-updates)
7. [Error Handling](#error-handling)
8. [Complete Examples](#complete-examples)

---

## 🔧 **Configuration**

### **Backend Configuration**
Your backend has **hardcoded Amadeus credentials** specifically for queue and booking management operations:

```typescript
// Hardcoded in AmadeusService for queue/booking operations only
const queueCredentials = {
  clientId: '7s3hw5AA6jEaQMuk1qznTVhrmCImyky3',
  clientSecret: 'omjvprUntk2VA9vC',
  baseUrl: 'https://travel.api.amadeus.com'
};

// Office ID for queue operations
const officeId = 'JEDS2242J';
```

**Important Notes:**
- ✅ **Queue Management**: Uses hardcoded credentials
- ✅ **Booking Details**: Uses hardcoded credentials  
- 🔄 **Flight Search/Pricing**: Uses configured environment variables
- 🔄 **Other Operations**: Use configured environment variables

### **How Hardcoded Credentials Work**

The backend automatically handles authentication for queue and booking operations:

1. **Automatic Token Generation**: Each queue/booking request gets a fresh OAuth token
2. **Separate Axios Instances**: Queue and booking operations use dedicated HTTP clients
3. **No Frontend Changes Needed**: Your frontend code remains exactly the same
4. **Secure Token Management**: Tokens are generated per request and not stored

```typescript
// Backend automatically handles this for you:
// 1. Creates new axios instance
// 2. Gets fresh OAuth token
// 3. Makes authenticated request
// 4. Returns response data

// Your frontend just calls the API normally:
const result = await bookingService.fetchQueueAndBookings({
  queueId: '77',
  officeId: 'JEDS2242J',
  category: 0,
  fetchBookings: true
});
```

### **Frontend Base URL**
```typescript
const API_BASE_URL = 'http://localhost:3000/api';
const BOOKING_API_BASE = `${API_BASE_URL}/myrahala/bookings`;
```

---

## 🛠️ **API Endpoints**

### **Queue Management Endpoints**

#### **1. Fetch Queue and Bookings**
```typescript
POST /api/myrahala/bookings/queues/fetch
```

#### **2. Get Queue Statistics**
```typescript
GET /api/myrahala/bookings/queues/{queueId}/statistics?category={category}
```

### **Booking Management Endpoints**

#### **3. List All Bookings**
```typescript
GET /api/myrahala/bookings/bookings?queueId={queueId}&status={status}&limit={limit}
```

#### **4. Get Specific Booking**
```typescript
GET /api/myrahala/bookings/bookings/{reference}
```

#### **5. Update Booking**
```typescript
PUT /api/myrahala/bookings/bookings/{reference}
```

#### **6. Refresh Booking**
```typescript
POST /api/myrahala/bookings/bookings/{reference}/refresh
```

#### **7. Perform Booking Actions**
```typescript
POST /api/myrahala/bookings/bookings/{reference}/actions
```

#### **8. Delete Booking**
```typescript
DELETE /api/myrahala/bookings/bookings/{reference}
```

---

## 💻 **Frontend Implementation**

### **1. API Service Class**

```typescript
// services/amadeus-booking.service.ts
export class AmadeusBookingService {
  private baseUrl = 'http://localhost:3000/api/myrahala/bookings';

  // Fetch queue items and optionally detailed booking information
  async fetchQueueAndBookings(request: QueueFetchRequest): Promise<QueueFetchResponse> {
    const response = await fetch(`${this.baseUrl}/queues/fetch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch queue: ${response.statusText}`);
    }

    return response.json();
  }

  // Get queue statistics
  async getQueueStatistics(queueId: string, category: number = 0): Promise<QueueStatistics> {
    const response = await fetch(`${this.baseUrl}/queues/${queueId}/statistics?category=${category}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get queue statistics: ${response.statusText}`);
    }

    return response.json();
  }

  // List bookings with filters
  async getBookings(filters: BookingFilters = {}): Promise<BookingListResponse> {
    const params = new URLSearchParams();
    
    if (filters.queueId) params.append('queueId', filters.queueId);
    if (filters.status) params.append('status', filters.status);
    if (filters.ticketingStatus) params.append('ticketingStatus', filters.ticketingStatus);
    if (filters.reference) params.append('reference', filters.reference);
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.offset) params.append('offset', filters.offset.toString());

    const response = await fetch(`${this.baseUrl}/bookings?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get bookings: ${response.statusText}`);
    }

    return response.json();
  }

  // Get specific booking by reference
  async getBookingByReference(reference: string): Promise<AmadeusBooking> {
    const response = await fetch(`${this.baseUrl}/bookings/${reference}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get booking: ${response.statusText}`);
    }

    return response.json();
  }

  // Update booking
  async updateBooking(reference: string, updates: Partial<AmadeusBooking>): Promise<AmadeusBooking> {
    const response = await fetch(`${this.baseUrl}/bookings/${reference}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update booking: ${response.statusText}`);
    }

    return response.json();
  }

  // Refresh booking from Amadeus
  async refreshBooking(reference: string): Promise<AmadeusBooking> {
    const response = await fetch(`${this.baseUrl}/bookings/${reference}/refresh`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh booking: ${response.statusText}`);
    }

    return response.json();
  }

  // Perform booking action
  async performBookingAction(reference: string, action: BookingAction): Promise<AmadeusBooking> {
    const response = await fetch(`${this.baseUrl}/bookings/${reference}/actions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action),
    });

    if (!response.ok) {
      throw new Error(`Failed to perform action: ${response.statusText}`);
    }

    return response.json();
  }
}
```

### **2. TypeScript Interfaces**

```typescript
// types/amadeus-booking.types.ts

export interface QueueFetchRequest {
  queueId: string;
  officeId: string;
  category?: number;
  max?: number;
  fetchBookings?: boolean;
}

export interface QueueFetchResponse {
  queue: AmadeusQueue;
  newBookings: number;
  updatedBookings: number;
  errors: string[];
}

export interface AmadeusQueue {
  id: string;
  queueId: string;
  officeId: string;
  category: number;
  maxResults: number;
  totalCount: number;
  queueItems: QueueItem[];
  lastFetchedAt: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  errorMessage?: string;
}

export interface QueueItem {
  reference: string;
  creation: {
    dateTime: string;
  };
  travelers: Array<{
    names: Array<{
      lastName: string;
      firstName?: string;
    }>;
  }>;
  products: Array<{
    airSegment?: {
      segment: {
        arrival: { iataCode: string };
        departure: { iataCode: string; localDateTime: string };
        carrierCode: string;
        number: string;
      };
    };
  }>;
  type: string;
}

export interface AmadeusBooking {
  id: string;
  reference: string;
  queueId: string;
  officeId: string;
  amadeusId: string;
  status: 'ACTIVE' | 'CANCELLED' | 'COMPLETED' | 'ERROR' | 'DELETED';
  flightOffers: FlightOffer[];
  travelers: Traveler[];
  tickets?: Ticket[];
  contacts?: Contact[];
  remarks?: {
    general?: Remark[];
    airline?: Remark[];
  };
  ticketingAgreement?: { option: string };
  commissions?: Commission[];
  associatedRecords?: AssociatedRecord[];
  lastTicketingDate?: string;
  ticketingStatus: 'PENDING' | 'TICKETED' | 'CANCELLED' | 'EXPIRED';
  totalPrice?: number;
  currency?: string;
  notes?: string;
  lossAmount?: number;
  lossType?: string;
  pnrType?: 'SCH' | 'TK' | 'UN' | 'HX' | 'UC' | 'HN' | 'NO' | 'TN' | 'KL';
  department?: string;
  doneBy?: string;
  lastAmadeusResponse?: any;
  lastFetchedAt: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFilters {
  queueId?: string;
  status?: string;
  ticketingStatus?: string;
  reference?: string;
  limit?: number;
  offset?: number;
}

export interface BookingListResponse {
  bookings: AmadeusBooking[];
  total: number;
}

export interface QueueStatistics {
  totalItems: number;
  totalBookings: number;
  bookingsByStatus: Record<string, number>;
  bookingsByTicketingStatus: Record<string, number>;
  lastUpdated: string;
}

export interface BookingAction {
  action: 'UPDATE' | 'CANCEL' | 'COMPLETE' | 'ADD_NOTE';
  data?: any;
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  nonHomogeneous: boolean;
  lastTicketingDate: string;
  itineraries: Itinerary[];
  price: {
    currency: string;
    total: string;
    base: string;
    grandTotal: string;
  };
  pricingOptions: { fareType: string[] };
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  segments: Segment[];
}

export interface Segment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: { code: string };
  bookingStatus: string;
  segmentType: string;
  isFlown: boolean;
  id: string;
  numberOfStops: number;
}

export interface Traveler {
  id: string;
  dateOfBirth: string;
  gender: string;
  name: {
    firstName: string;
    lastName: string;
  };
  documents: Document[];
}

export interface Document {
  number: string;
  expiryDate: string;
  issuanceCountry: string;
  nationality: string;
  documentType: string;
  holder: boolean;
}

export interface Ticket {
  documentType: string;
  documentNumber: string;
  documentStatus: string;
  travelerId: string;
  segmentIds: string[];
}

export interface Contact {
  purpose: string;
  phones: Array<{
    deviceType: string;
    number: string;
  }>;
  emailAddress?: string;
}

export interface Remark {
  subType: string;
  text: string;
  flightOfferIds?: string[];
  airlineCode?: string;
}
```

---

## 🗂️ **Queue Management**

### **Queue Fetch Component**

```tsx
// components/QueueManagement.tsx
import React, { useState, useEffect } from 'react';
import { AmadeusBookingService } from '../services/amadeus-booking.service';

const QueueManagement: React.FC = () => {
  const [queueId, setQueueId] = useState('77');
  const [officeId, setOfficeId] = useState('JEDS2242J');
  const [category, setCategory] = useState(0);
  const [fetchBookings, setFetchBookings] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [statistics, setStatistics] = useState<any>(null);

  const bookingService = new AmadeusBookingService();

  const handleFetchQueue = async () => {
    try {
      setLoading(true);
      const response = await bookingService.fetchQueueAndBookings({
        queueId,
        officeId,
        category,
        max: 999,
        fetchBookings,
      });
      setResult(response);
      
      // Also fetch statistics
      const stats = await bookingService.getQueueStatistics(queueId, category);
      setStatistics(stats);
    } catch (error) {
      console.error('Failed to fetch queue:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="queue-management">
      <div className="fetch-controls">
        <h2>🗂️ Queue Management</h2>
        
        <div className="form-group">
          <label>Queue ID:</label>
          <input 
            type="text" 
            value={queueId} 
            onChange={(e) => setQueueId(e.target.value)}
            placeholder="Enter queue ID (e.g., 77)"
          />
        </div>

        <div className="form-group">
          <label>Office ID:</label>
          <input 
            type="text" 
            value={officeId} 
            onChange={(e) => setOfficeId(e.target.value)}
            placeholder="JEDS2242J"
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input 
            type="number" 
            value={category} 
            onChange={(e) => setCategory(parseInt(e.target.value))}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>
            <input 
              type="checkbox" 
              checked={fetchBookings} 
              onChange={(e) => setFetchBookings(e.target.checked)}
            />
            Fetch detailed booking information
          </label>
        </div>

        <button 
          onClick={handleFetchQueue} 
          disabled={loading}
          className="fetch-button"
        >
          {loading ? '🔄 Fetching...' : '🚀 Fetch Queue'}
        </button>
      </div>

      {statistics && (
        <div className="queue-statistics">
          <h3>📊 Queue Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Items</h4>
              <p>{statistics.totalItems}</p>
            </div>
            <div className="stat-card">
              <h4>Total Bookings</h4>
              <p>{statistics.totalBookings}</p>
            </div>
            <div className="stat-card">
              <h4>Last Updated</h4>
              <p>{new Date(statistics.lastUpdated).toLocaleString()}</p>
            </div>
          </div>

          <div className="status-breakdown">
            <h4>Booking Status Breakdown</h4>
            {Object.entries(statistics.bookingsByStatus || {}).map(([status, count]) => (
              <div key={status} className="status-item">
                <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>

          <div className="ticketing-breakdown">
            <h4>Ticketing Status Breakdown</h4>
            {Object.entries(statistics.bookingsByTicketingStatus || {}).map(([status, count]) => (
              <div key={status} className="status-item">
                <span className={`ticketing-badge ${status.toLowerCase()}`}>{status}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="fetch-results">
          <h3>✅ Fetch Results</h3>
          <div className="result-summary">
            <p><strong>New Bookings:</strong> {result.newBookings}</p>
            <p><strong>Updated Bookings:</strong> {result.updatedBookings}</p>
            <p><strong>Errors:</strong> {result.errors.length}</p>
          </div>

          {result.errors.length > 0 && (
            <div className="error-list">
              <h4>❌ Errors</h4>
              {result.errors.map((error: string, index: number) => (
                <p key={index} className="error-message">{error}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QueueManagement;
```

---

## 📋 **Booking Operations**

### **Booking List Component**

```tsx
// components/BookingList.tsx
import React, { useState, useEffect } from 'react';
import { AmadeusBookingService, AmadeusBooking, BookingFilters } from '../services/amadeus-booking.service';

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<AmadeusBooking[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<BookingFilters>({
    limit: 50,
    offset: 0,
  });

  const bookingService = new AmadeusBookingService();

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getBookings(filters);
      setBookings(response.bookings);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [filters]);

  const handleRefreshBooking = async (reference: string) => {
    try {
      await bookingService.refreshBooking(reference);
      loadBookings(); // Reload the list
    } catch (error) {
      console.error('Failed to refresh booking:', error);
    }
  };

  const handleBookingAction = async (reference: string, action: string, data?: any) => {
    try {
      await bookingService.performBookingAction(reference, { action, data });
      loadBookings(); // Reload the list
    } catch (error) {
      console.error('Failed to perform action:', error);
    }
  };

  return (
    <div className="booking-list">
      <div className="booking-filters">
        <h2>📋 Booking Management</h2>
        
        <div className="filter-controls">
          <input 
            type="text" 
            placeholder="Queue ID" 
            value={filters.queueId || ''} 
            onChange={(e) => setFilters({...filters, queueId: e.target.value || undefined})}
          />
          
          <select 
            value={filters.status || ''} 
            onChange={(e) => setFilters({...filters, status: e.target.value || undefined})}
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
            <option value="ERROR">Error</option>
          </select>

          <select 
            value={filters.ticketingStatus || ''} 
            onChange={(e) => setFilters({...filters, ticketingStatus: e.target.value || undefined})}
          >
            <option value="">All Ticketing Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="TICKETED">Ticketed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="EXPIRED">Expired</option>
          </select>

          <input 
            type="text" 
            placeholder="Search by reference" 
            value={filters.reference || ''} 
            onChange={(e) => setFilters({...filters, reference: e.target.value || undefined})}
          />

          <button onClick={loadBookings}>🔍 Search</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">🔄 Loading bookings...</div>
      ) : (
        <div className="booking-results">
          <p>Showing {bookings.length} of {total} bookings</p>
          
          <div className="booking-table">
            <table>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Travelers</th>
                  <th>Route</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Ticketing</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <BookingRow 
                    key={booking.id} 
                    booking={booking} 
                    onRefresh={handleRefreshBooking}
                    onAction={handleBookingAction}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button 
              onClick={() => setFilters({...filters, offset: Math.max(0, (filters.offset || 0) - (filters.limit || 50))})}
              disabled={(filters.offset || 0) === 0}
            >
              Previous
            </button>
            <span>Page {Math.floor((filters.offset || 0) / (filters.limit || 50)) + 1}</span>
            <button 
              onClick={() => setFilters({...filters, offset: (filters.offset || 0) + (filters.limit || 50)})}
              disabled={(filters.offset || 0) + (filters.limit || 50) >= total}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingRow: React.FC<{
  booking: AmadeusBooking;
  onRefresh: (reference: string) => void;
  onAction: (reference: string, action: string, data?: any) => void;
}> = ({ booking, onRefresh, onAction }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getRoute = () => {
    const firstSegment = booking.flightOffers?.[0]?.itineraries?.[0]?.segments?.[0];
    const lastSegment = booking.flightOffers?.[0]?.itineraries?.[0]?.segments?.slice(-1)[0];
    if (firstSegment && lastSegment) {
      return `${firstSegment.departure.iataCode} → ${lastSegment.arrival.iataCode}`;
    }
    return 'N/A';
  };

  const getTravelerNames = () => {
    return booking.travelers.map(t => `${t.name.firstName} ${t.name.lastName}`).join(', ');
  };

  return (
    <>
      <tr onClick={() => setShowDetails(!showDetails)} style={{ cursor: 'pointer' }}>
        <td>
          <strong>{booking.reference}</strong>
          {showDetails ? ' 🔽' : ' ▶️'}
        </td>
        <td>{getTravelerNames()}</td>
        <td>{getRoute()}</td>
        <td>
          {booking.currency} {booking.totalPrice}
        </td>
        <td>
          <span className={`status-badge ${booking.status.toLowerCase()}`}>
            {booking.status}
          </span>
        </td>
        <td>
          <span className={`ticketing-badge ${booking.ticketingStatus.toLowerCase()}`}>
            {booking.ticketingStatus}
          </span>
        </td>
        <td>{new Date(booking.lastFetchedAt).toLocaleString()}</td>
        <td onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onRefresh(booking.reference)} title="Refresh">
            🔄
          </button>
          <button onClick={() => onAction(booking.reference, 'COMPLETE')} title="Mark Complete">
            ✅
          </button>
          <button onClick={() => onAction(booking.reference, 'CANCEL')} title="Cancel">
            ❌
          </button>
        </td>
      </tr>
      
      {showDetails && (
        <tr>
          <td colSpan={8}>
            <BookingDetails booking={booking} />
          </td>
        </tr>
      )}
    </>
  );
};

const BookingDetails: React.FC<{ booking: AmadeusBooking }> = ({ booking }) => {
  return (
    <div className="booking-details">
      <div className="details-grid">
        <div className="detail-section">
          <h4>✈️ Flight Information</h4>
          {booking.flightOffers.map((offer, index) => (
            <div key={offer.id}>
              <p><strong>Offer {index + 1}:</strong> {offer.source}</p>
              <p><strong>Last Ticketing:</strong> {offer.lastTicketingDate}</p>
              <p><strong>Validating Airlines:</strong> {offer.validatingAirlineCodes.join(', ')}</p>
              
              {offer.itineraries.map((itinerary, itinIndex) => (
                <div key={itinIndex}>
                  <p><strong>Itinerary {itinIndex + 1}:</strong></p>
                  {itinerary.segments.map((segment, segIndex) => (
                    <div key={segment.id} className="segment-info">
                      <p>
                        {segment.departure.iataCode} → {segment.arrival.iataCode} | 
                        {segment.carrierCode}{segment.number} | 
                        Status: {segment.bookingStatus}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="detail-section">
          <h4>👥 Travelers</h4>
          {booking.travelers.map((traveler) => (
            <div key={traveler.id}>
              <p><strong>{traveler.name.firstName} {traveler.name.lastName}</strong></p>
              <p>DOB: {traveler.dateOfBirth} | Gender: {traveler.gender}</p>
              {traveler.documents.map((doc, index) => (
                <p key={index}>
                  {doc.documentType}: {doc.number} | 
                  Expires: {doc.expiryDate} | 
                  Nationality: {doc.nationality}
                </p>
              ))}
            </div>
          ))}
        </div>

        {booking.tickets && booking.tickets.length > 0 && (
          <div className="detail-section">
            <h4>🎫 Tickets</h4>
            {booking.tickets.map((ticket, index) => (
              <div key={index}>
                <p>
                  <strong>{ticket.documentType}:</strong> {ticket.documentNumber} | 
                  Status: {ticket.documentStatus} | 
                  Traveler: {ticket.travelerId}
                </p>
              </div>
            ))}
          </div>
        )}

        {booking.contacts && booking.contacts.length > 0 && (
          <div className="detail-section">
            <h4>📞 Contacts</h4>
            {booking.contacts.map((contact, index) => (
              <div key={index}>
                <p><strong>Purpose:</strong> {contact.purpose}</p>
                {contact.emailAddress && <p><strong>Email:</strong> {contact.emailAddress}</p>}
                {contact.phones.map((phone, phoneIndex) => (
                  <p key={phoneIndex}><strong>Phone:</strong> {phone.number} ({phone.deviceType})</p>
                ))}
              </div>
            ))}
          </div>
        )}

        {booking.notes && (
          <div className="detail-section">
            <h4>📝 Notes</h4>
            <pre>{booking.notes}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;
```

---

## ⚡ **Real-time Updates**

### **WebSocket Integration for Live Updates**

```typescript
// hooks/useBookingUpdates.ts
import { useEffect, useState } from 'react';

export const useBookingUpdates = (queueId?: string) => {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    // Set up polling for updates
    const interval = setInterval(async () => {
      if (queueId) {
        try {
          const bookingService = new AmadeusBookingService();
          const stats = await bookingService.getQueueStatistics(queueId);
          
          if (new Date(stats.lastUpdated) > lastUpdate) {
            setLastUpdate(new Date(stats.lastUpdated));
            setUpdateCount(prev => prev + 1);
          }
        } catch (error) {
          console.error('Failed to check for updates:', error);
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [queueId, lastUpdate]);

  return { lastUpdate, updateCount };
};
```

### **Auto-refresh Component**

```tsx
// components/AutoRefresh.tsx
import React, { useEffect, useState } from 'react';
import { useBookingUpdates } from '../hooks/useBookingUpdates';

const AutoRefresh: React.FC<{ 
  queueId?: string; 
  onUpdate: () => void; 
}> = ({ queueId, onUpdate }) => {
  const { updateCount } = useBookingUpdates(queueId);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (autoRefresh && updateCount > 0) {
      onUpdate();
    }
  }, [updateCount, autoRefresh, onUpdate]);

  return (
    <div className="auto-refresh">
      <label>
        <input 
          type="checkbox" 
          checked={autoRefresh} 
          onChange={(e) => setAutoRefresh(e.target.checked)}
        />
        🔄 Auto-refresh on updates
      </label>
      <span className="update-indicator">
        Last check: {new Date().toLocaleTimeString()}
      </span>
    </div>
  );
};

export default AutoRefresh;
```

---

## ❌ **Error Handling**

### **Error Handler Utility**

```typescript
// utils/error-handler.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: any): string => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Authentication failed. Please check your credentials.';
      case 404:
        return 'Resource not found.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message;
    }
  }
  
  return 'An unexpected error occurred.';
};
```

### **Error Boundary Component**

```tsx
// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>❌ Something went wrong</h2>
          <p>An error occurred while loading the booking management system.</p>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.stack}</pre>
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 🎨 **CSS Styles**

```css
/* styles/booking-management.css */

.queue-management, .booking-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.fetch-controls {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.fetch-button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.fetch-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.queue-statistics {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
}

.stat-card h4 {
  margin: 0 0 10px 0;
  color: #666;
}

.stat-card p {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.status-breakdown, .ticketing-breakdown {
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.status-badge, .ticketing-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.status-badge.active { background: #d4edda; color: #155724; }
.status-badge.cancelled { background: #f8d7da; color: #721c24; }
.status-badge.completed { background: #d1ecf1; color: #0c5460; }
.status-badge.error { background: #f5c6cb; color: #721c24; }

.ticketing-badge.pending { background: #fff3cd; color: #856404; }
.ticketing-badge.ticketed { background: #d4edda; color: #155724; }
.ticketing-badge.cancelled { background: #f8d7da; color: #721c24; }
.ticketing-badge.expired { background: #f5c6cb; color: #721c24; }

.booking-table {
  overflow-x: auto;
}

.booking-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.booking-table th,
.booking-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.booking-table th {
  background: #f8f9fa;
  font-weight: bold;
}

.booking-table tr:hover {
  background: #f5f5f5;
}

.booking-details {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
  margin: 10px 0;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.detail-section {
  background: white;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.detail-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.segment-info {
  background: #f8f9fa;
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  color: #999;
}

.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error-boundary {
  text-align: center;
  padding: 40px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  color: #721c24;
}

.auto-refresh {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 15px;
}

.update-indicator {
  font-size: 12px;
  color: #666;
}
```

---

## 🔗 **Complete Main App Integration**

```tsx
// App.tsx
import React from 'react';
import './styles/booking-management.css';
import ErrorBoundary from './components/ErrorBoundary';
import QueueManagement from './components/QueueManagement';
import BookingList from './components/BookingList';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <header>
          <h1>🚀 Amadeus Booking Management System</h1>
          <p>Manage queues and bookings with JEDS2242J office</p>
        </header>

        <main>
          <QueueManagement />
          <BookingList />
        </main>

        <footer>
          <p>Connected to Amadeus Production API</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;
```

---

## 📚 **Usage Examples**

### **Example 1: Fetch Queue 77 with All Bookings**

```typescript
const queueService = new AmadeusBookingService();

// Fetch queue 77 with detailed booking information
const result = await queueService.fetchQueueAndBookings({
  queueId: '77',
  officeId: 'JEDS2242J',
  category: 0,
  max: 999,
  fetchBookings: true
});

console.log(`Fetched ${result.newBookings} new bookings`);
console.log(`Updated ${result.updatedBookings} existing bookings`);
console.log(`Encountered ${result.errors.length} errors`);
```

### **Example 2: Monitor Queue Statistics**

```typescript
// Get real-time queue statistics
const stats = await queueService.getQueueStatistics('77', 0);

console.log(`Total items in queue: ${stats.totalItems}`);
console.log(`Total bookings stored: ${stats.totalBookings}`);
console.log('Status breakdown:', stats.bookingsByStatus);
console.log('Ticketing breakdown:', stats.bookingsByTicketingStatus);
```

### **Example 3: Manage Specific Booking**

```typescript
// Get booking details
const booking = await queueService.getBookingByReference('72NYTI');

// Refresh booking from Amadeus
const refreshedBooking = await queueService.refreshBooking('72NYTI');

// Cancel booking
await queueService.performBookingAction('72NYTI', {
  action: 'CANCEL',
  data: { notes: 'Cancelled due to passenger request' }
});

// Add note to booking
await queueService.performBookingAction('72NYTI', {
  action: 'ADD_NOTE',
  data: { note: 'Passenger confirmed for travel' }
});
```

### **Example 4: Update Operational Fields (PNR Type is Auto-Set)**

```typescript
// PNR type is automatically determined and stored when fetching bookings
// You can only update other operational fields

await queueService.updateBooking('72NYTI', {
  department: 'Operations', // Assign to Operations department
  doneBy: 'John Smith',     // Record who processed it
  lossAmount: 0,            // No loss incurred
  lossType: 'None'          // No loss type
});

// Or use the action endpoint for specific operations
await queueService.performBookingAction('72NYTI', {
  action: 'UPDATE',
  data: {
    department: 'Sales',    // Reassign to Sales
    doneBy: 'Sarah Johnson' // New processor
  }
});

// Note: pnrType cannot be manually changed - it's determined by Amadeus data
```

---

## 🔄 **Complete Workflow & API Payloads**

### **1. Fetch Queue (POST `/api/myrhala/bookings/queues/fetch`)**

```typescript
// Request Payload
{
  "queueId": "77",
  "officeId": "JEDS2242J", 
  "category": 0,
  "max": 999,
  "fetchBookings": true,
  "pnrType": "TK"  // User specifies PNR type for all bookings in this queue
}

// Response
{
  "success": true,
  "message": "Queue and bookings processed successfully",
  "data": {
    "queueId": "77",
    "totalItems": 25,
    "newBookings": 15,
    "updatedBookings": 10,
    "errors": []
  }
}
```

### **2. Update Operational Fields (PUT `/api/myrhala/bookings/{reference}`)**

```typescript
// Request Payload - Update operational fields (PNR Type is auto-determined)
{
  "department": "Operations",
  "doneBy": "John Smith",
  "lossAmount": 0,
  "lossType": "None"
}

// Response
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {
    "reference": "72NYTI",
    "pnrType": "TK",           // Set by user when fetching queue
    "department": "Operations", // Manually set by user
    "doneBy": "John Smith",     // Manually set by user
    "lossAmount": 0,            // Manually set by user
    "lossType": "None",         // Manually set by user
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### **3. Complete Workflow**

```typescript
// Step 1: Fetch queue and bookings (User specifies PNR type)
const fetchResult = await fetch('/api/myrhala/bookings/queues/fetch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    queueId: '77',
    officeId: 'JEDS2242J',
    category: 0,
    max: 999,
    fetchBookings: true,
    pnrType: 'TK'  // User specifies PNR type for this queue
  })
});

// Step 2: Get all bookings (PNR type already set from queue fetch)
const bookings = await fetch('/api/myrhala/bookings?queueId=77');
const { data: { bookings } } = await bookings.json();

// Step 3: Update operational fields for each booking (PNR type already set)
for (const booking of bookings) {
  await fetch(`/api/myrhala/bookings/${booking.reference}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      department: 'Operations', // User manually sets this
      doneBy: 'John Smith',     // User manually sets this
      lossAmount: 0,            // User manually sets this
      lossType: 'None'          // User manually sets this
      // Note: pnrType is already set from queue fetch and cannot be changed
    })
  });
}
```

## 🎯 **Key Features Summary**

✅ **Complete Queue Management** - Fetch and monitor Amadeus queues  
✅ **Detailed Booking Storage** - All booking data stored locally  
✅ **Real-time Updates** - Refresh bookings from Amadeus on demand  
✅ **Advanced Filtering** - Search and filter bookings by multiple criteria  
✅ **Booking Actions** - Cancel, complete, add notes, and update bookings  
✅ **Comprehensive UI** - Full frontend components with responsive design  
✅ **Error Handling** - Robust error handling and user feedback  
✅ **Type Safety** - Complete TypeScript interfaces for all data  
✅ **Production Ready** - Using live Amadeus API credentials

## 🆕 **New Additional Fields**

The system now includes additional editable fields for enhanced booking management:

### **Financial Tracking**
- **`lossAmount`** (decimal): Track financial losses with precision
- **`lossType`** (string): Categorize the type of loss

### **PNR Classification**
- **`pnrType`** (enum): User-provided when fetching queue - applies to all bookings in that queue
  - `SCH` - Scheduled
  - `TK` - Ticketed  
  - `UN` - Unconfirmed
  - `HX` - Hold/Expired
  - `UC` - Unconfirmed
  - `HN` - Hold/No Action
  - `NO` - No Action
  - `TN` - Ticketed/No Action
  - `KL` - Kill/Cancelled

### **Operational Fields**
- **`department`** (string): Track which department handles the booking
- **`doneBy`** (string): Record who processed the booking

### **Field Behavior**
- **`pnrType`**: User-provided when fetching queue, applies to all bookings in that queue
- **Other operational fields**: Fully editable by users/admins after fetching
- **Indexed**: All new fields are indexed for fast querying  

This frontend integration provides a complete booking management system that works seamlessly with your Amadeus booking backend! 🚀
