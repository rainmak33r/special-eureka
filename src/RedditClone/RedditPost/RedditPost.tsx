import { Box, Button, Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import { MessageInput } from '../../shared/components/MessageInput';
import { Message } from '../../shared/interfaces/Chat';
import { Post } from '../interfaces';
import { useRedditCloneDispatch } from '../reddit-clone-context';

interface Props {
  post: Post;
}

export const RedditPost: FC<Props> = ({post}) => {
  const { content, date, replys } = post
  const dispatch = useRedditCloneDispatch()
  const [showReply, setShowReply] = useState(false)

  const handleOpenReply = () => setShowReply(true)

  const handleCloseReply = () => setShowReply(false)

  const handleMessageSent = (value: Message) => {
    dispatch({type: 'new-reply', payload: {id: post.id, newReply: {...value, replys: []}} })

    handleCloseReply()
  }
  console.log(replys);

  return <Box display="flex" flexDirection="column">
    <Box>
      <Box>
        <Typography>{content}</Typography>
        <Typography variant="caption">
          {date.toLocaleString("en-GB")}
        </Typography>
      </Box>
      <Box>
        <Button onClick={handleOpenReply}>Reply</Button>
      </Box>
      <Box>
        {showReply && <MessageInput onMessageSent={handleMessageSent}/>}
      </Box>
      {replys?.map((post) => <Box marginLeft={3} key={post.id}>
        <RedditPost post={post} />
      </Box>)}
    </Box>
  </Box>
}
