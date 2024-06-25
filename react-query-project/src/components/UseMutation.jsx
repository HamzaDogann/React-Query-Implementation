import React from 'react'
import { useMutation } from 'react-query'

const UseMutation = () => {

    const { data, mutate, reset, isLoading } = useMutation(['user'], (newPost) => {
        return fetch('https://jsonplaceholder.org/users', {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                'Content-type': 'application/json; charset-UTF-8'
            }

        }).then(response => response.json());
    })

    if (isLoading) {
        return <div>Loading...</div>
    }
    console.log(data, "data")
    return (
        <>
            <div>
                <button onClick={() => mutate({ title: "Deneme", body: "deneme-body", userId: 1 })}>Veri Ekle</button>
                <button onClick={() => reset()}>Veri Rest</button>
            </div>

        </>
    )
}

export default UseMutation