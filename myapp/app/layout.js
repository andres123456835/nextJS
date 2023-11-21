
/*Ejemplo <a href="/about">About</a> -> <Link href="/about">About</Link> */

import Link from 'next/link'
import Navbar from '../components/navbar';
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
