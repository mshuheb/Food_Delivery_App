import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../../store";
import { DarkModeProvider } from "../../DarkModeContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function Layout() {
  return (
    <ActionSheetProvider>
    <DarkModeProvider>
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="hotel" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="order" />
      </Stack>
    </Provider>
    </DarkModeProvider>
    </ActionSheetProvider>
  );
}