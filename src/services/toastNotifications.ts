// Toast POS Notifications Service
// Send reservation alerts directly to Toast POS terminals

export interface ReservationNotification {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  reservationDate: string;
  reservationTime: string;
  specialRequests?: string;
}

export interface ToastNotificationConfig {
  restaurantGuid: string;
  apiKey: string;
  environment: 'sandbox' | 'production';
}

export class ToastNotificationService {
  private config: ToastNotificationConfig;
  private baseUrl: string;

  constructor(config: ToastNotificationConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'production' 
      ? 'https://ws-api.toasttab.com' 
      : 'https://ws-api-sandbox.toasttab.com';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        'Toast-Restaurant-External-ID': this.config.restaurantGuid,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Toast API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Send reservation notification to all POS terminals
  async sendReservationNotification(reservation: ReservationNotification) {
    try {
      const notificationMessage = this.formatReservationMessage(reservation);
      
      const notification = {
        message: notificationMessage,
        priority: 'HIGH', // Makes it pop up immediately
        targetDevices: 'ALL_POS', // Send to all POS terminals
        category: 'RESERVATION', // Custom category for reservations
        requireAcknowledgment: true, // Staff must acknowledge they saw it
        expiresInMinutes: 60, // Auto-clear after 1 hour
      };

      const result = await this.makeRequest('/notifications/v1/send', {
        method: 'POST',
        body: JSON.stringify(notification),
      });

      return {
        success: true,
        notificationId: result.id,
        message: 'Reservation notification sent to POS terminals',
      };
    } catch (error) {
      console.error('Error sending Toast notification:', error);
      throw error;
    }
  }

  // Format reservation details into a clear message
  private formatReservationMessage(reservation: ReservationNotification): string {
    const date = new Date(reservation.reservationDate).toLocaleDateString();
    const specialRequests = reservation.specialRequests 
      ? `\nSpecial: ${reservation.specialRequests}` 
      : '';

    return `🍽️ NEW RESERVATION
Name: ${reservation.guestName}
📅 ${date} at ${reservation.reservationTime}
👥 Party of ${reservation.partySize}
📞 ${reservation.guestPhone}${specialRequests}

Please prepare for arrival!`;
  }

  // Send a general alert to POS (can be used for other notifications too)
  async sendGeneralAlert(message: string, priority: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM') {
    try {
      const notification = {
        message,
        priority,
        targetDevices: 'ALL_POS',
        category: 'GENERAL',
        requireAcknowledgment: true,
      };

      const result = await this.makeRequest('/notifications/v1/send', {
        method: 'POST',
        body: JSON.stringify(notification),
      });

      return {
        success: true,
        notificationId: result.id,
      };
    } catch (error) {
      console.error('Error sending general alert:', error);
      throw error;
    }
  }

  // Send notification to specific device/terminal
  async sendToSpecificDevice(deviceId: string, message: string) {
    try {
      const notification = {
        message,
        priority: 'MEDIUM',
        targetDeviceId: deviceId,
        category: 'TARGETED',
        requireAcknowledgment: true,
      };

      const result = await this.makeRequest('/notifications/v1/send', {
        method: 'POST',
        body: JSON.stringify(notification),
      });

      return {
        success: true,
        notificationId: result.id,
      };
    } catch (error) {
      console.error('Error sending targeted notification:', error);
      throw error;
    }
  }

  // Get list of connected devices (POS terminals, tablets, etc.)
  async getConnectedDevices() {
    try {
      const devices = await this.makeRequest('/devices/v1/list');
      return devices;
    } catch (error) {
      console.error('Error getting devices:', error);
      throw error;
    }
  }
}

// Configuration - this would come from environment variables
export const toastNotificationConfig: ToastNotificationConfig = {
  restaurantGuid: process.env.TOAST_RESTAURANT_GUID || '',
  apiKey: process.env.TOAST_API_KEY || '',
  environment: (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'sandbox' | 'production',
};

export const toastNotificationService = new ToastNotificationService(toastNotificationConfig); 