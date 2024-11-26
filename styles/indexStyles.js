import { StyleSheet } from "react-native";

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#f8f8f8",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 10,
      backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
    },
    headerText: {
      fontSize: 15,
      fontWeight: "500",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    subHeaderText: {
      color: isDarkMode ? "#b0b0b0" : "gray",
      fontSize: 16,
      marginTop: 3,
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: isDarkMode ? "#555555" : "#C0C0C0",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 11,
      marginTop: 10,
      marginHorizontal: 10,
    },
    searchTextInput: {
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    card: {
      backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
      flexDirection: "row",
      margin: 10,
      borderRadius: 8,
    },
    cardText: {
      fontSize: 15,
      fontWeight: "500",
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    cardSubText: {
      flex: 1,
      marginTop: 3,
      color: isDarkMode ? "#b0b0b0" : "gray",
      fontWeight: "500",
    },
    exploreText: {
      textAlign: "center",
      marginTop: 7,
      letterSpacing: 4,
      marginBottom: 5,
      color: isDarkMode ? "#b0b0b0" : "gray",
    },
    smallCard: {
      width: 110,
      borderColor: isDarkMode ? "#404040" : "#E0E0E0",
      borderWidth: 1,
      paddingVertical: 5,
      paddingHorizontal: 1,
      borderRadius: 5,
      marginLeft: 10,
      marginVertical: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDarkMode ? "#303030" : "#ffffff",
    },
    smallCardText: {
      fontSize: 13,
      fontWeight: "500",
      marginTop: 6,
      color: isDarkMode ? "#ffffff" : "#000000",
    },
    smallCardSubText: {
      fontSize: 12,
      color: isDarkMode ? "#b0b0b0" : "gray",
      marginTop: 3,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "#fff",
    },
  });

export default getStyles;
