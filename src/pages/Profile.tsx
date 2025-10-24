import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { showSuccess } from '@/utils/toast';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123, Main Street, Bangalore, 560001'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    showSuccess('Profile updated successfully!');
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
                <User className="h-6 w-6 mr-3 text-blue-600" />
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium flex items-center">
                    <User size={16} className="mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium flex items-center">
                    <Mail size={16} className="mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center">
                    <Phone size={16} className="mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-700 font-medium flex items-center">
                    <MapPin size={16} className="mr-2" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <MadeWithApplaa />
    </div>
  );
};

export default Profile;