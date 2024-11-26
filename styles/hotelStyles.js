import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    scrollView: (isDarkMode) => ({
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    }),
    header: (isDarkMode) => ({
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
    }),
    icon: {
        padding: 5,
    },
    iconContainer: (isDarkMode) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 10,
        color: isDarkMode ? "#ffffff" : "#000000",
    }),
    infoContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 12,
    },
    hotelName: (isDarkMode) => ({
        fontSize: 20,
        fontWeight: "bold",
        color: isDarkMode ? "#ffffff" : "#000000",
    }),
    subText: (isDarkMode) => ({
        marginTop: 5,
        color: isDarkMode ? "#b0b0b0" : "gray",
        fontWeight: "500",
        fontSize: 15,
    }),
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 10,
    },
    ratingBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#006A4E",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 5,
        gap: 4,
    },
    ratingText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    ratingsText: (isDarkMode) => ({
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 5,
        color: isDarkMode ? "#b0b0b0" : "#000000",
    }),
    deliveryInfo: (isDarkMode) => ({
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDarkMode ? "#303030" : "#D0F0C0",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 12,
    }),
    deliveryText: (isDarkMode) => ({
        color: isDarkMode ? "#b0b0b0" : "#000000", // Ensure contrast for visibility
    }),
    categoryContainer: (isDarkMode) => ({
        flexDirection: "row",
        backgroundColor: isDarkMode ? "#121212" : "#ffffff",
    }),
    categoryButton: (isDarkMode) => ({
        paddingHorizontal: 7,
        borderRadius: 4,
        paddingVertical: 5,
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: isDarkMode ? "#ffffff" : "#181818",
        borderWidth: 1,
    }),
    categoryText: (isDarkMode) => ({
        color: isDarkMode ? "#ffffff" : "#000000",
    }),
    menuButton: (cart,isDarkMode) => ({
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 25,
        bottom: cart?.length > 0 ? 70 : 35,
        backgroundColor: isDarkMode ? "white" : "black",
        borderWidth: 1,
        borderColor: isDarkMode === true ? "#000000" : "#FFFFFF"
    }),
    menuIcon: {
        textAlign: "center",
    },
    menuButtonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "500",
        fontSize: 11,
        marginTop: 3,
    },
    modalContainer: (isDarkMode) => ({
        height: 190,
        width: 250,
        backgroundColor:"white",
        position: "absolute",
        bottom: 35,
        right: 10,
        borderRadius: 7,
    }),
    modalItem: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    modalItemText: (isDarkMode) => ({
        color: "black",
        fontWeight: "600",
        fontSize: 18,
    }),
    modalItemCount: (isDarkMode) => ({
        color: "#000000",
        fontWeight: "600",
        fontSize: 18,
    }),
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 250,
        height: 110,
        
    },
    });

    export default styles;