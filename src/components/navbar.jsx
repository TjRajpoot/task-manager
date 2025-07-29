import React from 'react'
const navbar = () => {
  return (
    <nav className="flex justify-between bg-purple-200 py-3 rounded-xl">
        <div className='flex justify-end gap-8 mx-4'>
            <div className="logo">
            <span className='font-bold'>Task Manager</span>
        </div>
        <div>|</div>
        <ul className="flex gap-5">
            <li className="cursor-pointer hover:text-blue-600">Home</li>
            <li className="cursor-pointer hover:text-blue-600 hover:text-xl transition-all duration-200">Contact</li>
        </ul>
        </div>
    </nav>
  )
}

export default navbar
