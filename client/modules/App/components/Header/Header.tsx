import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

interface HeaderProps {
  toggleAddPost(): () => void;
  switchLanguage(lang: string): () => void;
  intl: object;
}

interface HeaderContext {
  router: object;
}

// tslint:disable-next-line
export const Header: React.SFC<HeaderProps, HeaderContext> = (props, context) => {
  const languageNodes = props.intl.enabledLanguages.map(
    lang =>
      <li
        key={lang}
        onClick={() => props.switchLanguage(lang)}
        className={lang === props.intl.locale ? styles.selected : ''}>
        {lang}
      </li>,
  );

  const renderAddPostButton = context.router.isActive ? context.router.isActive() :
                                context.router.route.location.pathname === '/';
  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
          <li><FormattedMessage id="switchLanguage" /></li>
          {languageNodes}
        </ul>
      </div>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
        {
          renderAddPostButton
            ? <a
                className={styles['add-post-button']}
                href="#"
                onClick={props.toggleAddPost}
              ><FormattedMessage id="addPost" /></a>
            : null
        }
      </div>
    </div>
  );
};

export default Header;
