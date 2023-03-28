import React from 'react'

export default function CountBox({ title, value }) {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="text-[30px] p-3 bg-[var(--color-black2)] font-semibold rounded-t-[10px] w-full text-center">
        {value}
      </h4>
      <p className="text-[16px] text-[var(--color-grey)] bg-[var(--color-grey4)] px-3 py-2 w-full rounded-b-[10px] text-center">
        {title}
      </p>
    </div>
  )
}
