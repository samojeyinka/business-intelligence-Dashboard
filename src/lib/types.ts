export interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  lastLogin: string;
}

export interface AuthUser extends User {
  token: string;
}


export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}


export interface LoginCredentials {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}


export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}



export interface Metric {
  id: string;
  title: string;
  value: number | string;
  change: number;
  icon?: string; 
  trend: 'up' | 'down' | 'neutral';
}

export interface SalesData {
  date: string;
  revenue: number;
  transactions: number;
}


export interface UserGrowthData {
  month: string;
  newUsers: number;
  activeUsers: number;
}


export interface CategoryData {
  name: string;
  value: number;
  color: string;
}


export interface TableData {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}