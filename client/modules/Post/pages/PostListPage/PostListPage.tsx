// tslint:disable-next-line
import * as React from 'react';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest } from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';

interface Props {
  posts: object[];
  showAddPost: boolean;
  dispatch(action: object): () => void;
}

interface Context {
  router: object;
}

class PostListPage extends React.Component<Props, {}> {
  context: Context;

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleDeletePost = (post) => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  }

  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  }

  render() {
    return (
      <div>
        <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
        <PostList handleDeletePost={this.handleDeletePost} posts={this.props.posts} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  };
}

export default connect(mapStateToProps)(PostListPage);