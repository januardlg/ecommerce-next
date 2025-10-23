import { FONT_FAMILY } from "@/Consants/FontFamily"

export const WarningForm = (props) => {

    const { inputLabel, warningEmpty } = props

    return (
        <div data-testid="footnote" style={{ fontFamily: FONT_FAMILY.POPPINS_ITALIC }} className="text-rose-800 text-xs mt-1 pl-2 h-5">
            *{inputLabel}  is required
        </div>
    )
}

export default WarningForm