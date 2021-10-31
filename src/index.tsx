import React from 'react';
import ReactDOM from 'react-dom';
import { AppContext } from './contexts/appContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppContext>
  </React.StrictMode>,
  document.getElementById('root')
);

