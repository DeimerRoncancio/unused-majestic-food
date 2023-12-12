import { useState } from 'react'

export default function Button({textContent,bgColor,bgColorHover,
padding,width,textColor,textWidth,lineHeight,handleClick}) {
    const [hover,setHover] = useState(false)
    
    const handleMouse = ()=> {
        setHover(!hover)
    }

    const backgroundColor = !hover ? `${bgColor}` : `${bgColorHover}`
    
    return (
        <button className="transition duration-[0.3s] p-2 rounded-full shadow-[0_2px_4px_#a9a9a9]"
        style={{
            width: `${width}`,
            backgroundColor: backgroundColor,
            color: `${textColor}`,
            padding: `${padding}`,
            fontSize: `${textWidth}`,
            lineHeight: `${lineHeight}`
        }}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
        onClick={handleClick}>
            {textContent}
        </button>
    )
}