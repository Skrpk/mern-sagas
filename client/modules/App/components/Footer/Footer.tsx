import * as React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
const styles = require('./Footer.css');
// Import Images
let bg:any;
if (global) {
  bg = '../../header-bk.png';  
} else {
  bg = require('../../header-bk.png');  
}

export class Footer extends React.Component<{}> {
  render() {
    return (
      <div style={{ background: `#FFF url(${bg}) center` }} className={styles.footer}>
        <p>&copy; 2016 &middot; Hashnode &middot; LinearBytes Inc.</p>
        <p>
          <FormattedMessage
            id="twitterMessage"
           /> : <a href="https://twitter.com/@mern_io" target="_Blank">
          @mern_io</a>
        </p>
      </div>
    );
  }
}

export default Footer;
