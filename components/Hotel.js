import { Text, View, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styles from '../styles/HotelStyles2';

const Hotel = ({ item, menu, isDarkMode }) => {
  const router = useRouter();
  const menuItems = JSON.stringify(menu);

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/hotel",
          params: {
            id: item.id,
            name: item.name,
            description: item.description,
            address: item.address,  
            smallAddress: item.smallAddress,
            cuisines: item.cuisines,
            aggregate_rating: item.aggregate_rating,
            menu: menuItems,
            time: item.time
          },
        })
      }
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333333" : "white" },
      ]}
    >
      <Image
        style={styles.image}
        source={{ uri: item?.featured_image }}
      />
      <View style={styles.infoContainer}>
        <View>
          <Text style={[styles.nameText, { color: isDarkMode ? "#FFFFFF" : "#000000" }]}>
            {item?.name}
          </Text>
          <Text style={[styles.descriptionText, { color: isDarkMode ? "#CCCCCC" : "gray" }]}>
            {item?.description}
          </Text>
          <Text style={[styles.timeText, { color: isDarkMode ? "#AAAAAA" : "#505050" }]}>
            {item?.time}
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item?.aggregate_rating}</Text>
          <Ionicons name="star" size={16} color="white" />
        </View>
      </View>

      <View style={[styles.divider, { borderColor: isDarkMode ? "#555555" : "#C8C8C8" }]} />

      <View style={styles.offerContainer}>
        <MaterialCommunityIcons
          name="brightness-percent"
          size={20}
          color={isDarkMode ? "#6FA0FF" : "#1F75FE"}
        />
        <Text style={[styles.offerText, { color: isDarkMode ? "#6FA0FF" : "#1F75FE" }]}>
          20% OFF up to Rs 100
        </Text>
      </View>
    </Pressable>
  );
};

export default Hotel;
