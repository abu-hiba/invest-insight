import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../containers/AuthContext'

const Profile = () => {
    const { user } = useAuth()
    return user.userData ? (
        <>
            <p>Username: {user.userData.username}</p>
            <p>Email: {user.userData.email}</p>
        </>
    ) : (
        <Redirect to={{ pathname: '/' }} />
    )
}

export default Profile
