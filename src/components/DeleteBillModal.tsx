import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bill } from '@/data/bills';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteBillModalProps {
  bill: Bill;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (billId: string) => void;
}

export const DeleteBillModal: React.FC<DeleteBillModalProps> = ({ bill, isOpen, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(bill.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
            Delete Bill
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Are you sure you want to delete this bill? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">{bill.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Amount: ₹{bill.amount.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-gray-600">
              Due Date: {new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <p className="text-sm text-gray-600">
              Category: {bill.category}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-all duration-200"
          >
            <Trash2 size={16} className="mr-2" />
            Delete Bill
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};