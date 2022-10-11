import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'

const client = new ApolloClient({
  uri: import.meta.env.VITE_RICKMORTY_GRAPHQL_URL,
  cache: new InMemoryCache()
})

console.log(import.meta.env.VITE_RICKMORTY_GRAPHQL_URL)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
