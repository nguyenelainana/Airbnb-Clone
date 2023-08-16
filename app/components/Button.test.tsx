import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Button from "./Button";

// test if button renders
// if button is disabled
// button outline = false
// button is small

describe("Button", () => {
  test("renders outline button and label", () => {
    const mockedHandleClick = jest.fn();
    const label = "button label";
    const component = render(
      <Button outline label={label} onClick={mockedHandleClick} />
    );
    expect(component).toBeDefined();
    expect(component.getByTestId("button")).toHaveClass("bg-white");
    expect(component.getByTestId("button")).toHaveTextContent(label);
  });

  test("renders button styling when outline=false", () => {
    const mockedHandleClick = jest.fn();
    const label = "button label";
    const component = render(
      <Button label={label} onClick={mockedHandleClick} />
    );
    expect(component).toBeDefined();
    expect(component.getByTestId("button")).toHaveClass("bg-rose-500");
  });

  test("changes button styling when small=true", () => {
    const mockedHandleClick = jest.fn();
    const label = "button label";
    const component = render(
      <Button small label={label} onClick={mockedHandleClick} />
    );
    expect(component.getByTestId("button")).toHaveClass("py-1");
  });

  test("changes button styling when small=false", () => {
    const mockedHandleClick = jest.fn();
    const label = "button label";
    const component = render(
      <Button label={label} onClick={mockedHandleClick} />
    );
    expect(component.getByTestId("button")).toHaveClass("text-md");
  });

  test("disabled button when disabled=true", () => {
    const mockedHandleClick = jest.fn();
    const label = "button label";
    const component = render(
      <Button disabled label={label} onClick={mockedHandleClick} />
    );
    expect(mockedHandleClick).not.toHaveBeenCalled;
    expect(component.getByTestId("button")).toBeDisabled;
  });
});
