// import reactLogo from './assets/react.svg'

import { Catalog } from "./Catalog/Catalog"
import { Form } from "./Form/Form"
import { Header } from "./Header/Header"
import { Hero } from "./Hero/Hero"


export const App = () => {
  return <>
  <Header/>
  <Hero/>
  <Catalog/>
  <Form/>
  </>
}

