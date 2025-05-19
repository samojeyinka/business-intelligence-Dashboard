import { NextRequest, NextResponse } from 'next/server';


const MOCK_USERS: any[] = [
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
    const { fullName, email, password, confirmPassword } = await request.json();

   
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'Passwords do not match' },
        { status: 400 }
      );
    }

  
    const existingUser = MOCK_USERS.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already in use' },
        { status: 409 }
      );
    }

 
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email,
      password, 
      fullName,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

   
    MOCK_USERS.push(newUser);


    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { message: 'Registration successful', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}