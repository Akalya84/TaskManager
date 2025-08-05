// screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ setLoggedIn, setUserEmail }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID_HERE',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setLoggedIn(true);
      setUserEmail('google_user@example.com');
    }
  }, [response]);

  const handleLogin = () => {
    if (email === 'demo@example.com' && password === 'password123') {
      setLoggedIn(true);
      setUserEmail(email);
    } else {
      setMessage('❌ Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/login_illustration.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.googleButton}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Image source={require('../assets/google-icon.png')} style={styles.googleIcon} />
        <Text style={styles.googleText}>Continue with </Text>
      </TouchableOpacity>
      {message !== '' && <Text style={styles.message}>{message}</Text>}
      <Text style={styles.hint}></Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f9ff', justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#a0cfff',
    padding: 14,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  googleIcon: { width: 22, height: 22, marginRight: 10 },
  googleText: { fontSize: 16, color: '#000', fontWeight: '500' },
  message: { marginTop: 10, fontSize: 16, textAlign: 'center', color: 'red' },
  hint: { marginTop: 16, textAlign: 'center', fontSize: 13, color: '#555' },
  image: { width: '100%', height: 180, marginBottom: 10 },
});
