import svg from "../../img/sprite.svg"
export const Logo = () =>{
    return <a className='logo' href="#"><svg>
    <use href={`${svg}#icon-Logo`}></use>
    </svg></a>   
}