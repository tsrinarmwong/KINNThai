import { NextRequest, NextResponse } from 'next/server';
import { toastNotificationService } from '@/services/toastNotifications';

export async function POST(request: NextRequest) {
  try {
    const reservationData = await request.json();
    
    // Validate required fields
    const requiredFields = ['guestName', 'guestEmail', 'guestPhone', 'partySize', 'reservationDate', 'reservationTime'];
    const missingFields = requiredFields.filter(field => !reservationData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Development mode - skip Toast API for now
    const isDevelopment = !process.env.TOAST_API_KEY || !process.env.TOAST_RESTAURANT_GUID;
    
    if (isDevelopment) {
      console.log('🧪 DEVELOPMENT MODE: Simulating Toast notification for:', {
        name: reservationData.guestName,
        date: reservationData.reservationDate,
        time: reservationData.reservationTime,
        party: reservationData.partySize,
      });
      
      return NextResponse.json({
        success: true,
        message: 'Development mode: Toast notification simulated',
        mode: 'development',
        data: reservationData,
      });
    }

    // Production mode - try to send to Toast (when we have real API)
    const result = await toastNotificationService.sendReservationNotification({
      guestName: reservationData.guestName,
      guestEmail: reservationData.guestEmail,
      guestPhone: reservationData.guestPhone,
      partySize: reservationData.partySize,
      reservationDate: reservationData.reservationDate,
      reservationTime: reservationData.reservationTime,
      specialRequests: reservationData.specialRequests,
    });

    return NextResponse.json({
      success: true,
      message: 'Reservation notification sent to POS terminals',
      notificationId: result.notificationId,
    });

  } catch (error) {
    console.error('Error sending Toast notification:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send notification to POS terminals',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'Toast notification service is running',
    timestamp: new Date().toISOString(),
  });
} 