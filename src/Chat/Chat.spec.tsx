import { Chat } from "./Chat";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setup = () => render(<Chat />);

describe("Chat", () => {
  it("should render", () => {
    setup();
    expect(screen.getByTestId("chat-list-item")).toBeVisible();
  });
  it("should update the list with the messages", async () => {
    setup();
    const value = "foobarfoo";
    userEvent.type(screen.getByLabelText(/say something/i), value);

    await waitFor(() => {
      userEvent.click(screen.getByText(/Send/i));
      expect(screen.getByLabelText(/say something/i)).toHaveValue(value);
    });

    expect(screen.getByTestId(/chat-bubble-item-/)).toBeVisible();
  });
});
