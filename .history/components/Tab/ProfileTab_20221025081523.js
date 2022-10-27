import React from 'react'

const ProfileTab = ({ id }) => {
  return (
    <div className="w-full bg-white p-4 shadow-md h-max flex items-center gap-x-4">
      <div className='flex items-center w-full '>
          <div className='flex flex-col'>
            <h2 className='font-bold'>About Me</h2>

            <div>
                {id}
            </div>
          </div>
      </div>
    </div>
  )
}

export default ProfileTab