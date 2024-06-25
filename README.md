# React Query Documentation

## What is React Query?

React Query is a library that simplifies data management in React applications, particularly around API requests and caching. It enhances application performance by managing data fetching, caching, synchronization, and error handling seamlessly.

### Relationship with Server State

React Query closely interacts with server state as it manages data from the server, handles caching, and ensures data freshness through automatic refetching mechanisms.

### Benefits

- **Automatic Caching:** Automatically caches data and updates it as needed.
- **Refetching Management:** Manages data refetching to keep it up-to-date.
- **Optimized API Requests:** Optimizes data fetching to reduce network traffic.
- **Error Handling:** Automatically manages and integrates API errors into the user interface.

## useQuery

`useQuery` is a React Hook used for making API requests and managing data.

### Usage

```jsx
const { data, error, isLoading, isFetching, refetch } = useQuery(queryKey, queryFn, options);
```
- **queryKey**: Represents parameters for the API request.
- **queryFn**: Asynchronous function that performs the actual API call.
- **options**: Optional object containing configuration options

### Parameters
- **queryKey**: Array or string representing parameters for the API request.
- **queryFn**: Asynchronous function that performs the actual API call.
___________________________________________
### Options

- **enabled**: Determines if the initial request should be automatically executed.
- **staleTime**: Defines how long data remains fresh before triggering a refetch.
- **onSuccess**, onError: Functions to handle success or error states.
___________________________________________
### Variables
- **isLoading**: True while the request is in progress; false once completed.
- **isFetching**: True during refetching.
- **data**: Data returned from the API.
- **error**: Error object if an error occurs during the API request.
___________________________________________

## useMutation

`useMutation` is a React Hook used for data mutation operations such as updates or creations.

### Usage

```jsx
const { isPending, isError, data, error } = useMutation(mutationFn, options);
```
_____________________________________

### Parameters

- **mutationFn:** 
  Asynchronous function that performs the mutation operation.

- **options:**
  Optional object containing configuration options.
  
  - `onMutate`: Function called before the mutation function is executed. It can be used for optimistic updates.
  - `onSuccess`: Function called if the mutation succeeds.
  - `onError`: Function called if the mutation encounters an error.

### Variables

- **isPending:** 
  Boolean indicating whether the mutation is currently in progress.

- **isError:** 
  Boolean indicating whether an error occurred during the mutation.

- **data:** 
  Data returned from the mutation if successful.

- **error:** 
  Error object containing details if an error occurs during the mutation.

  ___________________________________

  ### Other Important Variables

- **isIdle:** Indicates that the mutation has not started yet.
- **isPaused:** Indicates that the mutation is paused.
- **isSuccess:** Indicates that the mutation has successfully completed.
- **failureCount:** Number of failed attempts for the mutation.
- **failureReason:** Reason for the failure of the mutation.
- **mutate:** Function that triggers the mutation operation.
- **mutateAsync:** Asynchronous function that triggers the mutation operation.
- **reset:** Function that resets the state of the mutation.
_________________________________

## Important Defaults

- ### refetchInterval
Specifies the interval at which a query should automatically refetch data. For example, it can be set to refetch the query every 5 minutes.
- ### refetchOnWindowFocus**
Determines whether a query should automatically refetch data when the browser window is focused.
- ### gcTime
Specifies how long cached data should be kept before potentially being garbage collected (cleaned up) from the cache.
- ### retry
Specifies the number of times a query should retry in case of failure. For example, it can be set to retry 3 times.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5000, // 5 seconds
      refetchOnWindowFocus: true,
      gcTime: 3600000, // 1 hour in milliseconds
      retry: 3, // Retry 3 times on failure
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
```

## Query with Axios

### useQuery Implementation

```jsx
import React from 'react'; 
import { useQuery } from 'react-query'; // Import useQuery hook from react-query library
import axios from 'axios'; // Import axios library for making HTTP requests

const BASE_URL = 'https://api.example.com'; // Define the base URL of the API

// Function to fetch user data from the API asynchronously
const fetchData = async () => {
  const response = await axios.get(BASE_URL + '/users'); // Send a GET request to fetch users
  return response.data; // Return the data from the response
};


const UsersComponent = () => {
  // useQuery hook to fetch data and manage loading and success states
  const { data, isLoading, isSuccess } = useQuery({ queryKey: ['users'], queryFn: fetchData });

  // Render loading message if data is still loading
  if (isLoading) return <p>Loading...</p>;

  // Render error message if fetching data was not successful
  if (!isSuccess) return <p>Failed to fetch data.</p>;


  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersComponent; // Export UsersComponent as default
```

### useMutation Implementation
```jsx
    const addUser = async (newUser) => {
            const response = await axios.post(BASE_URL + '/users', newUser);
            return response.data;
    };

    const addUserMutation = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
```

✦ **queryClient.invalidateQueries({ queryKey: ['users'] })** ✦
- Function call in React Query invalidates all queries associated with the 'users' query key, ensuring that the next access triggers a refetch to fetch fresh data from the server, maintaining data consistency.

```jsx
    const handleUpdateUser = (e) => {
        e.preventDefault();
        UserUpdateMutation.mutate(newUser)
    }
```

✦ **UserUpdateMutation.mutate(newUser)** ✦
- Function call in React Query that triggers the execution of a mutation operation (addUserMutation in this case) with the provided newUser data. This function initiates an asynchronous process where newUser is sent to the server to add a new user, and upon successful completion, it invalidates the 'users' queries to ensure the updated data is fetched and displayed across the application.

________________________________________________________________________________________

### Many other features are in my project files. You can also visit TanStack Query for more resources.

https://tanstack.com/query/latest

See you later 👋
