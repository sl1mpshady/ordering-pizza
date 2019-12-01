import gql from 'graphql-tag';

export const MUTATION_ORDER = gql`
    mutation order($order_pizzas: Int!, $order_excess: Int!, $order_slices: Int!, $order_items: [order_items_insert_input!]!) {
        insert_orders(
            objects: [
                {
                  slices: $order_pizzas
                  excess: $order_excess
                  pizzas: $order_pizzas
                  order_items: {
                      data: $order_items
                  }
                }
            ]
          ){
            affected_rows
            returning {
                id
            }
          }
    }
`;

export const QUERY_ORDERS = gql`
    query {
        orders (
            order_by: {id:desc}
        ) {
            id
            pizzas
            slices
            excess
            order_items {
                id
                pizza
                slices
                pieces 
                excess
            }
            created_at
        }
    }
`;

export const SUBSCRIPTION_ORDERS = gql`
    subscription orders {
        orders (
            order_by: {id:desc}
        ) {
            id
            pizzas
            slices
            excess
            order_items {
                id
                pizza
                slices
                pieces 
                excess
            }
            created_at
        }
    }
`;