import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../containers/AuthContext'
import PageContainer from '../components/Layout/PageContainer'

const Profile = () => {
    const { user } = useAuth()

    const date = new Date(user.userData?.dateCreated!)

    return user.userData ? (
        <PageContainer style={{ color: '#FFF' }}>
            <h3>Username</h3>
            <p>{user.userData.username}</p>
            <hr style={{ borderColor: '#FFF' }} />
            <h3>Email</h3>
            <p>{user.userData.email}</p>
            <hr style={{ borderColor: '#FFF' }} />
            <h3>Account Created</h3>
            <p>{date.toDateString()}</p>
        </PageContainer>
    ) : (
        <Redirect to={{ pathname: '/' }} />
    )
}

export default Profile
