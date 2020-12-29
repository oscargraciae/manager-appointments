import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import * as Cookies from "js-cookie";

// Components
import { Layout } from './components/general/Layout';

// Pages
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Settings } from './pages/Settings';
import { BookingCalendar } from './pages/BookingCalendar';
import { NewBusiness } from './pages/NewBusiness';

const App = () => {

  const PrivateRoutes = () => {
    const isAuth = Cookies.get("qid") ? true : false
    if (isAuth) {
      return (
        <Route exact path='/:path?'>
          <Layout>
            <Route path='/' exact component={Home} />
            <Route path='/calendar' exact component={BookingCalendar} />
            <Route path='/settings' exact component={Settings} />
            {/* <Route component={NotFound}/> */}
          </Layout>
        </Route>
      )
    } else {
      return <Route render={() => <Redirect to={{ pathname: '/login' }} />} />
    }
  }

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

  const PublicRoute = ({ component: Component, ...rest }: any) => {
    const isAuth = Cookies.get("qid") ? true : false
    console.log('isAuth', isAuth);
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
        <PublicRoute path='/login' exact component={Login} />
        <PublicRoute path='/signup' exact component={Signup} />
        
        <PrivateRoute path='/new-business/:step?' exact component={NewBusiness} />
        {/* <Route component={NotFound}/> */}

        <PrivateRoutes />
      </Switch>
    </BrowserRouter>   
  )
}

export default App;
