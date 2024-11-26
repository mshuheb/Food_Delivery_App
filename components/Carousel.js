import { StyleSheet, View, ScrollView, Image, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const images = [
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://healthnewshub.org/wp-content/uploads/2024/03/Fast-Food-Restaurants.jpg",
  ];

  return (
    <View style={styles.container}>   
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false} 
        style={styles.scrollView}
      >
        {images.map((image, index) => (
          <Image 
            key={index} 
            source={{ uri: image }} 
            style={styles.image} 
            onError={(error) => console.log(`Error loading image ${index}:`, error.nativeEvent.error)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    marginTop: 15,
  },
  image: {
    width: width - 40,
    height: 200,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});