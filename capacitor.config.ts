import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kokademia.actuarial',
  appName: 'Actuarial Platform',
  webDir: 'public',
  server: {
    url: 'http://172.20.10.2:3000',
    cleartext: true
  }
};

export default config;
