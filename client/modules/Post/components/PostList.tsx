import * as React from 'react';
// Import Components
import PostListItem from './PostListItem/PostListItem';

import { Post } from '../PostModel';

interface Props {
  posts: Post[];
  handleDeletePost(post: Post): void;
}

// tslint:disable
const PostList:React.SFC<Props> = (props) => {
  return (
    <div className="listView">
      {
        props.posts.map(post => (
          <PostListItem
            post={post}
            key={post.cuid}
            onDelete={() => props.handleDeletePost(post)}
          />
        ))
      }
    </div>
  );
}
// tslint:enable

export default PostList;
