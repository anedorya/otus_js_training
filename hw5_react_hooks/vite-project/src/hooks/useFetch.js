import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        let ignore = false;

        setLoading(true);
        setError(null);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })

            .then(result => {
                if (!ignore) {
                    setData(result);
                    setLoading(false);
                    console.log(result)
                }
                
            })
            .catch(error => {
                if (!ignore) {
                    console.error(error);
                    setError(error.message);
                    setLoading(false);
                }
            });
            return () => {
                ignore=true;
            }

    }, [url]);   

    return {data, loading, error}
}
