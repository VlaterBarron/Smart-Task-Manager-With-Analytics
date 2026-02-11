import type { IInput } from "../types/input"

export const Input = ({title, type, placeholder, value, onChange, extraClasses, inputError}:IInput) => {


    return (
       <div className={`flex flex-col gap-2 ${extraClasses}`}>
           <h2>{title}</h2>
           <div>
                <input 
                    type={type} 
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <div>
                {inputError && <span className="text-red-500">{inputError}</span>}
            </div>
       </div> 
    )

}