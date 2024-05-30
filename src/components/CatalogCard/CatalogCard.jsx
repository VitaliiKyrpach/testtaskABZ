import svg from '../../img/sprite.svg'
export const CatalogCard = ({ user }) => {
    const { name, position, email, phone, photo } = user;
        return <li className="card">
            {photo.includes('placeholder') ? <svg className="photo">
                <use href={`${svg}#icon-photo-cover`}></use>
            </svg> : <img className="photo" src={photo} alt="avatar" />
            }
    <h3 className="name">{name}</h3>
    <p className="text">{position}</p>
    <p className="text">{email}</p>
    <p className="text">{phone}</p>
    </li>
}