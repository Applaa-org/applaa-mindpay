import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockBills, categories } from '@/data/bills';
import { Bill } from '@/data/bills';
import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { showSuccess } from '@/utils/toast';

const Index = () => {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [totalAmount, setTotalAmount] = useState(0);
  const [nextDueDate, setNextDueDate] = useState<string>('');

  useEffect(() => {
    // Calculate total pending amount
    const pendingBills = bills.filter(bill => bill.status === 'pending');
    const total = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);
    setTotalAmount(total);

    // Find next due date
    if (pendingBills.length > 0) {
      const sortedBills = pendingBills.sort((a, b) => 
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
      setNextDueDate(sortedBills[0].dueDate);
    }
  }, [bills]);

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[categories.length - 1];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Pending</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</div>
              <p className="text-xs text-gray-500 mt-1">
                {bills.filter(b => b.status === 'pending').length} bills pending
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Next Due</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {nextDueDate ? formatDate(nextDueDate) : 'No bills'}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {nextDueDate ? `Due in ${Math.ceil((new Date(nextDueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days` : 'All clear'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bills</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{bills.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                {bills.filter(b => b.status === 'paid').length} paid this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bills List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Bills</h2>
            <Link to="/add-bill">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center space-x-2 transition-all duration-200 hover:scale-105">
                <Plus size={16} />
                <span>Add Bill</span>
              </Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {bills.map((bill) => {
              const category = getCategoryInfo(bill.category);
              return (
                <Card key={bill.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center text-lg",
                          category.color
                        )}>
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{bill.name}</h3>
                          <p className="text-sm text-gray-500">{bill.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-600">{formatDate(bill.dueDate)}</span>
                            <span className="text-gray-400">•</span>
                            <Badge className={cn("text-xs", getStatusColor(bill.status))}>
                              {bill.status === 'paid' && <CheckCircle size={12} className="mr-1" />}
                              {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{formatCurrency(bill.amount)}</div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="mt-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                          onClick={() => showSuccess('Bill marked as paid!')}
                        >
                          Mark Paid
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <MadeWithApplaa />
    </div>
  );
};

export default Index;