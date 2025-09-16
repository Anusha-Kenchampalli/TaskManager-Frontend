import React from 'react'
// import UI_IMG from "../../../public/UI_IMG"

function AuthLayout({children}) {
  return (
    <>
    <div className='bg-[url("https://res.cloudinary.com/dzpcirnqq/image/upload/v1755964377/Screenshot_2025-08-23_212149_dqzkdw.png")] md:bg-[url("https://res.cloudinary.com/dzpcirnqq/image/upload/v1757758725/Gemini_Generated_Image_lyu4iilyu4iilyu4_mprrr4.png")] md:flex h-screen items-center justify-center bg-cover bg-no-repeat bg-center overflow-hidden p-8'>
        <div className='w-screen h-screen md:w-[60vw] md:mr-[600px] px-12 pt-8 pb-12'>
            <h2 className='text-2xl font-medium text-black'>Task Manager</h2>
            {children}
        </div>
    

        {/* <div className='hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8'>
            <img src= "https://res.cloudinary.com/dzpcirnqq/image/upload/v1757757972/ChatGPT_Image_Sep_13_2025_03_35_12_PM_aiwylk.png" className='w-64 lg:w-[90%]'/>
        </div> */}


    </div>
    </>
  )
}

export default AuthLayout
