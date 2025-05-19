import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  
  cookies().delete('user_token');
  
  return NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );
}