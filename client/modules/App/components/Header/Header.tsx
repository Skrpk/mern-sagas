import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Intl } from '../../../Intl/IntlModel';
// Import Style
const styles = require('./Header.css');

interface HeaderProps {
  toggleAddPost(): void;
  switchLanguage(lang: string): void;
  intl: Intl;
}

export class Header extends React.Component<HeaderProps> {
  static contextTypes = {
    router: PropTypes.object,
  };

  renderLangNodes = (): object[] => {
    const { props } = this;
    return props.intl.enabledLanguages.map(
      lang =>
        <li
          key={lang}
          onClick={() => props.switchLanguage(lang)}
          className={lang === props.intl.locale ? styles.selected : ''}>
          {lang}
        </li>,
    );
  }

  render() {
    const { context } = this;
    const renderAddPostButton = context.router.isActive ? context.router.isActive() :
                                  context.router.route.location.pathname === '/';
    return (
      <div className={styles.header}>
        <div className={styles['language-switcher']}>
          <ul>
            <li><FormattedMessage id="switchLanguage" /></li>
            {this.renderLangNodes()}
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
                  onClick={this.props.toggleAddPost}
                ><FormattedMessage id="addPost" /></a>
              : null
          }
        </div>
      </div>
    );
  }
}

// tslint:disable-next-line
// export const Header: React.SFC<HeaderProps, {}> = (props, context) => {
//
//   const renderAddPostButton = context.router.isActive ? context.router.isActive() :
//                                 context.router.route.location.pathname === '/';
//   return (
//     <div className={styles.header}>
//       <div className={styles['language-switcher']}>
//         <ul>
//           <li><FormattedMessage id="switchLanguage" /></li>
//           {languageNodes}
//         </ul>
//       </div>
//       <div className={styles.content}>
//         <h1 className={styles['site-title']}>
//           <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
//         </h1>
//         {
//           renderAddPostButton
//             ? <a
//                 className={styles['add-post-button']}
//                 href="#"
//                 onClick={props.toggleAddPost}
//               ><FormattedMessage id="addPost" /></a>
//             : null
//         }
//       </div>
//     </div>
//   );
// };


export default Header;
