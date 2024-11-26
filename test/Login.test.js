import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native"; // Ensure Alert is imported to be mocked
import Login from "../app/(authenticate)/login";
import { supabase } from "../supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Mock external modules
jest.mock("../supabase");
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

// Mock expo-vector-icons
jest.mock('@expo/vector-icons', () => ({
  AntDesign: 'AntDesign',  // Mocking icon
  MaterialIcons: 'MaterialIcons',  // Mocking icon
  FontAwesome: 'FontAwesome',  // Mocking icon
}));

// Mock Alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe("<Login />", () => {
  let routerMock;

  beforeEach(() => {
    routerMock = { replace: jest.fn() };
    useRouter.mockReturnValue(routerMock);
    AsyncStorage.getItem.mockResolvedValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with initial UI elements", () => {
    const { getByPlaceholderText, getByText, toJSON } = render(<Login />);

    expect(getByText("Food App")).toBeTruthy();
    expect(getByText("Log in to your account")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
    expect(getByPlaceholderText("Enter your password")).toBeTruthy();
    expect(getByText("Login")).toBeTruthy();
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  test("allows user to input email and password", () => {
    const { getByPlaceholderText, toJSON } = render(<Login />);

    const emailInput = getByPlaceholderText("Enter your email");
    const passwordInput = getByPlaceholderText("Enter your password");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  test("shows alert on login error", async () => {
    const { getByText, getByPlaceholderText, toJSON } = render(<Login />);

    supabase.auth.signInWithPassword.mockResolvedValue({
      error: { message: "Invalid email or password" },
      data: null,
    });

    const emailInput = getByPlaceholderText("Enter your email");
    const passwordInput = getByPlaceholderText("Enter your password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "wrong@example.com");
    fireEvent.changeText(passwordInput, "wrongpassword");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "wrong@example.com",
        password: "wrongpassword",
      });
      expect(Alert.alert).toHaveBeenCalledWith("Invalid email or password. Please try again.");
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  test("navigates to home screen on successful login", async () => {
    supabase.auth.signInWithPassword.mockResolvedValue({
      error: null,
      data: { session: { access_token: "test_token" } },
    });

    const { getByText, getByPlaceholderText, toJSON } = render(<Login />);
    const emailInput = getByPlaceholderText("Enter your email");
    const passwordInput = getByPlaceholderText("Enter your password");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("authToken", "test_token");
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("userEmail", "test@example.com");
      expect(routerMock.replace).toHaveBeenCalledWith("/(home)");
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  test("redirects to home if user is already logged in", async () => {
    AsyncStorage.getItem.mockResolvedValue("existing_token");

    const { toJSON } = render(<Login />);

    await waitFor(() => {
      expect(routerMock.replace).toHaveBeenCalledWith("/(home)");
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  test("redirects to sign-up screen on 'Sign Up' press", () => {
    const { getByText, toJSON } = render(<Login />);
    const signUpText = getByText("Don't have an account? Sign Up");

    fireEvent.press(signUpText);

    expect(routerMock.replace).toHaveBeenCalledWith("/register");

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });
});
