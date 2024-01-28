import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import RoutesComponent from './Routes/Routes'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { Copnonets } from './copontents/Components'
import { store } from './redux/store';
import "react-toastify/dist/ReactToastify.css";
import './assets/css/index.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
          <Provider store={store}>
            <BrowserRouter>
              <App Routes={RoutesComponent} Components={Copnonets} />
            </BrowserRouter>
          </Provider>
  </>,
)
