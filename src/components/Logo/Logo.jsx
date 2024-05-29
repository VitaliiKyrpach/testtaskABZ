import svg from "../../img/sprite.svg"
export const Logo = () =>{
    return <svg className='logo'>
    <use href={`${svg}#icon-Logo`}></use>
</svg>
}