import React from 'react'

const ProfileTab = ({ id }) => {
  return (
    <div className="w-full bg-white p-4 shadow-md h-max flex items-center">
      <div className='flex items-center justify-between w-full flex-1'>
          <div>
            <h2 className='font-bold'>About Me</h2>
          </div>
      </div>
      <div className='w-1 h-full bg-black flex-1'>
      </div>
      <div className='flex-1'>
          <div>
              {id}
          </div>
      </div>
    </div>
  )
}

export default ProfileTab