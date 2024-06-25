import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


const NewUserForm = () => {

    //!TanStack Query
    const queryClient = useQueryClient();

    //Add User States
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');

    //Delete User States
    const [userId, setUserId] = useState('');

    //Update User States
    const [userIdToUpdate, setUserIdToUpdate] = useState();
    const [userDetails, setUserDetails] = useState({
        id: '',
        email: '',
        password: '',
        country: '',
        username: ''
    });

    const [userNotFound, setUserNotFound] = useState(false);
    const [isUserToUpdate, setIsUserToUpdate] = useState(false);



    const BASE_URL = 'http://localhost:5000';

    //!----------------- New User -----------------

    const addUser = async (newUser) => {
        try {
            const response = await axios.post(BASE_URL + '/users', newUser);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const addUserMutation = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })

    const handleNewUserAdd = (e) => {
        e.preventDefault();
        addUserMutation.mutate({ username, email, password, country });
    };

    //!-----------------Delete User-----------------

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${BASE_URL}/users/${userId}`);
        } catch (error) {
            throw error;
        }
    };


    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })


    const handleDeleteUserById = (e) => {
        e.preventDefault();
        deleteUserMutation.mutate(userId)

    };

    //!-----------------Update User-----------------

    const updateUserQuery = useQuery({ queryKey: ['users'] });
    //Var olan bir query'i kullanmak istiyoruz users anahtarlı query içinden data'ya ulaşabiliriz.


    const updateUser = async (updatedUser) => {
        try {
            await axios.put(`${BASE_URL}/users/${userDetails.id}`, updatedUser);
        } catch (error) {
            throw error;
        }
    };

    const UserUpdateMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            alert("Güncelleme Başarılı")
            setIsUserToUpdate(false);
            setUserIdToUpdate("");
        },
    })

    const handleUserById = () => {
        const user = updateUserQuery.data.find(user => user.id === userIdToUpdate);
        if (user) {
            setUserNotFound(false)
            setIsUserToUpdate(true);
            setUserDetails(prevDetails => ({
                ...prevDetails,
                id: user.id,
                email: user.email,
                password: user.password,
                country: user.country,
                username: user.username
            }));
        } else {
            setUserNotFound(true)
            setIsUserToUpdate(false);
        }
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        UserUpdateMutation.mutate(userDetails)
    }

    return (
        <div className='new-user-form-box'>

            <h1>New User</h1>

            <form className='form-box' onSubmit={(e) => handleNewUserAdd(e)}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                />
                <select
                    className='form-select-box'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                >
                    <option value="">Select a country</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Germany">Germany</option>
                    <option value="Canada">Canada</option>
                    <option value="Italy">Italy</option>
                    <option value="Russia">Russia</option>
                </select>
                <div>
                    <button className='form-buttons' type="submit">
                        {addUserMutation.isPending ? "Adding New User..." : "Add User"}
                    </button>
                </div>
            </form>
            <hr style={{ marginTop: "20px", marginBottom: "10x" }} />




            <h1 style={{ marginTop: "15px" }}>Delete User</h1>

            <form onSubmit={(e) => handleDeleteUserById(e)} className='form-box'>
                <input onChange={(e) => setUserId(e.target.value)} type="text" value={userId} placeholder='User ID' />
                <div>
                    <button type='submit' className='form-buttons'>Delete User</button>
                    {deleteUserMutation.isError && <span style={{ color: "red" }}>Hata meydana geldi!</span>}
                </div>
            </form>
            <hr style={{ marginTop: "20px", marginBottom: "10x" }} />




            <h1 style={{ marginTop: "15px" }}>Update</h1>

            <input
                onChange={(e) => setUserIdToUpdate(e.target.value)}
                type="text"
                value={userIdToUpdate}
                placeholder='User ID'
                style={{ border: "2px solid #878787", padding: "10px", borderRadius: "5px" }}
            />

            <button onClick={() => handleUserById()} className='form-buttons' style={{ marginLeft: "15px" }}>Find User</button>

            {userNotFound && <span style={{ color: "red", marginLeft: "20px" }}>User not found!</span>}


            {
                isUserToUpdate &&
                <form onSubmit={(e) => handleUpdateUser(e)} className='form-box' style={{ marginTop: "30px" }}>
                    <input
                        type="text"
                        onChange={(e) => setUserDetails(prevDetails => ({
                            ...prevDetails,
                            username: e.target.value
                        }))}
                        value={userDetails.username}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="email"
                        onChange={(e) => setUserDetails(prevDetails => ({
                            ...prevDetails,
                            email: e.target.value
                        }))}
                        value={userDetails.email}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        onChange={(e) => setUserDetails(prevDetails => ({
                            ...prevDetails,
                            password: e.target.value
                        }))}
                        value={userDetails.password}
                        placeholder="Password"
                        required
                    />
                    <select
                        required
                        value={userDetails.country}
                        className="form-select-box"
                        onChange={(e) => setUserDetails(prevDetails => ({
                            ...prevDetails,
                            country: e.target.value
                        }))}
                    >
                        <option value="Turkiye">Turkiye</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                        <option value="Italy">Italy</option>
                        <option value="Russia">Russia</option>
                    </select>

                    <button type='submit' className='form-buttons'>Update User</button>
                </form>
            }

            <hr style={{ marginTop: "20px", marginBottom: "10x" }} />

        </div>
    )
}

export default NewUserForm