export default function Button({textContent,bgColor,bgColorHover,width,textColor,handleClick}) {
    return (
        <button className={`bg-${bgColor} transition duration-[0.3s] hover:bg-${bgColorHover} 
        w-${width} p-2 text-xl rounded-full shadow-[0_2px_4px_#a9a9a9] text-${textColor}`} 
        onClick={handleClick}>
            {textContent}
        </button>
    )
}
