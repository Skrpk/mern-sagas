import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// Import Style
const styles = require('./PostListItem.css');

interface Props {
  posts: {
    name: string;
    title: string;
    content: string;
    slug: string;
    cuid: string;
  }[];
  onDelete: () => void;
}

const PostListItem: React.SFC<Props> = (props) => {
  return (
    <div className={styles['single-post']}>
      <h3 className={styles['post-title']}>
        <Link to={`/posts/${props.post.cuid}`} >
          {props.post.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.post.name}</p>
      <p className={styles['post-desc']}>{props.post.content}</p>
      <p className={styles['post-action']}>
        <a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost" /></a>
      </p>
      <hr className={styles.divider} />
    </div>
  );
};

export default PostListItem;