import React from 'react'
import { Header } from '../Componenets/Header'
import { Footer } from '../Componenets/Footer'
import './MainPage.css'

export const MainPage = () => {
  return (
    <div>
      <Header />
      <section className='contribute-section'>
        <p>
          For those who wish to contribute to Military Documentation Please attach documentation Here
        </p>
        <button className='upload-button'>Attach Documentation</button>
      </section>

      <Footer />
    </div>
  )
}
