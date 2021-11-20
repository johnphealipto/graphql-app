import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Books from "./components/Books";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}> 
      <div className="App">
        <Books />
      </div>
    </ApolloProvider>
  );
}

export default App;
