import Pagination from '@mui/material/Pagination';


const PageNavigation = ({page, limit, total, setPage}) => {
  const totalPages = Math.ceil(total / limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <> 
    {
      totalPages>1 && <Pagination count={totalPages} page={page} onChange={handleChange}/>
    }
    </>
  )
}
export default PageNavigation