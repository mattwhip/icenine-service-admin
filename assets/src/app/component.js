import {
    Route,
    BrowserRouter as Router,
    Switch
} from 'react-router-dom'
import { Redirect } from 'react-router'
import React from 'react'

import { container as Login } from 'app/login'
import { container as Main } from 'app/main'


class App extends React.Component {
    render () {
        return (
            <div>
                <Router>
                    <Switch>
                        {/* <Route path="/" exact={true} render={(props) => <Redirect to="/main"/>} /> */}
                        <Route path="/" exact={true} render={(props) => <Login redirectTo="/main"/>} />
                        <Route path="/main" component={Main} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
