import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }//! Sayfaya her focus olduğumuzda fetch işlemi yapılıyor bunu istemeyiz bu nedenle QueryClient içinde bazı durumları düzenlemek gerekir.
    //! defaultOptions> queries > "refetchOnWindowFocus = false" yaparak sayfaya her fokus olduğumuz zaman fetch yapmasını engelliyoruz.
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
)
