import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import * as Cookies from "js-cookie";

// Pages
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { UserService } from './services/userService';

const App = () => {

  const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const isAuth = Cookies.get("qid") ? true : false

    return (
      <Route
        {...rest}
        render={(props) => ( isAuth
          ? ( <Component {...props} /> ) 
          : ( <Redirect to={{ pathname: '/login' }} /> )) 
        } 
      />
    )
  }

  const AuthRoute = ({ component: Component, ...rest }: any) => {
    const isAuth = Cookies.get("qid") ? true : false

    return (
      <Route
        {...rest}
        render={(props) => ( !isAuth
          ? ( <Component {...props} /> ) 
          : ( <Redirect to={{ pathname: '/' }} /> )) 
        } 
      />
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path='/login' exact component={Login} />
        <AuthRoute path='/signup' exact component={Signup} />

        <PrivateRoute path='/' exact component={Home} />
      </Switch>
    </BrowserRouter>   
  )
}

export default App;
