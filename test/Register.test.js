import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native"; // Ensure Alert is imported to be mocked
import Register from "../app/(authenticate)/register";
import { supabase } from "../supabase";
import { useRouter } from "expo-router";

// Mock external modules
jest.mock("../supabase");
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

// Mock expo-vector-icons
jest.mock("@expo/vector-icons", () => ({
  AntDesign: "AntDesign", // Mocking icon
  MaterialIcons: "MaterialIcons", // Mocking icon
  Ionicons: "Ionicons", // Mocking icon
}));

// Mock Alert
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("<Register />", () => {
  let routerMock;

  beforeEach(() => {
    routerMock = { replace: jest.fn() };
    useRouter.mockReturnValue(routerMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with initial UI elements", () => {
    const { getByPlaceholderText, getByText, toJSON } = render(<Register />);

    expect(getByText("Food App")).toBeTruthy();
    expect(getByText("Register to your account")).toBeTruthy();
    expect(getByPlaceholderText("Enter your Name")).toBeTruthy();
    expect(getByPlaceholderText("Enter your Email")).toBeTruthy();
    expect(getByPlaceholderText("Enter your password")).toBeTruthy();
    expect(getByText("Select your Gender:")).toBeTruthy();
    expect(getByText("Male")).toBeTruthy();
    expect(getByText("Female")).toBeTruthy();
    expect(getByText("Register")).toBeTruthy();
    expect(getByText("Already have an Account? Sign In")).toBeTruthy();

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  test("shows alert on registration error", async () => {
    supabase.auth.signUp.mockResolvedValue({
      error: { message: "Email already exists" },
      data: null,
    });

    const { getByText, getByPlaceholderText, toJSON } = render(<Register />);

    const nameInput = getByPlaceholderText("Enter your Name");
    const emailInput = getByPlaceholderText("Enter your Email");
    const passwordInput = getByPlaceholderText("Enter your password");
    const registerButton = getByText("Register");

    fireEvent.changeText(nameInput, "John Doe");
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(Alert.alert).toHaveBeenCalledWith("Error while registering", "Please try again");
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  test("navigates to login screen after successful registration", async () => {
    supabase.auth.signUp.mockResolvedValue({
      error: null,
      data: { user: { role: "authenticated" } },
    });

    supabase.from.mockReturnValue({
      insert: jest.fn().mockResolvedValue({ error: null }),
    });

    const { getByText, getByPlaceholderText, toJSON } = render(<Register />);
    const nameInput = getByPlaceholderText("Enter your Name");
    const emailInput = getByPlaceholderText("Enter your Email");
    const passwordInput = getByPlaceholderText("Enter your password");
    const registerButton = getByText("Register");

    fireEvent.changeText(nameInput, "John Doe");
    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(registerButton);

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(supabase.from).toHaveBeenCalledWith("user_details");
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "You have been successfully registered. Please check your email for confirmation."
      );
      expect(routerMock.replace).toHaveBeenCalledWith("/login");
    });

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });

  test("redirects to login screen on 'Sign In' press", () => {
    const { getByText, toJSON } = render(<Register />);
    const signInText = getByText("Already have an Account? Sign In");

    fireEvent.press(signInText);

    expect(routerMock.replace).toHaveBeenCalledWith("/login");

    // Snapshot test
    expect(toJSON()).toMatchSnapshot();
  });
});
