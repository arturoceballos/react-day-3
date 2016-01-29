// Vendor Libraries
import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux'

// Components
import Home from './home/home'
import Feed from './feed/feed'

// Styles
import '~/app/assets/styles/app'

// Reducer
import reducers from '~/app/reducers'
//
import promiseMiddleware from '~/app/flux/promise_middleware'

// Combine our reducer with the react redux reducer
const reducer = combineReducers( { routing: routeReducer, registration: reducers }, {
    routing: routeReducer
});

// Create the react-router-redux middleware
const reduxRouterMiddleware = syncHistory(browserHistory);

//Inject the middleware
const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    reduxRouterMiddleware
)(createStore);

// Create the store
const store = createStoreWithMiddleware(reducer);

class App extends React.Component {
  render() {
    const { children, history } = this.props;

    return (
        <Provider store={store}>
            <div className='container'>
                { React.Children.map(children, child => (
                    React.cloneElement(child, { history })
                    ))
                }
            </div>
        </Provider>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
        <Route path="/:token" component={Feed} />
    </Route>
  </Router>
), document.getElementById('react'));
