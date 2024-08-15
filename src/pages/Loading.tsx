import { useContext, useEffect } from "react";
import FetchData from "../components/FetchData";
import { LoadingContext } from "../Context/context";

const Loading = () => {
    const loadingData = useContext(LoadingContext);

    useEffect(() => {
        setTimeout(() => {
            loadingData?.setLoading(false)
        }, 1000)
    }, [])


    return (
        <FetchData />
    );
}

export default Loading;