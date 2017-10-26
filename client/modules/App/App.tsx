// tslint:disable-next-line
import * as React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
// Import Style
const styles = require('./App.css');
import { State } from '../../reducers';

// Import Components
import { Helmet } from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

interface AppProps {
  dispatch(action: object): void;
  route: any;
  intl: object;
}

interface AppState {
  isMounted: boolean;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  }

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension &&
        process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="MERN Starter - Blog App"
            titleTemplate="%s - Blog App"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
            toggleAddPost={this.toggleAddPostSection}
          />
          <main className={styles.container}>
            {renderRoutes(this.props.route.routes)}
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(store: State) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps, null)(App);
