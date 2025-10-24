import { Bill } from '@/data/bills';
import { showSuccess, showError } from '@/utils/toast';

export interface DatabaseService {
  connect: (config: any) => Promise<boolean>;
  getAllBills: () => Promise<Bill[]>;
  addBill: (bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Bill>;
  updateBill: (id: string, bill: Partial<Bill>) => Promise<Bill>;
  deleteBill: (id: string) => Promise<boolean>;
  exportBills: (bills: Bill[]) => Promise<boolean>;
}

// Google Sheets Service
export class GoogleSheetsService implements DatabaseService {
  private sheetId: string = '';
  private isConnected: boolean = false;

  async connect(config: { sheetId: string }): Promise<boolean> {
    try {
      this.sheetId = config.sheetId;
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      this.isConnected = true;
      showSuccess('Connected to Google Sheets successfully!');
      return true;
    } catch (error) {
      showError('Failed to connect to Google Sheets');
      return false;
    }
  }

  async getAllBills(): Promise<Bill[]> {
    if (!this.isConnected) {
      showError('Not connected to Google Sheets');
      return [];
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock data - in real implementation, this would fetch from Google Sheets
      const mockBills: Bill[] = [
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
        }
      ];
      
      return mockBills;
    } catch (error) {
      showError('Failed to fetch bills from Google Sheets');
      return [];
    }
  }

  async addBill(bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill> {
    if (!this.isConnected) {
      throw new Error('Not connected to Google Sheets');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBill: Bill = {
        ...bill,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      showSuccess('Bill added to Google Sheets successfully!');
      return newBill;
    } catch (error) {
      showError('Failed to add bill to Google Sheets');
      throw error;
    }
  }

  async updateBill(id: string, updates: Partial<Bill>): Promise<Bill> {
    if (!this.isConnected) {
      throw new Error('Not connected to Google Sheets');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedBill: Bill = {
        id,
        ...updates,
        updatedAt: new Date().toISOString()
      } as Bill;
      
      showSuccess('Bill updated in Google Sheets successfully!');
      return updatedBill;
    } catch (error) {
      showError('Failed to update bill in Google Sheets');
      throw error;
    }
  }

  async deleteBill(id: string): Promise<boolean> {
    if (!this.isConnected) {
      throw new Error('Not connected to Google Sheets');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showSuccess('Bill deleted from Google Sheets successfully!');
      return true;
    } catch (error) {
      showError('Failed to delete bill from Google Sheets');
      return false;
    }
  }

  async exportBills(bills: Bill[]): Promise<boolean> {
    if (!this.isConnected) {
      throw new Error('Not connected to Google Sheets');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccess(`Exported ${bills.length} bills to Google Sheets!`);
      return true;
    } catch (error) {
      showError('Failed to export bills to Google Sheets');
      return false;
    }
  }
}

// Airtable Service
export class AirtableService implements DatabaseService {
  private apiKey: string = '';
  private baseId: string = '';
  private isConnected: boolean = false;

  async connect(config: { apiKey: string; baseId: string }): Promise<boolean> {
    try {
      this.apiKey = config.apiKey;
      this.baseId = config.baseId;
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      this.isConnected = true;
      showSuccess('Connected to Airtable successfully!');
      return true;
    } catch (error) {
      showError('Failed to connect to Airtable');
      return false;
    }
  }

  async getAllBills(): Promise<Bill[]> {
    if (!this.isConnected) {
      showError('Not connected to Airtable');
      return [];
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return mock data - in real implementation, this would fetch from Airtable
      return []; // Would return actual Airtable data
    } catch (error) {
      showError('Failed to fetch bills from Airtable');
      return [];
    }
  }

  async addBill(bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill> {
    if (!this.isConnected) {
      throw new Error('Not connected to Airtable');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBill: Bill = {
        ...bill,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      showSuccess('Bill added to Airtable successfully!');
      return newBill;
    } catch (error) {
      showError('Failed to add bill to Airtable');
      throw error;
    }
  }

  async updateBill(id: string, updates: Partial<Bill>): Promise<Bill> {
    if (!this.isConnected) {
      throw new Error('Not connected to Airtable');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedBill: Bill = {
        id,
        ...updates,
        updatedAt: new Date().toISOString()
      } as Bill;
      
      showSuccess('Bill updated in Airtable successfully!');
      return updatedBill;
    } catch (error) {
      showError('Failed to update bill in Airtable');
      throw error;
    }
  }

  async deleteBill(id: string): Promise<boolean> {
    if (!this.isConnected) {
      throw new Error('Not connected to Airtable');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showSuccess('Bill deleted from Airtable successfully!');
      return true;
    } catch (error) {
      showError('Failed to delete bill from Airtable');
      return false;
    }
  }

  async exportBills(bills: Bill[]): Promise<boolean> {
    if (!this.isConnected) {
      throw new Error('Not connected to Airtable');
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccess(`Exported ${bills.length} bills to Airtable!`);
      return true;
    } catch (error) {
      showError('Failed to export bills to Airtable');
      return false;
    }
  }
}

// Factory function to create database service
export const createDatabaseService = (type: 'google-sheets' | 'airtable'): DatabaseService => {
  switch (type) {
    case 'google-sheets':
      return new GoogleSheetsService();
    case 'airtable':
      return new AirtableService();
    default:
      return new GoogleSheetsService();
  }
};