import React from 'react'

const InfoCard = ({label, value, color}) => {
  return (
    <div className='flex items-center gap-3 p-4 mb-4'>
      <div className={`w-2 md:w-2 mr-5 h-3 md:h-5 ${color} rounded-full`}>

        <p className='text-xs md:text-[14px] text-gray-500 ml-3'>
            <span className='text-sm md:text-[15px] text-black font-semibold mr-1'>{value}</span>{label}
        </p>
      </div>
    </div>
  )
}

export default InfoCard
