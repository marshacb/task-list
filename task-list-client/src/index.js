import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Route,  } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import Welcome from './components/Welcome'
import NewTaskItem from './components/NewTaskItem'
import TaskDetail from './components/TaskDetail'
import axios from 'axios'

registerServiceWorker();


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers); // creating an instance of our redux store ahead of time

window.reduxStore = store
window.axios = axios


ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <div>
    <Route exact path="/" component={Welcome} />
    <Route path="/create" component={NewTaskItem} />
    <Route path="/details/:id" component={TaskDetail} />
  </div>  
    
  </BrowserRouter>
  </Provider>
  , document.getElementById('root'))
