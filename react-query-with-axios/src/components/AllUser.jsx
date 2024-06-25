import React, { useEffect } from 'react'
import UserCard from "./UserCard";
import axios from "axios";
import { useQuery } from '@tanstack/react-query'




const AllUser = () => {

    const BASE_URL = 'http://localhost:5000';


    const fetchData = async () => {
        const response = await axios.get(BASE_URL + "/users");
        return response.data;
    }

    const {data, isLoading, isSuccess} = useQuery({ queryKey: ['users'], queryFn: fetchData });

    return (
        <div className='all-user-box'>
            <h1>Bütün Kullanıcılar</h1>
            <hr />
            <div className='user-list-box'>
                {isLoading && <div>Loading...</div>}
                {isSuccess &&
                    data.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))
                }
            </div>
        </div>
    )
}

export default AllUser