'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Settings, Lock, Palette, Trash2, Info, Shield, Moon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';

export default function SettingsPage() {
  const { logout } = useAuth();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);

  const handlePinChange = () => {
    if (newPin !== confirmPin) {
      alert('PINs do not match');
      return;
    }
    if (newPin.length !== 4) {
      alert('PIN must be 4 digits');
      return;
    }
    // In production, this would update the PIN via API
    localStorage.setItem('mission-control-pin', newPin);
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setShowPinChange(false);
    alert('PIN updated successfully');
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all local data? This will log you out.')) {
      localStorage.clear();
      logout();
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Home Button */}
      <div className="flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Back to Mission Control</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Settings className="w-7 h-7 text-amber-500" />
          Settings
        </h1>
        <p className="text-slate-400 mt-1">Configure Mission Control preferences</p>
      </div>

      {/* Security */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            Security
          </CardTitle>
          <CardDescription className="text-slate-400">
            Manage your access PIN
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showPinChange ? (
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => setShowPinChange(true)}
            >
              <Lock className="w-4 h-4 mr-2" />
              Change PIN
            </Button>
          ) : (
            <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div className="space-y-2">
                <Label className="text-slate-300">Current PIN</Label>
                <Input 
                  type="password" 
                  maxLength={4}
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ''))}
                  className="bg-slate-800 border-slate-600 text-white max-w-[200px]"
                  placeholder="••••"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">New PIN</Label>
                <Input 
                  type="password" 
                  maxLength={4}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                  className="bg-slate-800 border-slate-600 text-white max-w-[200px]"
                  placeholder="••••"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Confirm New PIN</Label>
                <Input 
                  type="password" 
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                  className="bg-slate-800 border-slate-600 text-white max-w-[200px]"
                  placeholder="••••"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handlePinChange}
                  className="bg-amber-500 hover:bg-amber-600 text-black"
                >
                  Update PIN
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-slate-400"
                  onClick={() => setShowPinChange(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-500" />
            Appearance
          </CardTitle>
          <CardDescription className="text-slate-400">
            Customize the look and feel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-sm text-slate-500">Dark theme is always enabled</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-400 text-sm rounded">
              Always On
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Data */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-500" />
            Data Management
          </CardTitle>
          <CardDescription className="text-slate-400">
            Manage local data and cache
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            onClick={handleClearData}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Local Data
          </Button>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-amber-500" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-400">
          <p><span className="text-slate-300">Version:</span> 1.0.0</p>
          <p><span className="text-slate-300">Built by:</span> Oden + Romo</p>
          <p><span className="text-slate-300">Stack:</span> Next.js 14, React, Tailwind CSS</p>
          <p><span className="text-slate-300">Updated:</span> March 26, 2026</p>
        </CardContent>
      </Card>
    </div>
  );
}
