import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Register from './pages/register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
<Switch>
  <Route path='/register' component={Register}></Route>
  <Route path='/home' component={Home}></Route>
  {/* <Route path='/login' component={Login}></Route> */}

</Switch>
    </Router>
  
  );
}

export default App;

/*

<Router>
        <Switch>
          <PublicRoute path='/register' authenticated={authenticated} component={SignUp} />
          <PublicRoute path='/login' authenticated={authenticated} component={SignIn} />
          <PrivateRoute path='/akam/chat/:conversationId' authenticated={authenticated} component={Conversation} />
          <Route path='/akam' component={Home} />
          <Route path='/projects/:projectId/units/:unitId' component={UnitDetails} />
          <Route path='/projects/:projectId/units' component={UnitsList} />
          <Route path='/projects/:projectId' component={LayoutWithoutNav} />
          <PublicRoute exact path='/' authenticated={authenticated} component={Welcome} />
        </Switch>
      </Router>
*/
