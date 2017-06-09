import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import App from './container/App'
import Profile from './container/Profile'
import Rooms from './container/Rooms'
import Room from './container/Room'
import AddRoom from './container/AddRoom'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/rooms" component={Rooms}/>
                    <Route path="/room/:id" component={Room}/>
                    <Route path="/addroom" component={AddRoom}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
  document.getElementById("root")
);