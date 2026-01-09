import { useState, useEffect } from 'react';

// Custom hook to track mouse position - manually implemented for better control
// Added this to give sections a subtle interactive parallax effect.
const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return position;
};

export default useMousePosition;
