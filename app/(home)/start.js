import { ImageBackground, Pressable, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

const start = () => {
  const router = useRouter();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current; // For opacity
  const scaleAnim = useRef(new Animated.Value(1.0)).current; // For scaling

  // Trigger animations when the component is mounted
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000, // 2 seconds duration
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 2000, // 2 seconds duration
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After animation, redirect to login page
      // Use router.replace to avoid splash screen in the stack
      router.replace('/login');
    });
  }, []);
  

  return (
    <Pressable style={{ flex: 1 }}>
      {/* Animated Logo */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <ImageBackground
          source={require('../../assets/start.png')}
          style={{ flex: 1, resizeMode: 'cover' }} // To cover the entire screen
        />
      </Animated.View>
    </Pressable>
  );
}

export default start;