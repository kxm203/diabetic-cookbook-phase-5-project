import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsLoggingOut(true);

        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credientials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to log out');
            }

            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
            setIsLoggingOut(false);
        }
    };

    return (
        <button onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
    );
}

export default Logout;