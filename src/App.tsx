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
import { NewBusiness } from './pages/NewBusiness';
import { SettingsAddress } from './pages/SettingsAddress';
import { SettingsLocation } from './pages/SettingsLocation';
import { SettingsServices } from './pages/SettingsServices';
import { SettingsAdvanced } from './pages/SettingsAdvanced';
import { SettingsHour } from './pages/SettingsHour';
import { Bookings } from './pages/Bookings';
import { Booking } from './pages/Booking';
import { SettingsGallery } from './pages/SettingsGallery';
import { Services } from './pages/Services';
import { Customers } from './pages/Customers';

const App = () => {
  const PrivateRoutes = () => {
    const isAuth = Cookies.get("qid") ? true : false
    if (isAuth) {
      return (
        <Route exact path='/:path?/:path2?'>
          <Layout>
            <Route path='/' exact component={Home} />
            <Route path='/bookings' exact component={Bookings} />
            <Route path='/bookings/:id' exact component={Booking} />
            <Route path='/services' exact component={Services} />
            <Route path='/settings' exact component={Settings} />
            <Route path='/customers' exact component={Customers} />
            {/* <Route path='/settings/services' exact component={SettingsServices} /> */}
            <Route path='/settings/address' exact component={SettingsAddress} />
            <Route path='/settings/location' exact component={SettingsLocation} />
            <Route path='/settings/hours' exact component={SettingsHour} />
            <Route path='/settings/photos' exact component={SettingsGallery} />
            <Route path='/settings/advanced' exact component={SettingsAdvanced} />
            {/* <Route component={NotFound}/> */}
          </Layout>
        </Route>
      )
    } else {
      return <Route render={() => <Redirect to={{ pathname: '/signup' }} />} />
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
    <BrowserRouter basename='/manager/'>
      
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
