import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';  
import { useSelector, useDispatch } from 'react-redux';
import { listUsers } from '../actions/userAction';








 function UsersScreen(props) {
  const [search, setSearch] = useState('');
  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList; 
  const dispatch = useDispatch();



  useEffect(() => {
    
    dispatch(listUsers());
   
    return () => {
    
    };
  }, [])

  
      return(   

       
        loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          
          <div className="product-list">

          <table className="table">
              <thead>
                  <tr>
                      <th>Image</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Roles</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user) => (
                      <tr key={user._id}>
                          <img src={user.image} />
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.roles}</td>
                          <td>{user.brand}</td>
                      </tr>
                  ))}

              </tbody>
          </table>

      </div>
        
        
      ) 
       ) }
       
  


 


  


    
export default UsersScreen;