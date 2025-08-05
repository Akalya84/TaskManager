// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import TaskScreen from './screens/TaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={loggedIn ? 'Tasks' : 'Login'}>
          {() =>
            loggedIn ? (
              <TaskScreen userEmail={userEmail} onLogout={() => setLoggedIn(false)} />
            ) : (
              <LoginScreen setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />
            )
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
