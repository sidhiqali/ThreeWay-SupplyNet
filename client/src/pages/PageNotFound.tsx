import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center p-5 bg-main bg-cover bg-no-repeat w-full">
  <div className="text-center">
    <div className="inline-flex rounded-full p-4">
      <div className="rounded-full stroke-red-800 bg-yellow-600 p-4">
        <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
    <h1 className="mt-5 text-[36px] font-bold text-slate-100 lg:text-[50px]">404 - Page not found</h1>
    <p className="text-slate-300 mt-5 lg:text-lg">The page you are looking for doesn't exist or <br />has been removed.</p>
    <Link to='/'>
    <button className='text-slate-300 my-3 h-12 w-36 hover:bg-yellow-600 hover:text-slate-900  bg-yellow-800 rounded-lg'>Go To Home Page</button>
    </Link>
      </div>
</div>
  )
}

export default PageNotFound