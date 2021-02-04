import { ChatBubble, Props as ChatBubbleProps } from "./ChatBubble";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Message } from "../../shared/interfaces/Chat";
import { uuidv4 } from "../../shared/utils/randomizers";

const setup = (props: ChatBubbleProps) => render(<ChatBubble {...props} />);
const mockMessage: Message = {
  content: "foobar",
  id: uuidv4(),
  date: new Date(),
};
describe("Chat Bubble", () => {
  it("should render", () => {
    setup({ chatItem: mockMessage, isIncoming: true });
    expect(
      screen.getByText(new RegExp(mockMessage.content, "i"))
    ).toBeVisible();
    expect(
      screen.getByText(mockMessage.date.toLocaleString("en-GB"))
    ).toBeVisible();
    expect(screen.getByTestId("chat-bubble-item-incoming")).toBeVisible();
  });
  it("should update the list with the messages", async () => {
    setup({ chatItem: mockMessage, isIncoming: false });
    expect(screen.getByTestId("chat-bubble-item-outgoing")).toBeVisible();
  });
});
