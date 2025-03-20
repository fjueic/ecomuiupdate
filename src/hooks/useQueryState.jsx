import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

function useQueryState(key, defaultValue) {
    const [searchParams, setSearchParams] = useSearchParams();
    const paramValue = searchParams.get(key) || defaultValue;
    const [state, setState] = useState(paramValue);

    useEffect(() => {
        setState(paramValue);
    }, [paramValue]);

    const setQueryState = useCallback(
        (value) => {
            setState(value);
            const newParams = new URLSearchParams(searchParams);
            if (value) {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
            setSearchParams(newParams, { replace: true }); // Avoids history clutter
        },
        [key, searchParams, setSearchParams]
    );

    return [state, setQueryState];
}

export default useQueryState;
