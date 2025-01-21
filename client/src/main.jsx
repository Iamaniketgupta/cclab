 import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './contexts/DarkModeWrapper.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { RecoilRoot } from 'recoil'
import { FetchDataProvider } from './contexts/FetchDataApi.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <RecoilRoot>
      <FetchDataProvider>
      <Provider store={store}>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </Provider>
      </FetchDataProvider>
    </RecoilRoot>
    <ToastContainer />
  </BrowserRouter>,
)
