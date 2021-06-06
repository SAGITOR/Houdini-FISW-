import React, {useContext} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login, SignUp, Dashboard } from '../components';
import { MyConversation } from '../components/custom pages';
import { AuthContext } from '../services';


const Routes = () => {
    const { currentUser } = useContext(AuthContext);
    
    //marco weko
    return(
       
        <Switch>
            <Route exact path = "/" component = {Login} /> 
            <Route exact path = "/register" component = {SignUp} /> 
            <PrivateRoute exact path = "/dashboard" component = {Dashboard} authed = {currentUser} /> 
            <PrivateRoute  exact path = "/myconversations" component = {MyConversation} authed = {currentUser} />
            <PrivateRoute  exact path = "/myconversations/:documentId" component = {MyConversation} authed = {currentUser} />
            <Route render = {() => <p>Pagina no encontrada</p>} />
       </Switch>

    )
}

const PrivateRoute = ({component: Component, authed, ...rest}) => {
    return (
      <Route
        {...rest}
        render = {(props) => authed
          ? <Component {...props} />
          : <Redirect to = {{pathname: '/', state: {from: props.location}}} />}
      />
    )
  }

export default Routes;
