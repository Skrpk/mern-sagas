import * as React from 'react';
// Import Components
import PostListItem from './PostListItem/PostListItem';

interface Props {
  posts: {
    name: string;
    title: string;
    content: string;
    slug: string;
    cuid: string;
  }[];
  handleDeletePost(cuid: string): () => void;
}

// tslint:disable
const PostList:React.SFC<Props, {}> = (props) => {
  return (
    <div className="listView">
      {
        props.posts.map(post => (
          <PostListItem
            post={ post}
            key={ post.cuid}
            onDelete={() => props.handleDeletePost(post.cuid)}
          />
        ))
      }
    </div>
  );
}
// tslint:enable

export default PostList;
