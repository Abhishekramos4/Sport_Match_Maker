import React,{useState,useEffect} from 'react';
import NavBarProfile from './NavbarProfile';

function MyAccount()
{
    const [userData,setUserData]=useState({});

    useEffect (()=>{
     
        var token = localStorage.getItem("userToken");
       
        axios.get('http://localhost:5000/profile',{ headers: {
          Authorization : `Bearer ${token}`
      }})
        .then ((res)=>{
          console.log(res.data.userData);
         setUserData({... res.data.userData})
    
        }).catch(err=>{console.log(err);});
    
        },[]
    );


    return(<div>
        <NavbarProfile/>
        
    </div>);

}

export default MyAccount;