import React from 'react'

const Footer = () => {
    const name = "Vaibhav Giriman Gour";
    const currentYear = new Date();
  return (
    <footer className='w-full text-[#ccc] text-center md:text-md h-auto font-thin my-4  mx-auto'>
      <div className='center'>
      <p>Created By {name}</p>
      <p>Copyright © {currentYear.getFullYear()}</p>
      </div>
    </footer>

  )
}

export default Footer
