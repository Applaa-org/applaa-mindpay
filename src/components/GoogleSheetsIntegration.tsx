import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, Upload, Download, Settings } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface GoogleSheetsIntegrationProps {
  bills: any[];
  onDataLoad: (data: any[]) => void;
}

const GoogleSheetsIntegration: React.FC<GoogleSheetsIntegrationProps> = ({ bills, onDataLoad }) => {
  const [sheetId, setSheetId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate Google Sheets connection
  const connectToSheets = async () => {
    if (!sheetId.trim()) {
      showError('Please enter a Google Sheet ID');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      showSuccess('Connected to Google Sheets successfully!');
      
      // Simulate loading data from sheets
      const mockSheetData = [
        {
          id: 'sheet-1',
          name: 'Sample Electricity Bill',
          amount: 1500,
          dueDate: '2024-02-15',
          category: 'electricity',
          status: 'pending',
          description: 'Sample bill from Google Sheets',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      onDataLoad(mockSheetData);
    }, 2000);
  };

  // Simulate data export to Google Sheets
  const exportToSheets = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      showSuccess(`Exported ${bills.length} bills to Google Sheets!`);
    }, 1500);
  };

  // Simulate data import from Google Sheets
  const importFromSheets = async () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      showSuccess('Imported data from Google Sheets successfully!');
    }, 1500);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sheet className="h-5 w-5 mr-2" />
          Google Sheets Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="sheetId">Google Sheet ID</Label>
          <Input
            id="sheetId"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
            placeholder="Enter your Google Sheet ID"
            disabled={isConnected}
            className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can find this in your Google Sheets URL
          </p>
        </div>

        {!isConnected ? (
          <Button
            onClick={connectToSheets}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              'Connect to Google Sheets'
            )}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
              <span className="text-green-600 font-medium">✓ Connected to Google Sheets</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={importFromSheets}
                disabled={isLoading}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Download size={16} className="mr-2" />
                Import
              </Button>
              <Button
                onClick={exportToSheets}
                disabled={isLoading}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <Upload size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleSheetsIntegration;