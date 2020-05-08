import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../containers/AuthContext'

const Profile = () => {
    const { user } = useAuth()
    return user.data ? (
        <>
            <p>Username: {user.data.username}</p>
            <p>Email: {user.data.email}</p>
        </>
    ) : (
        <Redirect to={{ pathname: '/' }} />
    )
}

export default Profile
