import { Container } from "../Container/Container"
import { Logo } from "../Logo/Logo"
import { UserNav } from "../UserNav/UserNav"

export const Header = () =>{
 return <header className="header">
    <Container>
        <section className="cover">
           <Logo/>
           <UserNav/>
        </section>
    </Container>
 </header>
}