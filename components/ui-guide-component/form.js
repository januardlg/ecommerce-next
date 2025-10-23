import React from "react"
// import const
import { FONT_FAMILY } from "@/Consants/FontFamily"
import WarningForm from "./warning-form"

const InputForm = (props) => {

    const { id, name, value, label, placeholder, isRequired, onChange, warningEmpty } = props

    return (
        <div className={`text-black h-25`} style={{ fontFamily: FONT_FAMILY.POPPINS_REGULAR }}>
            <label data-testid='label' className={`flex`} htmlFor={id}>{label}<span>{isRequired && <p data-testid="required">*</p>}</span></label>

            <input autoComplete="off" type="text" name={name} id={id} value={value} placeholder={placeholder} onChange={onChange}
                className={`block w-full h-[49px] rounded-lg bg-[#F6F6F6] px-4 mt-[10px] text-sm
                hover:bg-[#F3F9FB] hover:outline-none
                focus:bg-[#F3F9FB] focus:outline-none `}
            />
            {warningEmpty &&
                <WarningForm inputLabel={label} warningEmpty={warningEmpty} />
            }
        </div>
    )
}

export default InputForm