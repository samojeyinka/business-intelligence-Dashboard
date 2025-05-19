import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';


const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password123',
    fullName: 'Demo User',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2023-05-10T00:00:00.000Z',
  },
   {
    id: '2',
    email: 'johndoe@gmail.com',
    password: 'johnDoe1343',
    fullName: 'John Doe',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2023-05-10T00:00:00.000Z',
  },

    {
    id: '3',
    email: 'janedoe@gmail.com',
    password: 'janeDoe1343',
    fullName: 'Jane Doe',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2023-05-10T00:00:00.000Z',
  },

   {
    id: '4',
    email: 'hr@branddrive.co',
    password: 'secretPass001',
    fullName: 'Beatrice Omoh',
    createdAt: '2023-01-01T00:00:00.000Z',
    lastLogin: '2023-05-10T00:00:00.000Z',
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password, keepLoggedIn } = await request.json();


    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

 
    const user = MOCK_USERS.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );


    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }


    const token = uuidv4();
    const expiryDate = keepLoggedIn
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
      : new Date(Date.now() + 24 * 60 * 60 * 1000); 


    cookies().set({
      name: 'user_token',
      value: token,
      expires: expiryDate,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

  
    const updatedUser = {
      ...user,
      lastLogin: new Date().toISOString(),
      token, 
    };

 
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}