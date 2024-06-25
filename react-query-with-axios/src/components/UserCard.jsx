import React from 'react'
import { MdOutlinePersonPin } from "react-icons/md";

const UserCard = ({ user }) => {


    return (
        <div className='user-card'>
            <div style={{ display: "flex", width: "100%", justifyContent: "center", marginBottom: "10px" }}>
                <MdOutlinePersonPin style={{ fontSize: "50px" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p><strong>User ID </strong> :  {user.id}</p>
                <p><strong>Username</strong> : {user.username} </p>
                <p><strong>Email</strong> : {user.email} </p>
                <p><strong>Password</strong> : {user.password} </p>
                <p><strong>Country </strong> :  {user.country}</p>
            </div>
        </div>
    )
}

export default UserCard 