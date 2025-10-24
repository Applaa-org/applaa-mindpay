import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bill } from '@/data/bills';
import { categories } from '@/data/bills';
import { showSuccess, showError } from '@/utils/toast';

interface EditBillModalProps {
  bill: Bill;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (bill: Bill) => void;
}

export const EditBillModal: React.FC<EditBillModalProps> = ({ bill, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: '',
    category: '',
    description: '',
    status: 'pending' as 'pending' | 'paid' | 'overdue'
  });

  useEffect(() => {
    if (bill) {
      setFormData({
        name: bill.name,
        amount: bill.amount.toString(),
        dueDate: bill.dueDate,
        category: bill.category,
        description: bill.description || '',
        status: bill.status
      });
    }
  }, [bill]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount || !formData.dueDate || !formData.category) {
      showError('Please fill in all required fields');
      return;
    }

    const updatedBill: Bill = {
      ...bill,
      name: formData.name,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      category: formData.category as Bill['category'],
      description: formData.description,
      status: formData.status,
      updatedAt: new Date().toISOString()
    };

    onUpdate(updatedBill);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Edit Bill</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name" className="text-gray-700 font-medium">Bill Name *</Label>
            <Input
              id="edit-name"
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
              <Label htmlFor="edit-amount" className="text-gray-700 font-medium">Amount *</Label>
              <Input
                id="edit-amount"
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
              <Label htmlFor="edit-dueDate" className="text-gray-700 font-medium">Due Date *</Label>
              <Input
                id="edit-dueDate"
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
            <Label htmlFor="edit-category" className="text-gray-700 font-medium">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)} required>
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
            <Label htmlFor="edit-status" className="text-gray-700 font-medium">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-description" className="text-gray-700 font-medium">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Additional details about this bill"
              className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
            >
              Update Bill
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};