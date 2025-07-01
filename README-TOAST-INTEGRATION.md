# Toast POS Notification Integration

## How It Works on Vercel

### Architecture Overview
```
[Customer Website] → [Vercel API Route] → [Toast API] → [POS Terminals]
```

### Data Flow
1. **Customer submits reservation** on your website
2. **Frontend sends POST request** to `/api/send-toast-notification`
3. **Vercel serverless function** receives the request
4. **Function calls Toast API** with your credentials
5. **Toast delivers notification** to your POS terminals
6. **Staff sees instant alert** on Toast screens

### Security Measures

#### 1. Environment Variables (Stored Securely in Vercel)
```bash
# These are stored encrypted in Vercel dashboard
TOAST_RESTAURANT_GUID=your-restaurant-guid
TOAST_API_KEY=your-api-key
```

#### 2. HTTPS Encryption
- All communication is encrypted with TLS/SSL
- Customer data → Vercel: HTTPS encrypted
- Vercel → Toast API: HTTPS encrypted
- No data sent in plain text

#### 3. API Key Security
- API keys never exposed to frontend/browser
- Stored securely in Vercel environment variables
- Only accessible by server-side code
- Can be rotated/changed anytime

#### 4. Data Validation
```typescript
// Server validates all data before sending to Toast
const requiredFields = ['guestName', 'guestEmail', 'guestPhone', 'partySize'];
const missingFields = requiredFields.filter(field => !reservationData[field]);
```

#### 5. Error Handling
- If Toast API fails, customer still gets confirmation
- No sensitive data logged in errors
- Graceful fallback to email-only system

### Setup Instructions

#### 1. Get Toast API Credentials
Contact your Toast account manager or support to request:
- Restaurant GUID
- API Key with notifications permission
- Developer access (may require approval)

#### 2. Configure Vercel Environment Variables
In your Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add these variables:
   ```
   TOAST_RESTAURANT_GUID = your-actual-guid
   TOAST_API_KEY = your-actual-api-key
   ```

#### 3. Deploy to Vercel
```bash
# Build and deploy
npm run build
vercel --prod
```

### What Staff Will See

When a reservation is made, Toast terminals will display:
```
🔔 NEW RESERVATION ALERT
Name: John Smith
📅 Jul 15, 2024 at 7:00 PM
👥 Party of 4
📞 (555) 123-4567
Special: Anniversary dinner

[ACKNOWLEDGE] [DISMISS]
```

### API Endpoints

#### Send Notification
```
POST /api/send-toast-notification
Content-Type: application/json

{
  "guestName": "John Smith",
  "guestEmail": "john@email.com",
  "guestPhone": "(555) 123-4567",
  "partySize": 4,
  "reservationDate": "2024-07-15",
  "reservationTime": "7:00 PM",
  "specialRequests": "Anniversary dinner"
}
```

#### Health Check
```
GET /api/send-toast-notification
```

### Security Best Practices

1. **Never commit API keys** to git repository
2. **Use environment variables** for all sensitive data
3. **Validate all input data** before sending to Toast
4. **Monitor API usage** for unusual activity
5. **Rotate API keys** periodically
6. **Use HTTPS only** (automatic with Vercel)

### Troubleshooting

#### Common Issues:
- **"Authentication failed"** → Check API key and restaurant GUID
- **"No notification received"** → Verify Toast terminals are online
- **"API rate limit"** → Toast has rate limits, implement retry logic

#### Testing:
1. Test with Toast sandbox environment first
2. Use health check endpoint to verify API connectivity
3. Check Vercel function logs for errors

### Cost Considerations

#### Vercel Costs:
- Serverless function calls: ~$0.0000002 per request
- Very cheap for restaurant reservation volume

#### Toast API Costs:
- API calls are typically free with Toast subscription
- No additional monthly fees for basic notifications
- Much cheaper than Toast Tables add-on

### Privacy & Compliance

- Customer data is only sent to Toast (your POS provider)
- No third-party tracking or analytics
- Data transmission is encrypted end-to-end
- Customer email/phone only used for reservation confirmation 