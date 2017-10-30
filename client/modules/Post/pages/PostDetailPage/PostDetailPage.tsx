import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
// tslint:disable-next-line
const styles = require('../../components/PostListItem/PostListItem.css');
import { State } from '../../../../reducers';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

interface Post {
  name: string;
  title: string;
  content: string;
  slug: string;
  cuid: string;
}

interface Props {
  post: Post;
}

// tslint:disable-next-line
export class PostDetailPage extends React.Component<Props> {
  // Actions required to provide data for this component to render in server side.
  static need = [(params: Post) => {
    return fetchPost(params.cuid);
  }];

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}>
            <FormattedMessage id="by" /> {this.props.post.name}
          </p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state: State, props: any) {
  return {
    post: getPost(state, props.match.params.cuid),
  };
}

export default connect(mapStateToProps)(PostDetailPage);
