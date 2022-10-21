import { useState } from "react";

interface Result<T> {
    value: T;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
        key: string
    ) => void;
}

const useInput = <T>(initialState: T): Result<T> => {
    const [value, setValue] = useState(initialState);

    const onChange: Result<T>["onChange"] = (e, key) => {
        if (typeof e === "string") {
            setValue((value) => ({ ...value, [key]: e }));
        } else {
            setValue((value) => ({
                ...value,
                [e.target.name]: e.target.value,
            }));
        }
    };

    return {
        value,
        onChange,
    };
};

export default useInput;
