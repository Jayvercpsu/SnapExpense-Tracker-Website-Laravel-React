export default function InputLabel({
    htmlFor,
    value,
    isFocusedOrFilled,
    className = '',
    ...props
}) {
    return (
        <label
            htmlFor={htmlFor}
            {...props}
            className={
                `
                absolute 
                left-2 sm:left-3 md:left-3 
                px-1 bg-white 
                transition-all duration-200 ease-in-out
                pointer-events-none 
                ${isFocusedOrFilled
                    ? 'text-xs -top-2 text-indigo-500 font-medium'
                    : 'text-sm top-2.5 text-gray-500'
                } 
                ` + className
            }
        >
            {value}
        </label>
    );
}
