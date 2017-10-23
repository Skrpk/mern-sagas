import * as React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
// tslint:disable-next-line
import styles from '../../components/PostListItem/PostListItem.css';
import { State } from '../../../../reducers';

// Import Actions
import { fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

interface Props {
  post: {
    name: string;
    title: string;
    content: string;
    slug: string;
    cuid: string;
  };
}

// tslint:disable-next-line
export const PostDetailPage: React<Props, {}> = (props) => {
  return (
    <div>
      <Helmet title={props.post.title} />
      <div className={`${styles['single-post']} ${styles['post-detail']}`}>
        <h3 className={styles['post-title']}>{props.post.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
        <p className={styles['post-desc']}>{props.post.content}</p>
      </div>
    </div>
  );
};

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [(params: object) => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state: State, props: object) {
  return {
    post: getPost(state, props.match.params.cuid),
  };
}

export default connect(mapStateToProps)(PostDetailPage);
