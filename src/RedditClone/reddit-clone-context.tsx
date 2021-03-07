import * as React from 'react'
import { Post } from './interfaces';

interface NewPost {
  type: 'new-post';
  payload: { newPost: Post }
}

interface NewReply {
  type: 'new-reply',
  payload: { id: string, newReply: Post }
}

type ActionTypes = NewPost | NewReply
type Dispatch = (action: ActionTypes) => void
type State = { posts: Post[] }
type RedditCloneProviderProps = { children: React.ReactNode }
const RedditCloneStateContext = React.createContext<State | undefined>(undefined)
const RedditCloneDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

function reducer(state: State, action: ActionTypes) {
  switch (action.type) {
    case 'new-post': {
      return { ...state, posts: [...state.posts, action.payload.newPost] }
    }
    case 'new-reply': {
      if (!action.payload.id) {
        return { ...state, posts: [action.payload.newReply] }
      }

      const findParent = (posts: Post[]): Post[] => {
        return posts.map((post) => {
          if (post.id === action.payload.id) {
            return {
              ...post,
              replys: [...post.replys, action.payload.newReply]
            }
          }
          if (post.replys.length) {
            return { ...post, replys: findParent(post.replys) }
          }
          return post
        })
      }

      const updatedPosts = findParent(state.posts);
      return { ...state, posts: updatedPosts }
    }
  }
}

function RedditCloneProvider({ children }: RedditCloneProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, { posts: [] })
  return (
    <RedditCloneStateContext.Provider value={state}>
      <RedditCloneDispatchContext.Provider value={dispatch}>
        {children}
      </RedditCloneDispatchContext.Provider>
    </RedditCloneStateContext.Provider>
  )
}

function useRedditCloneState() {
  const context = React.useContext(RedditCloneStateContext)
  if (context === undefined) {
    throw new Error('useRedditCloneState must be used within a RedditCloneProvider')
  }
  return context
}

function useRedditCloneDispatch() {
  const context = React.useContext(RedditCloneDispatchContext)
  if (context === undefined) {
    throw new Error('useRedditCloneDispatch must be used within a RedditCloneProvider')
  }
  return context
}

export { RedditCloneProvider, useRedditCloneState, useRedditCloneDispatch }
