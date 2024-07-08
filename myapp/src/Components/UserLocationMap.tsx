import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UserLocationMap: React.FC = () => {
    const [location, setLocation] = useState<{ latitude: number | undefined, longitude: number | undefined }>({ latitude: undefined, longitude: undefined });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (location.latitude !== undefined && location.longitude !== undefined) {
            Cookies.set('userLocation', JSON.stringify(location), { expires: 7 }); //7 zile
        }
    }, [location]);

    return (
        <div>
           
        </div>
    );
};

export default UserLocationMap;
