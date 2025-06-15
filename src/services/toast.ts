import { TOAST_CONFIG } from '@/config/toast';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
}

interface OrderItem {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
}

interface Order {
  items: OrderItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  deliveryInfo?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export class ToastService {
  private static async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const headers = {
      'Authorization': `Bearer ${TOAST_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(endpoint, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`TOAST API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async getMenu(): Promise<MenuItem[]> {
    const endpoint = `${TOAST_CONFIG.endpoints.menu}/${TOAST_CONFIG.menuId}`;
    return this.fetchWithAuth(endpoint);
  }

  static async createOrder(order: Order) {
    const endpoint = `${TOAST_CONFIG.endpoints.order}`;
    return this.fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        restaurantId: TOAST_CONFIG.restaurantId,
        ...order,
      }),
    });
  }

  static async getLocations() {
    const endpoint = `${TOAST_CONFIG.endpoints.locations}`;
    return this.fetchWithAuth(endpoint);
  }
} 