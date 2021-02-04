import { FC } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Message } from "../../shared/interfaces/Chat";

const useStyles = makeStyles({
  root: {
    color: "white",
  },
});

export interface Props {
  chatItem: Message;
  isIncoming: boolean;
}

export const ChatBubble: FC<Props> = ({ chatItem, isIncoming }) => {
  const classes = useStyles();
  return (
    <Box
      minWidth="33%"
      alignItems="center"
      data-testid={`chat-bubble-item-${isIncoming ? "incoming" : "outgoing"}`}
      bgcolor={isIncoming ? "primary.main" : "secondary.light"}
      borderRadius={13}
      alignSelf={isIncoming ? "flex-end" : "flex-start"}
      paddingX={4}
      paddingY={4}
      display="flex"
      justifyContent="space-between"
      marginBottom={3}
    >
      <Typography className={classes.root}>{chatItem.content}</Typography>
      <Typography className={classes.root} variant="caption">
        {chatItem.date.toLocaleString("en-GB")}
      </Typography>
    </Box>
  );
};
