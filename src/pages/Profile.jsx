import React, { useContext, useEffect } from 'react'
import { Context, server } from '../main';
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { isAuthenticated, loading, user, setLoading, setIsAuthenticated, setUser } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        axios.get(`${server}/users/me`, {
            withCredentials: true
        }).then((res) => {
            setUser(res.data.user);
            setIsAuthenticated(true);
            setLoading(false);
        }
        ).catch((err) => {
            setUser({});
            setIsAuthenticated(false);
            setLoading(false);
        })

    }, []);

    if (!isAuthenticated) return <Navigate to={"/login"} />

    return (
        loading ? (<Loader />) :
            (<div className='profileContainer'>
                <h1>{user?.name}</h1>
                <p>{user?.email}</p>
            </div>)
    );
};

export default Profile
