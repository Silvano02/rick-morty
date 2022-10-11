import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'

const GRAPHQL_URL = import.meta.env.VITE_RICKMORTY_GRAPHQL_URL

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
