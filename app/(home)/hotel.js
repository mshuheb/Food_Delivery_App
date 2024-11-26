import {
    Text,
    View,
    ScrollView,
    Pressable,
    Animated,
    Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FoodItem from "../../components/FoodItem";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import { useDarkMode } from "../../DarkModeContext"; // Import the useDarkMode hook
import styles from '../../styles/hotelStyles';

const hotel = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const cart = useSelector((state) => state.cart.cart);
    const { isDarkMode } = useDarkMode(); // Use the DarkModeContext
    const scrollViewRef = useRef(null);
    const scrollAnim = useRef(new Animated.Value(0)).current;
    const ITEM_HEIGHT = 650;

    const scrollToCategory = (index) => {
        const yOffset = index * ITEM_HEIGHT;
        Animated.timing(scrollAnim, {
            toValue: yOffset,
            duration: 500,
            useNativeDriver: true,
        }).start();
        scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
    };

    const [modalVisible, setModalVisible] = useState(false);
    const recievedMenu = JSON.parse(params?.menu);
    // const menu = [
    //   {
    //     id: "20",
    //     name: "Recommended",
    //     items: [
    //       {
    //         id: "101",
    //         name: "Paneer 65",
    //         price: 275,
    //         description:
    //           "This is served with Raita and gravy and has loaded with chilli paste mixed chicken Kebabs",
    //         rating: 4.1,
    //         ratings: 43,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/druwjzmfmz7qvepq3bkr",
    //         veg: true,
    //         bestSeller: false,
    //         quantity: 1,
    //       },
    //       {
    //         id: "102",
    //         name: "Chilly Chicken (Boneless)",
    //         price: 285,
    //         description:
    //           "E: 604.42 KCal (163.36 KCal), C: 29.67 Grams (8.02 Grams), P: 50.63 Grams (13.68 Grams), F: 30.94 Grams (8.36 Grams)",
    //         rating: 4.3,
    //         ratings: 34,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/ry3c3f518z10t4olu4l7",
    //         veg: false,
    //         bestSeller: true,
    //         quantity: 1,
    //       },
    //       {
    //         id: "103",
    //         name: "Spl Veg Biryani",
    //         price: 250,
    //         description:
    //           "E: 1327.35 KCal (126.41 KCal), C: 213.24 Grams (20.31 Grams), P: 26.99 Grams (2.57 Grams), F: 38.46 Grams (3.66 Grams)",
    //         rating: 4.5,
    //         ratings: 56,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/fsitbray4gq1kxcndqqx",
    //         veg: true,
    //         bestSeller: false,
    //         quantity: 1,
    //       },
    //       {
    //         id: "104",
    //         name: "Chilly Paneer",
    //         price: 220,
    //         description:
    //           "E: 871.69 KCal (272.40 KCal), C: 21.54 Grams (6.73 Grams), P: 51.90 Grams (16.22 Grams), F: 64.36 Grams (20.11 Grams",
    //         rating: 3.8,
    //         ratings: 22,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/byonwwb8mzxyqluxlqpq",
    //         veg: true,
    //         bestSeller: true,
    //         quantity: 1,
    //       },
    //       {
    //         id: "105",
    //         name: "Chicken 65",
    //         price: 300,
    //         description:
    //           "E: 544.39 KCal (155.54 KCal), C: 25.11 Grams (7.17 Grams), P: 45.15 Grams (12.90 Grams), F: 27.91 Grams (7.97 Grams)",
    //         rating: 4.5,
    //         ratings: 45,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/x0jegvlf4h7wrgaaqdqi",
    //         veg: false,
    //         bestSeller: true,
    //         quantity: 1,
    //       },
    //     ],
    //   },
    //   {
    //     id: "11",
    //     name: "Rice",
    //     items: [
    //       {
    //         id: "201",
    //         name: "Chicken Fried Rice",
    //         price: 260,
    //         description:
    //           "E: 1142.26 KCal (163.18 KCal), C: 125.05 Grams (17.86 Grams), P: 40.11 Grams (5.73 Grams), F: 51.37 Grams (7.34 Grams)",
    //         rating: 4.3,
    //         ratings: 34,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/akmx533z73jjbq8avy6v",
    //         veg: false,
    //         bestSeller: true,
    //       },
    //       {
    //         id: "202",
    //         name: "Egg Fried Rice",
    //         price: 220,
    //         description:
    //           "E: 1729.51 KCal (164.72 KCal), C: 204.54 Grams (19.48 Grams), P: 44.03 Grams (4.19 Grams), F: 79.02 Grams (7.53 Grams)",
    //         rating: 4.3,
    //         ratings: 52,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/lv6jl9qdscekjmwkxm9l",
    //         veg: false,
    //         bestSeller: false,
    //       },
    //       {
    //         id: "203",
    //         name: "Veg Fried Rice",
    //         price: 190,
    //         description:
    //           "E: 1477.00 KCal (140.67 KCal), C: 204.14 Grams (19.44 Grams), P: 22.90 Grams (2.18 Grams), F: 59.95 Grams (5.71 Grams)",
    //         rating: 4.6,
    //         ratings: 56,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/pycpbzawueci1dvhmkr3",
    //         veg: true,
    //         bestSeller: true,
    //       },
    //       {
    //         id: "204",
    //         name: "Jeera Rice",
    //         price: 195,
    //         description:
    //           "E: 1832.30 KCal (174.50 KCal), C: 246.73 Grams (23.50 Grams), P: 27.51 Grams (2.62 Grams), F: 78.15 Grams (7.44 Grams)",
    //         rating: 4.5,
    //         ratings: 48,
    //         image:
    //           "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/xukq8swrwct8usmg4cjv",
    //         veg: true,
    //         bestSeller: false,
    //       },
    //     ],
    //   },
    // ];
return (
    <>
        <ScrollView ref={scrollViewRef} style={styles.scrollView(isDarkMode)}>
            <View style={styles.header(isDarkMode)}>
                <Ionicons
                    onPress={() => router.back()}
                    style={styles.icon}
                    name="arrow-back"
                    size={24}
                    color={isDarkMode ? "#ffffff" : "#000000"}
                />
                <View style={styles.iconContainer(isDarkMode)}>
                    <SimpleLineIcons name="camera" size={24} color={isDarkMode ? "#ffffff" : "#000000"} />
                    <Ionicons name="bookmark-outline" size={24} color={isDarkMode ? "#ffffff" : "#000000"} />
                    <MaterialCommunityIcons
                        name="share-outline"
                        size={24}
                        color={isDarkMode ? "#ffffff" : "#000000"}
                    />
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.hotelName(isDarkMode)}>
                    {params?.name}
                </Text>
                <Text style={styles.subText(isDarkMode)}>
                      {params?.description}
                </Text>
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingBox}>
                        <Text style={styles.ratingText}>
                            {params?.aggregate_rating}
                        </Text>
                        <Ionicons name="star" size={24} color="white" />
                    </View>
                    <Text style={styles.ratingsText(isDarkMode)}>
                        3.2K Ratings
                    </Text>
                </View>
                <View style={styles.deliveryInfo(isDarkMode)}>
                    <Text style={styles.deliveryText(isDarkMode)}>
                    {params?.time}
                    </Text>
                </View>
            </View>

            {recievedMenu?.map((item) => (
    <FoodItem key={item.id} item={item} isDarkMode={isDarkMode} />
))}
        </ScrollView>

        <View style={styles.categoryContainer(isDarkMode)}>
    {recievedMenu?.map((item) => (
        <Pressable
            key={item.id} // Use a unique id here
            onPress={() => scrollToCategory(index)}
            style={styles.categoryButton(isDarkMode)}
        >
            <Text style={styles.categoryText(isDarkMode)}>{item?.name}</Text>
        </Pressable>
    ))}
</View>


        <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={styles.menuButton(cart)}
        >
            <Ionicons name="fast-food-outline" size={24} color="white" />
            <Text style={styles.menuButtonText}>
                MENU
            </Text>
        </Pressable>

        <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.modalContainer(isDarkMode)}>
                {recievedMenu?.map((item, index) => (
                    <View key={index} style={styles.modalItem}>
                        <Text style={{color:"black"}}>
                            {item?.name}
                        </Text>
                        <Text style={styles.modalItemCount(isDarkMode)}>
                            {item?.items?.length}
                        </Text>
                    </View>
                ))}
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: "https://img.magicpin.com/search_collection_magicorderdeliveryvoucher_111321.jpg",
                        }}
                    />
                </View>
            </View>
        </Modal>

        {cart?.length > 0 && (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/cart",
                params: {
                  name: params.name,
                },
              })
            }
            style={{
              backgroundColor: "#fd5c63",
              paddingHorizontal: 10,
              paddingVertical: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              {cart.length} items added
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                marginTop: 5,
                fontWeight: "600",
              }}
            >
              Add items(s) worth 240 to reduce surge fee by Rs 35.
            </Text>
          </Pressable>
        )}
    </>
);
};

export default hotel;
