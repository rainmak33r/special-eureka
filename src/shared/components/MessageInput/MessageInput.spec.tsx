import { MessageInput } from "./MessageInput";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorMessages } from "../../constants/errors";

const onMessageSentMock = jest.fn();

const setup = () => render(<MessageInput onMessageSent={onMessageSentMock} />);

describe("MessageInput", () => {
  it("should render", () => {
    setup();
    expect(screen.getByTestId("message-form")).toBeVisible();
    expect(screen.getByText(/Send/i)).toBeVisible();
  });
  it("should show error if the field is empty", async () => {
    setup();
    await waitFor(() => {
      userEvent.click(screen.getByText(/Send/i));
    });
    expect(screen.getByLabelText(/say something/i)).toHaveValue("");
    expect(screen.getByText(ErrorMessages.empty)).toBeVisible();
  });
  it("should trigger onMessageSentMock when field is updated and the input values is reset", async () => {
    setup();
    const value = "foobarfoo";
    userEvent.type(screen.getByLabelText(/say something/i), value);

    await waitFor(() => {
      userEvent.click(screen.getByText(/Send/i));
      expect(screen.getByLabelText(/say something/i)).toHaveValue(value);
    });

    expect(onMessageSentMock).toBeCalledWith(
      expect.objectContaining({
        content: value,
        id: expect.any(String),
        date: expect.any(Date),
      })
    );
  });
});
