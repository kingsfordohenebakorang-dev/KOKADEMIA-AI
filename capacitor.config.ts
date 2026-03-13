import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kok.actuarial',
  appName: 'Actuarial Platform',
  webDir: 'public',
  bundledWebRuntime: false,
  server: {
    url: 'http://172.20.10.2:3000',
    cleartext: true
  }
};

export default config;
