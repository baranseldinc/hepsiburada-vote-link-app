import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';

const ListPage = () => <App />
const NewItemPage = () => <App page='new' />

const routes = (
  <BrowserRouter>
    <Route exact path="/" component={ListPage} />
    <Route path="/new" component={NewItemPage} />
  </BrowserRouter>
)

ReactDOM.render(routes,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );