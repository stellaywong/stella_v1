// import { useState, useEffect } from 'react';

// const SCROLL_UP = 'up';
// const SCROLL_DOWN = 'down';


// const useScrollDirection = ({ initialDirection, thresholdPixels }) => {
//     const [ scrollDirection, setScrollDirection ] = useState(initialDirection);

//     useEffect(() => {
//         const threshold = thresholdPixels || 0;
//         let lastScrollY = window.pageYOffset;
        
//         const updateScrollDirection = () => {
//             const scrollY = window.pageYOffset;

//             if (Math.abs(scrollY - lastScrollY) < threshold) {
//                 return;
//             }

//             setScrollDirection(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
//             lastScrollY = scrollY > 0 ? scrollY : 0;
//         }

//         window.addEventListener('scroll', updateScrollDirection);


//         return () => window.removeEventListener('scroll', updateScrollDirection);
//     }, [initialDirection])

//     return scrollDirection;
// }


// export default useScrollDirection;