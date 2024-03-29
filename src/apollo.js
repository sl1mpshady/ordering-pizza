// Remove the apollo-boost import and change to this:
import ApolloClient from "apollo-client";

// Setup the network "links"
import {WebSocketLink} from 'apollo-link-ws';
import {HttpLink} from 'apollo-link-http';
import {split} from 'apollo-link';
import {getMainDefinition} from 'apollo-utilities';

import {InMemoryCache} from 'apollo-cache-inmemory';

export const HASURA_GRAPHQL_ENGINE_HOSTNAME = 'ordering-pizza.herokuapp.com';

const scheme = (proto) => {
    return window.location.protocol === 'https:'
        ? `${proto}s`
        : proto;
}

const admin_secret = "siegfred123";

const wsurl = `${scheme('wss')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
const httpurl = `${scheme('http')}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

const wsLink = new WebSocketLink({
    uri: wsurl,
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                'x-hasura-admin-secret': admin_secret
            }
        }
    }
});

const httpLink = new HttpLink({
    uri: httpurl,
    headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': admin_secret
    }
});

const link = split(
// split based on operation type
({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
}, wsLink, httpLink,);

const client = new ApolloClient({link, cache: new InMemoryCache()});

export default client;