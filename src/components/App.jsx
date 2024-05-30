// import reactLogo from './assets/react.svg'

import { Catalog } from "./Catalog/Catalog"
import { Register } from "./Register/Register"
import { Header } from "./Header/Header"
import { Hero } from "./Hero/Hero"


export const App = () => {
  return <>
  <Header/>
  <main>
     <Hero/>
     <Catalog/>
     <Register/>
  </main>
  </>
}

