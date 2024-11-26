import { Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/CartReducer";
import {
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDarkMode } from "../../DarkModeContext";
import lightStyles from '../../styles/cartStyles';

const cart = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const instructions = [
    { id: "0", name: "Avoid Ringing", iconName: "bell" },
    { id: "1", name: "Leave at the door", iconName: "door-open" },
    { id: "2", name: "directions to reach", iconName: "directions" },
    { id: "3", name: "Avoid Calling", iconName: "phone-alt" },
  ];
  const total = cart
    ?.map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  console.log(total);

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Ionicons
          onPress={() => router.back()}
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
          <Text style={styles.headerText}>{params?.name}</Text>
        </View>

        <View style={styles.deliveryInfo}>
          <Text style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
            Delivery in <Text style={styles.deliveryTime}>35 - 40 mins</Text>
          </Text>
        </View>

        <View style={styles.itemsAdded}>
          <Text style={styles.itemsAddedText}>ITEM(S) ADDED</Text>
        </View>

        <View>
          {cart?.map((item, index) => (
            <Pressable style={styles.itemContainer} key={index}>
              <View style={styles.itemRow}>
                <Text style={styles.itemName}>{item?.name}</Text>
                <Pressable style={styles.quantityControl}>
                  <Pressable onPress={() => dispatch(decrementQuantity(item))}>
                    <Text style={styles.quantityButton}>-</Text>
                  </Pressable>
                  <Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                  </Pressable>
                  <Pressable onPress={() => dispatch(incrementQuantity(item))}>
                    <Text style={styles.quantityButton}>+</Text>
                  </Pressable>
                </Pressable>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemPrice}>
                  ₹{item.price * item.quantity}
                </Text>
                <Text style={styles.itemQuantity}>
                  Quantity : {item?.quantity}
                </Text>
              </View>
            </Pressable>
          ))}

          <View style={styles.deliveryInstructions}>
            <Text style={styles.deliveryInstructionsText}>
              Delivery Instructions
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {instructions?.map((item, index) => (
                <Pressable style={styles.instructionContainer} key={index}>
                  <View style={styles.instructionContent}>
                    <FontAwesome5
                      name={item?.iconName}
                      size={22}
                      color={"gray"}
                    />
                    <Text style={styles.instructionText}>{item?.name}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View>
            <View style={styles.additionalOptions}>
              <View style={styles.optionRow}>
                <Feather
                  name="plus-circle"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles.optionText}>Add more Items</Text>
              </View>
              <AntDesign
                name="right"
                size={20}
                color={isDarkMode ? "white" : "black"}
              />
            </View>

            <View style={styles.additionalOptions}>
              <View style={styles.optionRow}>
                <Entypo
                  name="new-message"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles.optionText}>
                  Add more cooking instructions
                </Text>
              </View>
              <AntDesign
                name="right"
                size={20}
                color={isDarkMode ? "white" : "black"}
              />
            </View>

            <View style={styles.additionalOptions}>
              <View style={styles.optionRow}>
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={styles.optionText}>
                  Don't send cutlery with this order
                </Text>
              </View>
              <AntDesign
                name="right"
                size={20}
                color={isDarkMode ? "white" : "black"}
              />
            </View>
          </View>

          <View style={styles.donationContainer}>
            <View style={styles.donationRow}>
              <Text style={styles.donationText}>Feeding India Donation</Text>
              <AntDesign name="checksquare" size={24} color="#fd5c63" />
            </View>
            <View style={styles.donationRow}>
              <Text style={styles.donationDescription}>
                Working towards a malnutrition-free India
              </Text>
              <Text style={styles.donationAmount}>Rs 3</Text>
            </View>
          </View>

          <View style={styles.billingDetails}>
            <Text style={styles.billingDetailsText}>Billing Details</Text>
            <View style={styles.billingContainer}>
              <View style={styles.billingRow}>
                <Text style={styles.billingLabel}>Item Total</Text>
                <Text style={styles.billingValue}>₹{total}</Text>
              </View>
              <View style={styles.billingRow}>
                <Text style={styles.billingLabel}>Delivery Fee</Text>
                <Text style={styles.billingValue}>₹15.00</Text>
              </View>
              <View style={styles.billingRow}>
                <Text style={styles.billingLabel}>Delivery Partner Fee</Text>
                <Text style={styles.billingValue}>₹75</Text>
              </View>
              <View style={styles.billingRow}>
                <Text style={styles.billingTotalLabel}>To pay</Text>
                <Text style={styles.billingTotalValue}>₹{total + 90}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {total === 0 ? null : (
        <Pressable style={styles.paymentContainer}>
          <View>
            <Text style={styles.paymentText}>Pay Using Cash</Text>
            <Text style={styles.paymentDescription}>Cash on Delivery</Text>
          </View>
          <Pressable
            onPress={() => {
              dispatch(cleanCart());
              router.replace({
                pathname: "/order",
                params: { name: params?.name },
              });
            }}
            style={styles.placeOrderButton}
          >
            <View>
              <Text style={styles.placeOrderTotal}>{total + 95}</Text>
              <Text style={styles.placeOrderLabel}>TOTAL</Text>
            </View>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default cart;


