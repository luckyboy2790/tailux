// Import Dependencies
import { useState } from "react";

// ----------------------------------------------------------------------

export function useUncontrolled({
    value,
    defaultValue,
    finalValue,
    onChange = () => { },
}) {
    const [uncontrolledValue, setUncontrolledValue] = useState(
        defaultValue !== undefined ? defaultValue : finalValue
    );

    const handleUncontrolledChange = (val) => {
        setUncontrolledValue(val);
        onChange?.(val);
    };

    if (value !== undefined) {
        return [value, onChange, true];
    }

    return [uncontrolledValue, handleUncontrolledChange, false];
}
