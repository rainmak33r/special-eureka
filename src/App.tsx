import React, { useState } from "react";
import { Box, Button, Container } from "@material-ui/core";
import { Chat } from "./Chat";
import { RedditClone } from './RedditClone';
import { RedditCloneProvider } from './RedditClone/reddit-clone-context';

enum ViewEnum {
  reddit = 'reddit',
  chat = 'chat'
}

const App = () => {
  const [view, setView] = useState<ViewEnum>(ViewEnum.chat)

  const handleChangeView = (view: ViewEnum) => () => setView(view)

  return (<>
      <Box display="flex">
        <Box marginRight="3">
          <Button onClick={handleChangeView(ViewEnum.reddit)} variant="contained" color="primary">Reddit</Button>
        </Box>
        <Box>
          <Button onClick={handleChangeView(ViewEnum.chat)} variant="contained" color="secondary">Chat</Button>
        </Box>
      </Box>
      <Container data-testid="container">
        {view === ViewEnum.chat && <Chat/>}
        <RedditCloneProvider>{view === ViewEnum.reddit && <RedditClone/>}</RedditCloneProvider>
      </Container>
    </>
  );
};

export default App;
