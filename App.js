import React from 'react';
import { Provider as UserProvider } from './src/contexts/user-context';
import { RootNavigationStack } from './src/config/routes';

export default function App() {
  return (
    <UserProvider>
      <RootNavigationStack />
    </UserProvider>
  );
}
