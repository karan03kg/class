import { useState,useEffect } from 'react'
import './App.css'
import UserInfo from './userInfo';

function App() {
  const [data, setdata] = useState(null);
  let url = "http://localhost:3000/allusers"

  const FetchData = async(url)=>{
    try{
      const res = await fetch(url);
      const json = await res.json();
      setdata(json);
    }
    catch(err){

    }
  }

  useEffect(() => {  
    FetchData(url);
  },[])
  
  console.log(data)

  return (
    <>
      <h1>All Users</h1>
      {data ? data.map((ele)=> <UserInfo
      key={ele.id}
      name = {ele.name}
      email={ele.email}
      password={ele.password}
      imageUrl = {ele.imageUrl}
      /> ): <div>Data is Loading...</div>
    }
    </>
  )
}

export default App
