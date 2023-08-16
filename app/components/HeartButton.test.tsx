import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HeartButton from "./HeartButton";
import useFavorite from "../hooks/useFavorite";

jest.mock("../hooks/useFavorite");

describe("HeartButton", () => {
  test("successfully renders the HeartButton", () => {
    (useFavorite as jest.Mock).mockImplementation(() => ({
      hasFavorited: false,
      toggleFavorite: () => Promise.resolve(),
    }));
    const component = render(<HeartButton listingId="test-id" />);
    expect(component).toBeDefined();
  });

  test("changes className to fill-rose-500 if hasFavorited=true", () => {
    (useFavorite as jest.Mock).mockImplementation(() => ({
      hasFavorited: true,
      toggleFavorite: () => Promise.resolve(),
    }));
    const component = render(<HeartButton listingId="test-id" />);
    expect(component.getByTestId("heart")).toBeDefined();
    expect(component.getByTestId("heart")).toHaveClass("fill-rose-500");
  });
});
