import * as React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
const styles = require('./PostCreateWidget.css');

interface Props {
  addPost(name: string, title: string, content: string): () => void;
  showAddPost: boolean;
  intl: intlShape;
}

export class PostCreateWidget extends React.Component<Props, {}> {
  addPost: void = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addPost(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  }

  render() {
    const cls = `${styles.form} ${(this.props.showAddPost ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input
            placeholder={this.props.intl.messages.authorName}
            className={styles['form-field']}
            ref="name"
          />
          <input
            placeholder={this.props.intl.messages.postTitle}
            className={styles['form-field']}
            ref="title"
          />
          <textarea
            placeholder={this.props.intl.messages.postContent}
            className={styles['form-field']}
            ref="content"
          />
          <a
            className={styles['post-submit-button']}
            href="#"
            onClick={this.addPost}
          >
            <FormattedMessage id="submit" />
          </a>
        </div>
      </div>
    );
  }
}

export default injectIntl(PostCreateWidget);
