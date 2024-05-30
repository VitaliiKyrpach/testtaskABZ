import { CatalogCard } from "../CatalogCard/CatalogCard"

export const CatalogList = ({data}) =>{
    return <ul className="list">
        {data && data.map(card =>{
            return <CatalogCard key={card.id} user={card}/>
        })}
    </ul>
}