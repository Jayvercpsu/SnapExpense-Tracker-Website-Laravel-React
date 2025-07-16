import { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, onFocus, onBlur, value, children, ...props },
    ref
) {
    const inputRef = ref || useRef();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
        if (value) {
            setIsActive(true);
        }
    }, [isFocused, value]);

    const handleFocus = (e) => {
        setIsActive(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
        if (!e.target.value) {
            setIsActive(false);
        }
        if (onBlur) onBlur(e);
    };

    return (
        <div className={`relative w-full max-w-md mx-auto ${className}`}>
            {children(isActive)}
       <input
    {...props}
    value={value}
    type={type}
    onFocus={handleFocus}
    onBlur={handleBlur}
    ref={inputRef}
    className={`
        peer w-full 
        border border-gray-300 rounded bg-transparent
        focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
        placeholder-transparent
        px-2 pt-4 pb-1
        sm:px-3 sm:pt-5 sm:pb-1.5
        md:px-3 md:pt-5 md:pb-2
        text-sm
    `}
/>

        </div>
    );
});
