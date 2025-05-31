
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNav from './src/navegacion/mainNav';

export default function App() {
  return (
    <NavigationContainer>
      <MainNav />
    </NavigationContainer>
  );
}