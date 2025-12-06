import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './routes'
import { AlertProvider } from './contexts/alert-context'
import './index.css'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import ErrorBoundary from './components/common/error-boundary'
import './lib/env'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			cacheTime: 10 * 60 * 1000,
			retry: 2,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: true,
		},
		mutations: {
			retry: 1,
		},
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AlertProvider>
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </AlertProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
