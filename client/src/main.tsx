import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import '@styles/main.scss'
import {
	MutationCache,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import axios from 'axios'

import { useAppStore } from '@store/useAppStore'

import App from './App'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1
		}
	},
	mutationCache: new MutationCache({
		onError: error => {
			const message = axios.isAxiosError(error)
				? (error.response?.data?.message ?? error.message)
				: 'Something went wrong'
			useAppStore.getState().setErrorToast(message)
		}
	})
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<App />}
					/>
					<Route
						path="/board/:boardId"
						element={<App />}
					/>
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>
)
