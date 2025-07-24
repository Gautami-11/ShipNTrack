import React from 'react'

const Footer = () => {
  return (
   <div  >
      <footer className="bg-black textwhite py-10  bottom-0 z-50 w-full rounded-t-4xl">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
  
    <div>
      <h3 className="font-semibold text-white mb-3">Contact Us</h3>
      <address className="not-italic text-white text-sm space-y-2">
        <p>123 Business Rd, Suite 100</p>
        <p>Cityville, ST 12345</p>
        <p>
          <a href="tel:+1234567890" className="hover:text-blue-600 hover:underline text-white">Phone: (123) 456-7890</a>
        </p>
        <p>
          <a href="mailto:info@yourcompany.com" className="hover:text-blue-600 hover:underline text-white">Email: shipNtrack@.com</a>
        </p>
      </address>
    </div>
    <div>
      <h3 className="font-semibold text-white-800 mb-3">Office Hours</h3>
      <p className="text-sm text-white">Monday - Friday: 9am - 5pm</p>
      <p className="text-sm text-white">Saturday: 10am - 2pm</p>
      <p className="text-sm text-white">Sunday: Closed</p>
    </div>
  </div>
   <div className="mt-10 pt-6 border-t border-gray-300 text-center text-sm text-white">
      © 2025 shipNTrack. All rights reserved.
    </div>
</footer>
    </div>
  )
}

export default Footer

// import React from 'react'

// const Footer = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Footer
