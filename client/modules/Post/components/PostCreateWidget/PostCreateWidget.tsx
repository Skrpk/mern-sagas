import * as React from 'react';
import { intlShape, injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';

// Import Style
const styles = require('./PostCreateWidget.css');

interface Props {
  addPost(name: string, title: string, content: string): void;
  showAddPost?: boolean;
  intl?: any;
}

export class PostCreateWidget extends React.Component<Props & InjectedIntlProps, {}> {
  private nameInput: HTMLInputElement;
  private titleInput: HTMLInputElement;
  private contentInput: HTMLTextAreaElement;

  addPost = (): void => {
    const { nameInput, titleInput, contentInput } = this;
    if (nameInput.value && titleInput.value && contentInput.value) {
      this.props.addPost(nameInput.value, titleInput.value, contentInput.value);
      nameInput.value = titleInput.value = contentInput.value = '';
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
            ref={(input) => { this.nameInput = input; }}
          />
          <input
            placeholder={this.props.intl.messages.postTitle}
            className={styles['form-field']}
            ref={(input) => { this.titleInput = input; }}
          />
          <textarea
            placeholder={this.props.intl.messages.postContent}
            className={styles['form-field']}
            ref={(input) => { this.contentInput = input; }}
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
