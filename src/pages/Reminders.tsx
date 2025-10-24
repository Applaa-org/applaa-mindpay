import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Bell, Clock, Settings } from 'lucide-react';
import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { showSuccess } from '@/utils/toast';

const Reminders = () => {
  const [reminders, setReminders] = useState({
    email: true,
    push: false,
    sms: false,
    before3Days: true,
    before1Day: true,
    onDueDate: true,
    overdue: true
  });

  const handleToggle = (key: string) => {
    setReminders(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    showSuccess(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} reminder ${reminders[key] ? 'disabled' : 'enabled'}`);
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

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <Bell className="h-6 w-6 mr-3 text-blue-600" />
                Reminder Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Types */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Notification Types
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="email" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive reminders via email</p>
                    </div>
                    <Switch
                      id="email"
                      checked={reminders.email}
                      onCheckedChange={() => handleToggle('email')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="push" className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Get notified on your device</p>
                    </div>
                    <Switch
                      id="push"
                      checked={reminders.push}
                      onCheckedChange={() => handleToggle('push')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="sms" className="font-medium">SMS Alerts</Label>
                      <p className="text-sm text-gray-500">Text message reminders</p>
                    </div>
                    <Switch
                      id="sms"
                      checked={reminders.sms}
                      onCheckedChange={() => handleToggle('sms')}
                    />
                  </div>
                </div>
              </div>

              {/* Reminder Timing */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Reminder Timing
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="before3Days" className="font-medium">3 Days Before</Label>
                      <p className="text-sm text-gray-500">Get reminded 3 days before due date</p>
                    </div>
                    <Switch
                      id="before3Days"
                      checked={reminders.before3Days}
                      onCheckedChange={() => handleToggle('before3Days')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="before1Day" className="font-medium">1 Day Before</Label>
                      <p className="text-sm text-gray-500">Reminder one day before due date</p>
                    </div>
                    <Switch
                      id="before1Day"
                      checked={reminders.before1Day}
                      onCheckedChange={() => handleToggle('before1Day')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="onDueDate" className="font-medium">On Due Date</Label>
                      <p className="text-sm text-gray-500">Final reminder on the due date</p>
                    </div>
                    <Switch
                      id="onDueDate"
                      checked={reminders.onDueDate}
                      onCheckedChange={() => handleToggle('onDueDate')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="overdue" className="font-medium">Overdue Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified if bill becomes overdue</p>
                    </div>
                    <Switch
                      id="overdue"
                      checked={reminders.overdue}
                      onCheckedChange={() => handleToggle('overdue')}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <MadeWithApplaa />
    </div>
  );
};

export default Reminders;