import React from 'react'

const ProfileTab = ({ id }) => {
  return (
    <div className="w-full bg-white p-4 shadow-md h-max flex items-center gap-x-4">
      <div className='flex items-center justify-between w-full flex-1'>
          <div>
            <h2 className='font-bold'>About Me</h2>
          </div>
      </div>
      <div className='w-[2px] h-full bg-black'>
      </div>
      <div className='flex flex-1 items-end'>
          <div>
              {id}
          </div>
      </div>
    </div>
  )
}

export default ProfileTab