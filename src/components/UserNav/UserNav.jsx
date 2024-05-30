import { Button } from "../Button/Button"
export const UserNav = () =>{
    return <div className="userNav">
        <Button type='link' anchor='users'>Users</Button>
        <Button type='link' anchor='register'>Sign up</Button>
    </div>
}