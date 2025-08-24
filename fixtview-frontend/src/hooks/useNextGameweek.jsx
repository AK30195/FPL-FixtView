import { useEffect, useState } from 'react';
import { getNextGameweek } from '../features/fixturesAPI';


export function useNextGameweek() {
    const [nextGW, setNextGW] = useState();
    useEffect(() => {
        async function fetchGW() {
            try {
                const nextGW = await getNextGameweek();
                setNextGW(nextGW);
            } catch(e) {
                console.log('Error fetching data: ' + e)
            }
        }
        fetchGW();
    }, []);
    
    return(nextGW);
}
