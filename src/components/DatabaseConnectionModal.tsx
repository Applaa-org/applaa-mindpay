import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, Database, Key, Link2 } from 'lucide-react';
import { DatabaseService, createDatabaseService } from './DatabaseService';
import { showSuccess, showError } from '@/utils/toast';

interface DatabaseConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (service: DatabaseService) => void;
}

export const DatabaseConnectionModal: React.FC<DatabaseConnectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onConnect 
}) => {
  const [databaseType, setDatabaseType] = useState<'google-sheets' | 'airtable'>('google-sheets');
  const [sheetId, setSheetId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [baseId, setBaseId] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (databaseType === 'google-sheets' && !sheetId.trim()) {
      showError('Please enter a Google Sheet ID');
      return;
    }

    if (databaseType === 'airtable' && (!apiKey.trim() || !baseId.trim())) {
      showError('Please enter both Airtable API Key and Base ID');
      return;
    }

    setIsConnecting(true);

    try {
      const service = createDatabaseService(databaseType);
      
      let connected = false;
      if (databaseType === 'google-sheets') {
        connected = await service.connect({ sheetId });
      } else {
        connected = await service.connect({ apiKey, baseId });
      }

      if (connected) {
        onConnect(service);
        onClose();
        // Reset form
        setSheetId('');
        setApiKey('');
        setBaseId('');
      }
    } catch (error) {
      showError('Failed to connect to database');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white/95 backdrop-blur-sm border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Connect Database
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="database-type">Database Type</Label>
            <Select value={databaseType} onValueChange={(value) => setDatabaseType(value as 'google-sheets' | 'airtable')}>
              <SelectTrigger className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                <SelectValue placeholder="Select database type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google-sheets">
                  <div className="flex items-center space-x-2">
                    <Sheet className="h-4 w-4" />
                    <span>Google Sheets</span>
                  </div>
                </SelectItem>
                <SelectItem value="airtable">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4" />
                    <span>Airtable</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {databaseType === 'google-sheets' ? (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-blue-900 flex items-center">
                  <Sheet className="h-4 w-4 mr-2" />
                  Google Sheets Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sheet-id">Google Sheet ID</Label>
                  <Input
                    id="sheet-id"
                    value={sheetId}
                    onChange={(e) => setSheetId(e.target.value)}
                    placeholder="Enter your Google Sheet ID"
                    className="mt-1 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <p className="text-xs text-blue-600 mt-1">
                    Find this in your Google Sheets URL: docs.google.com/spreadsheets/d/[SHEET_ID]/edit
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-purple-900 flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Airtable Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Airtable API Key"
                    className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                  <p className="text-xs text-purple-600 mt-1">
                    Get your API key from Airtable account settings
                  </p>
                </div>
                <div>
                  <Label htmlFor="base-id">Base ID</Label>
                  <Input
                    id="base-id"
                    value={baseId}
                    onChange={(e) => setBaseId(e.target.value)}
                    placeholder="Enter your Airtable Base ID"
                    className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                  <p className="text-xs text-purple-600 mt-1">
                    Find this in your Airtable base URL
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex space-x-3">
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4 mr-2" />
                  Connect
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};