import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                console.log("Fetching data for URL:", url);
                console.log("Using token:", token);

                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const result = await res.json(); 

                console.log("Response data:", result);

                if (!res.ok) {
                    throw new Error(result.message || "Something went wrong");
                }

                setData(result.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setLoading(false);
                setError("Failed to fetch data. Please try again later.");
            }
        };

        fetchData();
    }, [url, token]); 

    return {
        data,
        loading,
        error,
    };
};

export default useFetchData;
