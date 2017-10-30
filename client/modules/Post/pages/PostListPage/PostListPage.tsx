// tslint:disable-next-line
import * as React from 'react';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest } from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

import { Post } from '../../PostModel';
import { State } from '../../../../reducers';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';

interface Props {
  posts: Post[];
  showAddPost: boolean;
  dispatch(action: object): () => void;
}

interface Context {
  router: object;
}

class PostListPage extends React.Component<Props, {}> {
  static need = [() => { return fetchPosts(); }];

  context: Context;

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleDeletePost = (post: Post) => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post.cuid));
    }
  }

  handleAddPost = (name: string, title: string, content: string) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  }

  render() {
    return (
      <div>
        <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} intl />
        <PostList handleDeletePost={this.handleDeletePost} posts={this.props.posts} />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state: State) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  };
}

export default connect(mapStateToProps, null)(PostListPage);
