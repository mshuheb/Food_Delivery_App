import { Image, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";
import { useDarkMode } from "../DarkModeContext";
import getStyles from "../styles/menuItemStyles";

const MenuItem = ({ item }) => {
  const [additems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Pressable style={styles.itemContainer}>
        <View>
          <Text style={styles.itemName}>{item?.name}</Text>
          <Text style={styles.itemPrice}>₹{item?.price}</Text>
          <View style={styles.ratingContainer}>
            {[0, 0, 0, 0, 0].map((_, i) => (
              <FontAwesome
                key={i}
                style={styles.starIcon}
                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                size={15}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.itemDescription}>
            {item?.description.length > 40
              ? item?.description.substr(0, 37) + "..."
              : item?.description}
          </Text>
        </View>

        <Pressable style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item?.image }} />
          {selected ? (
            <Pressable style={styles.quantityContainer}>
              <Pressable
                onPress={() => {
                  if (additems === 1) {
                    dispatch(removeFromCart(item));
                    setAddItems(0);
                    setSelected(false);
                    return;
                  }
                  setAddItems((c) => c - 1);
                  dispatch(decrementQuantity(item));
                }}
              >
                <Text style={styles.quantityButton}>-</Text>
              </Pressable>

              <Text style={styles.quantityText}>{additems}</Text>

              <Pressable
                onPress={() => {
                  setAddItems((c) => c + 1);
                  dispatch(incrementQuantity(item));
                }}
              >
                <Text style={styles.quantityButton}>+</Text>
              </Pressable>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setSelected(true);
                if (additems === 0) {
                  setAddItems((c) => c + 1);
                }
                dispatch(addToCart(item));
              }}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>ADD</Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
};

export default MenuItem;
