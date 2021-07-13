import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "@apollo/client/cache";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:5000"
})

const authLink = setContext(() => {
    const token = localStorage.getItem("loginToken")
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})



export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)