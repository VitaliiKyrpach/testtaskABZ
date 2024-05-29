import { Container } from "../Container/Container"
import { Logo } from "../Logo/Logo"
import { UserNav } from "../UserNav/UserNav"

export const Header = () =>{
 return <Container>
     <section className="header">
        <Logo/>
        <UserNav/>
     </section>
 </Container>
}