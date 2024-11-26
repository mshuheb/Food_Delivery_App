import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDarkMode } from "../../DarkModeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../supabase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


const UserProfileView = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState(null);
  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          setUserEmail(email);
        }
      } catch (error) {
        console.log("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userEmail) return;
      try {
        const { data, error } = await supabase
          .from("user_details")
          .select("name, gender, email")
          .eq("email", userEmail)
          .single();

        if (error) {
          console.log("Error fetching user details:", error);
          return;
        }

        if (data) {
          setUserName(data.name);
          setGender(data.gender);
          const avatarPath = data.gender === "male" ? "male" : "female";
          setSelectedImage(avatarPath);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  const avatarImages = {
    male: require("../../assets/male.jpg"),
    female: require("../../assets/female.png"),
    default: require("../../assets/profpic.jpg"),
  };

  const handleGenderSelection = async (newGender) => {
    const avatarPath = newGender === "male" ? "male" : "female";

    setGender(newGender);
    setSelectedImage(avatarPath);

    try {
      const { error } = await supabase
        .from("user_details")
        .update({ gender: newGender })
        .eq("email", userEmail);

      if (error) {
        Alert.alert("Error", "Failed to update gender.");
        console.log("Error updating gender:", error);
      } else {
        AsyncStorage.setItem("userGender", newGender);
        AsyncStorage.setItem("userAvatar", avatarPath);
      }
    } catch (error) {
      console.log("Error updating gender:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", "Could not log out. Please try again.");
      console.log("Logout error:", error);
    }
  };

  const avatarSource = avatarImages[selectedImage] || avatarImages.default;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#f0f0f0" },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          onPress={() => router.back()}
          style={styles.icon}
          name="arrow-back"
          size={24}
          color={isDarkMode ? "#ffffff" : "#000000"}
        />
      </View>

      <View style={styles.centerContent}>
        <View style={[styles.card, { backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff" }]}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={avatarSource} />
            <TouchableOpacity
              style={[styles.genderChangeButton, {backgroundColor: isDarkMode ? "#000000" : "#ffffff"}]}
              onPress={() =>
                handleGenderSelection(gender === "male" ? "female" : "male")
              }
            >
              <MaterialIcons
                name="change-circle"
                size={30}
                color={isDarkMode ? "#ffffff" : "#000000"}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.cardText, { color: isDarkMode ? "#ffffff" : "#000000" }]}>
            Welcome, {userName}!
          </Text>
          <View style={styles.divider} />
          <Text style={[styles.detailText, { color: isDarkMode ? "#ffffff" : "#000000" }]}>
            Email: {userEmail}
          </Text>
          <Text style={[styles.detailText, { color: isDarkMode ? "#ffffff" : "#000000" }]}>
            Gender: {gender || "Not set"}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isDarkMode ? "#333333" : "white",
              borderColor: isDarkMode ? "white" : "#fd5c63",
            },
          ]}
          onPress={handleLogout}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isDarkMode ? "white" : "#fd5c63", marginRight: 8 },
            ]}
          >
            Logout
          </Text>
          <MaterialIcons
            name="logout"
            size={20}
            color={isDarkMode ? "white" : "#fd5c63"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  iconContainer: {
    position: "absolute",
    top: 20,
    left: 10,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  avatarContainer: {
    marginBottom: 20,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fd5c63",
  },
  genderChangeButton: {
    position: "absolute",
    bottom: -10,
    right: -10,
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  button: {
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserProfileView;
