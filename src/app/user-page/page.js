// app/user/page.js
'use client'
import React, {useEffect} from 'react';
import axios from 'axios';


const UserPage = () => {
  //  useEffect(() => {
  //   async function fetchData(){
  //     const request = await axios.get('https://unihub-86y9.onrender.com/')
  //     console.log(request)
  //   }
  //   fetchData()
  //  }, [])
    

     

    return (
        <div className="p-40">
          <h1 className="p-24 text-4xl font-semibold dark:text-[#C8ACD6]">User Page</h1>
        </div>
    );
};

export default UserPage;
