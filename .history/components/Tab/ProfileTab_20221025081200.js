import React from 'react'

const ProfileTab = ({ id }) => {
  return (
    <div className="w-full bg-white p-4 shadow-md h-max flex items-center">
      <div className='flex items-center justify-between w-full'>
          <div>
            <h2 className='font-bold'>About Me</h2>
          </div>
      </div>
      <div className='w-1 h-full bg-black'>
      </div>
      <div>
          <div>
              {id}
          </div>
      </div>
    </div>
  )
}

export default ProfileTab