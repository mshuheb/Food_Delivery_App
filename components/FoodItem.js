import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import MenuItem from './MenuItem';
import { useDarkMode } from '../DarkModeContext';

const FoodItem = ({ item }) => {
  const { isDarkMode } = useDarkMode();
  const styles = getStyles(isDarkMode);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <Pressable style={styles.headerContainer} onPress={handleToggle}>
        <Text style={styles.headerText}>
          {item?.name} ({item?.items?.length})
        </Text>
        <AntDesign
          name={isExpanded ? "up" : "down"}
          size={20}
          color={isDarkMode ? "white" : "black"}
        />
      </Pressable>

      {isExpanded && (
        item?.items?.map((menuItem, idx) => (
          <MenuItem key={idx} item={menuItem} />
        ))
      )}
    </View>
  );
};

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    headerContainer: {
      margin: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      padding: 10,
      borderRadius: 8,
    },
    headerText: {
      fontSize: 19,
      fontWeight: "bold",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
  });

export default FoodItem;
