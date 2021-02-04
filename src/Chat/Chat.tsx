import { useEffect, useRef, useState } from "react";
import { MessageInput } from "../MessageInput";
import { Message } from "../shared/interfaces/Chat";
import { ChatBubble } from "./ChatBubble";
import { Box, Divider, Paper } from "@material-ui/core";

export const Chat = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleMessageSent = (message: Message) => {
    setMessages((prevState) => [message, ...prevState]);
  };

  useEffect(() => {
    ref?.current?.scrollIntoView();
  }, [messages]);

  return (
    <Paper elevation={3}>
      <Box
        display="flex"
        flexDirection="column"
        height="75vh"
        paddingX={3}
        paddingBottom={3}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignContent="flex-start"
          height="100%"
          overflow="auto"
          paddingX={3}
          data-testid="chat-list-item"
        >
          {messages.map((message, index) => (
            <ChatBubble
              key={message.id}
              isIncoming={index % 2 === 0}
              chatItem={message}
            />
          ))}
          <div ref={ref} />
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" paddingY={4}>
          <MessageInput onMessageSent={handleMessageSent} />
        </Box>
      </Box>
    </Paper>
  );
};
