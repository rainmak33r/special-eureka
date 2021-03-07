import { Box, Paper } from '@material-ui/core';
import { RedditPost } from './RedditPost';
import { useRedditCloneDispatch, useRedditCloneState } from './reddit-clone-context';
import { MessageInput } from '../shared/components/MessageInput';
import { Message } from '../shared/interfaces/Chat';

export const RedditClone = () => {
  const { posts } = useRedditCloneState()
  const dispatch = useRedditCloneDispatch()

  const handleMessageSent = (value: Message) => {
    dispatch({type: 'new-post', payload: {newPost: {...value, replys: []}} })
  }

  return <Paper elevation={3}>
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
      {posts.map((post) => <RedditPost key={post.id} post={post}/>)}
      </Box>
      <Box display="flex" alignSelf="center" paddingY={4}>
        <MessageInput onMessageSent={handleMessageSent} />
      </Box>
    </Box>
  </Paper>
}
