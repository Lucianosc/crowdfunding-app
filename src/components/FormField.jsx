import React from 'react'

export default function FormField({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  isTextArea,
}) {
  return (
    <label className="flex flex-col flex-1 w-full ">
      {labelName && (
        <span className=" font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          rows="10"
          className="py-[15px] sm:px-[25px] sm:min-w-[300px] px-[15px] outline-none border-[1px]
         border-[#3a3a43] bg-transparent  text-[14px] placeholder:text-[#4b5264] 
         rounded-[10px]"
        ></textarea>
      ) : (
        <input
          required
          value={value}
          placeholder={placeholder}
          type={inputType}
          onChange={handleChange}
          step="0.1"
          className="py-[15px] sm:px-[25px] sm:min-w-[300px] px-[15px] outline-none border-[1px]
           border-[#3a3a43] bg-transparent  text-[14px] placeholder:text-[#4b5264] 
           rounded-[10px]"
        ></input>
      )}
    </label>
  )
}
