import React from 'react'

import Navbar from './Navbar/Navbar'

/**
 * レイアウトコンポーネント
 * Navbarを表示する
 * @param children
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
