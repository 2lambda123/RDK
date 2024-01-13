import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query'

import IncrementForm from './IncrementForm';
import Counter from './Counter';

const GET_COUNTER = gql`
    {
        counter {
            count,
            incrementBy
        }
    }
`;

const INCREMENT_COUNT = gql`
    mutation IncrementCount($count: Int!, $incrementBy: Int!) {
        incrementCount(count: $count, incrementBy: $incrementBy) @client {
            count
        }
    }
`;  

const Counter = () => {
    const { data, loading, error } = useQuery(GET_COUNTER, { onError: err => console.error('Error during useQuery:', err) });
    const { counter } = data;
    const incrementCount = useMutation(INCREMENT_COUNT, { variables: counter, onError: err => console.error('Error during useMutation:', err) });
    
    {error && <div>Error...</div>}
  {loading && <div>Loading...</div>;}
    const { count, incrementBy } = counter;
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => incrementCount.mutate({variables: {count: count, incrementBy: incrementBy}})}>Increment by {incrementBy}</button>                    
            <Link to="/form">Form</Link>, <Link to="/form">Increment Form</Link>
        </div>
     );
}
 
export default Counter;

export { GET_COUNTER }