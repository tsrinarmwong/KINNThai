export const TOAST_CONFIG = {
  // These values should be obtained from your TOAST dashboard
  restaurantId: process.env.NEXT_PUBLIC_TOAST_RESTAURANT_ID,
  apiKey: process.env.TOAST_API_KEY,
  apiSecret: process.env.TOAST_API_SECRET,
  menuId: process.env.NEXT_PUBLIC_TOAST_MENU_ID,
  // TOAST API endpoints
  endpoints: {
    menu: 'https://api.toasttab.com/v1/menu',
    order: 'https://api.toasttab.com/v1/orders',
    locations: 'https://api.toasttab.com/v1/locations',
  }
}; 