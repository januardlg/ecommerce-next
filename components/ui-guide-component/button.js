const Button = (props) => {
    const { type, text, icon, onClick } = props

    return (
        <div
            role="button"
            style={{ fontFamily: 'Poppins-Regular' }}
            className={`flex justify-center items-center px-[20px] h-11 rounded-lg cursor-pointer
            ${type == 'primary' ? `bg-[#8A33FD] hover:bg-[#6620C1] active:bg-[#6620C1] text-white` :
                    type == 'disabled' ? 'bg-[#F0F2F2] text-[#807D7E] cursor-not-allowed ' :
                        `border-[1px] border-[#3C4242] hover:bg-[#6620C1] hover:bg-opacity-[3%] active:bg-[#6620C1] active:border-[#8A33FD] active:bg-opacity-[3%] text-[#8A33FD]`
                }`}

            onClick={onClick}
        >
            {icon && <div className="mr-2">{icon}</div>}
            <p>{text}</p>
        </div>
    )
}

export default Button