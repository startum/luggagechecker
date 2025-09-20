import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Smartphone, Monitor, Info } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

type InstallState = 'checking' | 'available' | 'not-available' | 'installed' | 'unsupported';

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'chrome';
  if (userAgent.includes('Edg')) return 'edge';
  if (userAgent.includes('Firefox')) return 'firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'safari';
  return 'other';
};

const isAppInstalled = () => {
  // Check if app is running in standalone mode
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  // Check for iOS standalone
  if ((window.navigator as any).standalone) {
    return true;
  }
  return false;
};

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installState, setInstallState] = useState<InstallState>('checking');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const browser = getBrowserInfo();

  useEffect(() => {
    console.log('PWA Install Button: Checking installation state...');
    
    // Check if already installed
    if (isAppInstalled()) {
      console.log('PWA Install Button: App is already installed');
      setInstallState('installed');
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('PWA Install Button: beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallState('available');
    };

    const handleAppInstalled = () => {
      console.log('PWA Install Button: App was installed');
      setInstallState('installed');
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Set timeout to show fallback if prompt doesn't fire
    const timeout = setTimeout(() => {
      if (!deferredPrompt && !isAppInstalled()) {
        console.log('PWA Install Button: beforeinstallprompt not fired, showing fallback');
        if (browser === 'chrome' || browser === 'edge') {
          setInstallState('not-available');
        } else {
          setInstallState('unsupported');
        }
      }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timeout);
    };
  }, [deferredPrompt, browser]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('PWA Install Button: Triggering install prompt');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('PWA Install Button: User choice:', outcome);
      
      if (outcome === 'accepted') {
        setInstallState('installed');
        setDeferredPrompt(null);
      }
    } else {
      setIsDialogOpen(true);
    }
  };

  const getButtonContent = () => {
    switch (installState) {
      case 'checking':
        return { text: 'Checking...', icon: Info, disabled: true };
      case 'available':
        return { text: 'Install App', icon: Download, disabled: false };
      case 'installed':
        return { text: 'App Installed', icon: Download, disabled: true };
      case 'not-available':
        return { text: 'Install App', icon: Download, disabled: false };
      case 'unsupported':
        return { text: 'Add to Home', icon: Smartphone, disabled: false };
      default:
        return { text: 'Install App', icon: Download, disabled: false };
    }
  };

  const getManualInstructions = () => {
    switch (browser) {
      case 'chrome':
        return {
          title: 'Install on Chrome',
          steps: [
            'Look for the install icon in the address bar (right side)',
            'Or click the three dots menu → "Install SizeMyBag"',
            'Click "Install" to add the app to your desktop'
          ]
        };
      case 'edge':
        return {
          title: 'Install on Edge',
          steps: [
            'Look for the install icon in the address bar',
            'Or click the three dots menu → "Apps" → "Install this site as an app"',
            'Click "Install" to add the app to your desktop'
          ]
        };
      case 'firefox':
        return {
          title: 'Add to Firefox',
          steps: [
            'Bookmark this page for quick access',
            'Pin the tab for easy navigation',
            'Firefox doesn\'t support PWA installation, but you can create a desktop shortcut'
          ]
        };
      case 'safari':
        return {
          title: 'Add to Safari',
          steps: [
            'Click Share button in the toolbar',
            'Select "Add to Dock" (macOS Sonoma+)',
            'Or bookmark the page for quick access'
          ]
        };
      default:
        return {
          title: 'Add to Home Screen',
          steps: [
            'Look for an install option in your browser menu',
            'Bookmark this page for quick access',
            'Check if your browser supports PWA installation'
          ]
        };
    }
  };

  const buttonContent = getButtonContent();
  const ButtonIcon = buttonContent.icon;

  // Always show the button (except when installed and no debugging needed)
  if (installState === 'installed' && process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={handleInstallClick}
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50 shadow-lg bg-background/95 backdrop-blur-sm"
          disabled={buttonContent.disabled}
        >
          <ButtonIcon className="h-4 w-4 mr-2" />
          {buttonContent.text}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Install SizeMyBag
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Install SizeMyBag as an app for faster access, offline functionality, and a better experience.
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">{getManualInstructions().title}</h4>
            <ol className="space-y-2 text-sm">
              {getManualInstructions().steps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-2">Debug Info</h4>
              <div className="text-xs space-y-1 text-muted-foreground">
                <div>State: {installState}</div>
                <div>Browser: {browser}</div>
                <div>Prompt Available: {deferredPrompt ? 'Yes' : 'No'}</div>
                <div>Installed: {isAppInstalled() ? 'Yes' : 'No'}</div>
                <div>Standalone: {window.matchMedia?.('(display-mode: standalone)').matches ? 'Yes' : 'No'}</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};