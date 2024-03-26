import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './pages/RootLayout';
import Team from './pages/Team';
import { useEffect, useState } from 'react';




function App() {
  // States
  const [obj, setObj] = useState({});
  const [team, setTeam] = useState([]);
  const [available, setAvailable] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(null);

  // fetching Users
  useEffect(() => {
    const fetchUsers = async () => {
      let url = `?page=${page}`;
      if (domain) url += `&domain=${encodeURIComponent(domain)}`;
      if (gender) url += `&gender=${encodeURIComponent(gender)}`;
      if(search) url += `&search=${encodeURIComponent(search)}`
      if (available !== null) url += `&available=${available}`;


      const response = await fetch('https://heliverse-backend-4444.vercel.app/api/users' + url);
      const json = await response.json();

      if (response.ok) {
        setObj(json);
      }
    }

    fetchUsers();
  },[domain, gender, available, page, search]);



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout setSearch={setSearch}/>}>
        <Route index element={
          <Home 
            users={obj!==null? obj.userArr: []} 
            limit={obj!==null? obj.limit: 15}
            total={obj!==null? obj.total: 0}
            page={page}
            setPage={setPage}
            domain={domain}
            gender={gender}
            available={available}
            setDomain={setDomain}
            setGender={setGender}
            setAvailable={setAvailable}
          />} 
        />
        <Route path="team" element={<Team />} />
      </Route>
    )
  );





  return (
    <RouterProvider router={router} />
  );
}

export default App;
