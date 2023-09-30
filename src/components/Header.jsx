import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${server}/users/logout`,
                {
                    withCredentials: true,
                }
            );

            toast.success(data.message);
            setIsAuthenticated(false);
            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
    };

    return (
        <nav className='header'>
            <div>
                <h2>ToDo App.</h2>
            </div>
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {
                    isAuthenticated ? (<button disabled={loading} onClick={logoutHandler} className='btn'>Log Out</button>)
                        : (<Link to={"/login"}>Login</Link>)
                }

            </article>
        </nav>
    )
}

export default Header
