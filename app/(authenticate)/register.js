import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { MaterialIcons, Ionicons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  import { supabase } from "../../supabase";
  
  const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState(""); // Updated gender state to track selected gender
    const router = useRouter();
  
    async function signUpNewUser() {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
  
      if (data?.user?.role == "authenticated") {
        // Insert user details into the 'user_details' table
        const { error: insertError } = await supabase
          .from("user_details")
          .insert([
            {
              name: name,
              email: email,
              gender: gender, // Store gender as well
            },
          ]);
  
        if (insertError) {
          Alert.alert("Error", "Failed to save user details to the database.");
          console.log(insertError);
        } else {
          Alert.alert("Success", "You have been successfully registered. Please check your email for confirmation.");
          router.replace("/login"); // Navigate to login screen after successful registration
        }
      }
  
      if (error) {
        Alert.alert("Error while registering", "Please try again");
        console.log(error);
      }
    }
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
        <View style={{ marginTop: 50 }}>
          <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
            Food App
          </Text>
        </View>
  
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 12, color: "red" }}>
              Register to your account
            </Text>
          </View>
  
          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <Ionicons name="person" size={24} color="gray" style={{ marginLeft: 8 }} />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{ color: "gray", marginVertical: 10, width: 300 }}
                placeholder="Enter your Name"
              />
            </View>
  
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ color: "gray", marginVertical: 10, width: 300 }}
                placeholder="Enter your Email"
              />
            </View>
  
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign style={{ marginLeft: 8 }} name="lock1" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{ color: "gray", marginVertical: 10, width: 300 }}
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>
  
            <View style={{ marginTop: 30 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>Select your Gender:</Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 20,
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 50,
                    backgroundColor: gender === "male" ? "#fd5c63" : "transparent",
                  }}
                  onPress={() => setGender("male")}
                >
                  <Ionicons name="male" size={24} color={gender === "male" ? "white" : "gray"} />
                  <Text style={{ color: gender === "male" ? "white" : "gray", marginLeft: 5 }}>Male</Text>
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 50,
                    backgroundColor: gender === "female" ? "#fd5c63" : "transparent",
                  }}
                  onPress={() => setGender("female")}
                >
                  <Ionicons name="female" size={24} color={gender === "female" ? "white" : "gray"} />
                  <Text style={{ color: gender === "female" ? "white" : "gray", marginLeft: 5 }}>Female</Text>
                </Pressable>
              </View>
            </View>
          </View>
  
          <Pressable
            onPress={signUpNewUser}
            style={{
              width: 200,
              backgroundColor: "#fd5c63",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
              marginTop: 50,
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16, color: "white" }}>
              Register
            </Text>
          </Pressable>
  
          <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 15 }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already have an Account? Sign In
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({});
  