import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='flex bg-main bg-cover items-center justify-center py-3 bg-zinc-900'>
       <div className='flex justify-center items-center w-36'>
          <Link to='/'>
            <div className='text-2xl font-bold text-slate-600 '>SupplyNet</div>
          </Link>
        </div>
      <span className='text-md font-semibold text-slate-500'>copyright @ALi</span>
    </div>
  )
}

export default Footer