import { StyleSheet } from "react-native";

const getStyles = (isDarkMode) =>
    StyleSheet.create({
      container: {
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
      },
      itemContainer: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
      },
      itemName: {
        fontSize: 18,
        fontWeight: "600",
        color: isDarkMode ? "#ffffff" : "#000000",
        width: 220,
      },
      itemPrice: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: "500",
        color: isDarkMode ? "#b0b0b0" : "#333333",
      },
      ratingContainer: {
        marginTop: 5,
        flexDirection: "row",
      },
      starIcon: {
        paddingHorizontal: 3,
      },
      itemDescription: {
        width: 200,
        marginTop: 8,
        color: isDarkMode ? "#b0b0b0" : "gray",
        fontSize: 16,
      },
      imageContainer: {
        marginRight: 10,
      },
      image: {
        width: 120,
        height: 120,
        borderRadius: 8,
      },
      quantityContainer: {
        position: "absolute",
        top: 95,
        left: 20,
        backgroundColor: "#fd5c63",
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
        borderRadius: 5,
      },
      quantityButton: {
        fontSize: 25,
        color: "white",
        paddingHorizontal: 6,
      },
      quantityText: {
        color: "white",
        paddingHorizontal: 6,
        fontSize: 15,
      },
      addButton: {
        position: "absolute",
        top: 95,
        left: 20,
        borderColor: "#E32636",
        borderWidth: 1,
        flexDirection: "row",
        paddingHorizontal: 25,
        paddingVertical: 5,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
      },
      addButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fd5c63", // Color for "ADD" text remains the same
      },
    });

    export default getStyles;