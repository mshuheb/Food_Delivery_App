import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 6,
      marginVertical: 12,
      borderRadius: 10,
    },
    image: {
      width: "100%",
      aspectRatio: 6 / 4,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    infoContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
    },
    nameText: {
      fontSize: 16,
      fontWeight: "600",
    },
    descriptionText: {
      marginTop: 3,
      fontSize: 15,
      fontWeight: "500",
    },
    timeText: {
      marginTop: 3,
      fontSize: 14,
      fontWeight: "500",
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#006A4E",
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 3,
    },
    ratingText: {
      color: "white",
      fontWeight: "bold",
      marginRight: 3,
    },
    divider: {
      borderWidth: 0.5,
      marginHorizontal: 10,
      marginVertical: 4,
    },
    offerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 8,
      marginVertical: 5,
    },
    offerText: {
      marginLeft: 2,
      fontWeight: "500",
    },
  });

  export default styles;
  