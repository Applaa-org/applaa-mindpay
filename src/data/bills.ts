export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: 'electricity' | 'water' | 'emi' | 'loan' | 'credit-card' | 'internet' | 'phone' | 'insurance' | 'other';
  status: 'pending' | 'paid' | 'overdue';
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const categories = [
  { id: 'electricity', name: 'Electricity', icon: '⚡', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'water', name: 'Water', icon: '💧', color: 'bg-blue-100 text-blue-800' },
  { id: 'emi', name: 'EMI', icon: '🏠', color: 'bg-green-100 text-green-800' },
  { id: 'loan', name: 'Loan', icon: '🏦', color: 'bg-purple-100 text-purple-800' },
  { id: 'credit-card', name: 'Credit Card', icon: '💳', color: 'bg-red-100 text-red-800' },
  { id: 'internet', name: 'Internet', icon: '🌐', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'phone', name: 'Phone', icon: '📱', color: 'bg-pink-100 text-pink-800' },
  { id: 'insurance', name: 'Insurance', icon: '🛡️', color: 'bg-orange-100 text-orange-800' },
  { id: 'other', name: 'Other', icon: '📋', color: 'bg-gray-100 text-gray-800' },
];

export const mockBills: Bill[] = [
  {
    id: '1',
    name: 'Monthly Electricity Bill',
    amount: 1250,
    dueDate: '2024-01-20',
    category: 'electricity',
    status: 'pending',
    description: 'BESCOM electricity bill for January',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Home Loan EMI',
    amount: 35000,
    dueDate: '2024-01-25',
    category: 'emi',
    status: 'pending',
    description: 'Monthly home loan installment',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Credit Card Payment',
    amount: 5200,
    dueDate: '2024-01-18',
    category: 'credit-card',
    status: 'pending',
    description: 'HDFC Credit Card bill',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '4',
    name: 'Water Bill',
    amount: 450,
    dueDate: '2024-01-22',
    category: 'water',
    status: 'pending',
    description: 'Monthly water supply bill',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '5',
    name: 'Internet Bill',
    amount: 899,
    dueDate: '2024-01-15',
    category: 'internet',
    status: 'paid',
    description: 'ACT FiberNet monthly subscription',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '6',
    name: 'Phone Bill',
    amount: 599,
    dueDate: '2024-01-28',
    category: 'phone',
    status: 'pending',
    description: 'Jio postpaid connection',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
];