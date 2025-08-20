export class AmadeusBookingService {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/myrahala/bookings';
  }

  // Fetch queue items and optionally detailed booking information
  async fetchQueueAndBookings(request) {
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
  async getQueueStatistics(queueId, category = 0) {
    const response = await fetch(`${this.baseUrl}/queues/${queueId}/statistics?category=${category}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get queue statistics: ${response.statusText}`);
    }

    return response.json();
  }

  // List bookings with filters
  async getBookings(filters = {}) {
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
  async getBookingByReference(reference) {
    const response = await fetch(`${this.baseUrl}/bookings/${reference}`);
    
    if (!response.ok) {
      throw new Error(`Failed to get booking: ${response.statusText}`);
    }

    return response.json();
  }

  // Update booking
  async updateBooking(reference, updates) {
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
  async refreshBooking(reference) {
    const response = await fetch(`${this.baseUrl}/bookings/${reference}/refresh`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh booking: ${response.statusText}`);
    }

    return response.json();
  }

  // Perform booking action
  async performBookingAction(reference, action) {
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

  // Delete booking
  async deleteBooking(reference) {
    const response = await fetch(`${this.baseUrl}/bookings/${reference}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete booking: ${response.statusText}`);
    }

    return response.json();
  }
}
