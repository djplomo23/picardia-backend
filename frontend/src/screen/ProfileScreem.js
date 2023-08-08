import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile, signout } from '../actions/userAction';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

import Card from '../Components/card'

import '../assets/css/style.css'
import { Link } from 'react-router-dom';

export default function ProfileScreen() {





  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [username, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
};



  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setApellido(user.apellido)
      setuserName(user.username);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  return (
   

    <div>
      <div className="container">
        <div className="main-body">
        {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (


          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                    <div className="mt-3">
                      <h4>{username}</h4>

                      <button className="btn btn-outline-primary" href="#signout"  onClick={signoutHandler}>Sign Out</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3 ">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-center align-items-center flex-wrap">
                    <h6 className="mb-0 "><Link to='/orderhistory'>
                      Historial de pedidos</Link></h6>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Nombre Completo</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {`${name ? name : ''} ${apellido ? apellido : ''}`}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Telefono</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (829) 296-1272
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Dirección</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>

  );
}