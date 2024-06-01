import { useEffect } from "react";
import { Container } from "../Container/Container";
import { CatalogList } from "../CatalogList/CatalogList";
import { Button } from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  selectTotal,
  selectUsers,
} from "../../redux/catalogSelectors";
import { fetchUsers } from "../../redux/catalogOperations";
import { handlePage } from "../../redux/catalogSlice";

export const Catalog = () => {
  const users = useSelector(selectUsers);
  const totalPages = useSelector(selectTotal);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);
  const handlePagination = () => {
    dispatch(handlePage(page + 1));
  };
  return (
    <section id="users" className="catalog">
      <Container>
        <h2 className="title">Working with GET request</h2>
        <CatalogList data={users} />
        {page < totalPages && (
          <Button type="pagination" action={handlePagination}>
            Show more
          </Button>
        )}
      </Container>
    </section>
  );
};
