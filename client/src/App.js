import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Books from "./components/Books";
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}> 
      <div className="App">
        <Books />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
