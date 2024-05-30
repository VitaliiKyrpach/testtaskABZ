import { useEffect } from "react";
import { getData } from "../../services/api";
import { Container } from "../Container/Container"
import { useState } from "react";
import { CatalogList } from "../CatalogList/CatalogList";
import { Button } from "../Button/Button";


export const Catalog = () =>{
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    useEffect(()=>{
        const fetch = async() =>{
            const data = await getData(page);
            console.log(data)
            page == 1 ? setUsers(data.data.users) : setUsers(prev=> [...prev, ...data.data.users])
            setTotalPages(data.data.total_pages)
        }
        fetch();
    },[page])
    console.log(users)
    const handlePagination = () =>{
        setPage(prev => prev + 1)
    }
    return <section id='users' className="catalog">
        <Container>
        <h2 className="title">Working with GET request</h2>
        <CatalogList data={users}/>
        {page < totalPages && <Button type='pagination' action={handlePagination}>Show more</Button>}
        </Container>
        </section>
}