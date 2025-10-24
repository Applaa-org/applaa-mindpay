import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, Sparkles, Database } from 'lucide-react';
import { categories } from '@/data/bills';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { showSuccess, showError } from '@/utils/toast';
import { DatabaseConnectionModal } from '@/components/DatabaseConnectionModal';
import { DatabaseService, createDatabaseService } from '@/components/DatabaseService';

const AddBill = () => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: '',
    category: '',
    description: '',
    aiText: ''
  });

  const [isParsing, setIsParsing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatabaseModal, setShowDatabaseModal] = useState(false);
  const [databaseService, setDatabaseService] = useState<DatabaseService | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  // Simple AI text parsing function
  const parseAIText = () => {
    if (!formData.aiText.trim()) {
      showError('Please enter some text to parse');
      return;
    }

    setIsParsing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const text = formData.aiText.toLowerCase();
      let parsedData: any = {};

      // Extract amount
      const amountMatch = text.match(/(?:rs\.?|rupees|₹)\s*(\d+(?:,\d{3})*(?:\.\d{2})?)/i);
      if (amountMatch) {
        parsedData.amount = amountMatch[1].replace(/,/g, '');
      }

      // Extract date
      const datePatterns = [
        /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/, // DD/MM/YYYY
        /\b(\d{1,2})-(\d{1,2})-(\d{4})\b/, // DD-MM-YYYY
        /\b(\d{4})-(\d{1,2})-(\d{1,2})\b/, // YYYY-MM-DD
      ];

      for (const pattern of datePatterns) {
        const dateMatch = text.match(pattern);
        if (dateMatch) {
          if (pattern.source.includes('YYYY-MM-DD')) {
            parsedData.dueDate = `${dateMatch[1]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[3].padStart(2, '0')}`;
          } else {
            parsedData.dueDate = `${dateMatch[3]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[1].padStart(2, '0')}`;
          }
          break;
        }
      }

      // Extract bill name/type
      if (text.includes('electricity') || text.includes('power')) {
        parsedData.name = 'Electricity Bill';
        parsedData.category = 'electricity';
      } else if (text.includes('water')) {
        parsedData.name = 'Water Bill';
        parsedData.category = 'water';
      } else if (text.includes('credit card') || text.includes('card')) {
        parsedData.name = 'Credit Card Bill';
        parsedData.category = 'credit-card';
      } else if (text.includes('internet') || text.includes('wifi') || text.includes('broadband')) {
        parsedData.name = 'Internet Bill';
        parsedData.category = 'internet';
      } else if (text.includes('phone') || text.includes('mobile')) {
        parsedData.name = 'Phone Bill';
        parsedData.category = 'phone';
      } else if (text.includes('insurance')) {
        parsedData.name = 'Insurance Premium';
        parsedData.category = 'insurance';
      } else if (text.includes('emi') || text.includes('loan')) {
        parsedData.name = 'Loan EMI';
        parsedData.category = 'emi';
      }

      // Update form with parsed data
      setFormData(prev => ({
        ...prev,
        ...parsedData,
        name: parsedData.name || prev.name,
        amount: parsedData.amount || prev.amount,
        dueDate: parsedData.dueDate || prev.dueDate,
        category: parsedData.category || prev.category
      }));

      setIsParsing(false);
      showSuccess('AI has parsed your bill details!');
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount || !formData.dueDate || !formData.category) {
      showError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const newBill = {
        name: formData.name,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        category: formData.category as 'electricity' | 'water' | 'emi' | 'loan' | 'credit-card' | 'internet' | 'phone' | 'insurance' | 'other',
        description: formData.description,
        status: 'pending' as const
      };

      if (databaseService) {
        // Save to database
        await databaseService.addBill(newBill);
        showSuccess('Bill added successfully and saved to database ✅');
      } else {
        // Save to local storage (fallback)
        const existingBills = JSON.parse(localStorage.getItem('bills') || '[]');
        const billWithId = {
          ...newBill,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        existingBills.push(billWithId);
        localStorage.setItem('bills', JSON.stringify(existingBills));
        showSuccess('Bill added successfully ✅');
      }

      // Reset form
      setFormData({
        name: '',
        amount: '',
        dueDate: '',
        category: '',
        description: '',
        aiText: ''
      });

      // Navigate back to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      showError('Failed to add bill. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDatabaseConnect = (service: DatabaseService) => {
    setDatabaseService(service);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Link>

          {/* Database Connection Banner */}
          {!databaseService && (
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Connect to Database</h3>
                      <p className="text-sm text-blue-700">Save your bills to Google Sheets or Airtable for persistent storage</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowDatabaseModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Add New Bill</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your bill details manually or use AI to extract information from text
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* AI Text Parser Section */}
              <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-3">
                  <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">AI Bill Parser</h3>
                </div>
                <Textarea
                  placeholder="Paste your bill text here (e.g., 'Your electricity bill of Rs. 1250 is due on 20/01/2024...')"
                  value={formData.aiText}
                  onChange={(e) => setFormData({...formData, aiText: e.target.value})}
                  className="mb-3 border-blue-200 focus:border-blue-400"
                  rows={3}
                />
                <Button
                  type="button"
                  onClick={parseAIText}
                  disabled={isParsing}
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                >
                  {isParsing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Upload size={16} className="mr-2" />
                      Parse with AI
                    </>
                  )}
                </Button>
              </div>

              {/* Manual Form Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">Bill Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Electricity Bill"
                    className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount" className="text-gray-700 font-medium">Amount *</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="1250"
                      className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate" className="text-gray-700 font-medium">Due Date *</Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" className="text-gray-700 font-medium">Category *</Label>
                  <Select value={formData.category} onValueChange={handleSelectChange} required>
                    <SelectTrigger className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center space-x-2">
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Additional details about this bill"
                    className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      'Add Bill'
                    )}
                  </Button>
                  <Link to="/" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <MadeWithApplaa />
      
      {/* Database Connection Modal */}
      <DatabaseConnectionModal
        isOpen={showDatabaseModal}
        onClose={() => setShowDatabaseModal(false)}
        onConnect={handleDatabaseConnect}
      />
    </div>
  );
};

export default AddBill;