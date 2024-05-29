// import { Button } from "../Button/Button"
import { Container } from "../Container/Container"
export const Hero = () => {
    return <section className="hero">
        <Container>
            <div className="heroCover">
                <h1 className="hero-title">Test assignment for front-end developer</h1>
                <p className="hero-text">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                <a className="button" href="#register">Sign up</a>
                {/* <Button>Sign up</Button> */}
            </div>
        </Container>
    </section>
}