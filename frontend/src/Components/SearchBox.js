import React, { useState } from 'react';
import {Form, FormControl} from 'react-bootstrap'

export default function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <Form inline onSubmit={submitHandler}>
      
        <FormControl 
          className="form-control me-2"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></FormControl >
        <button className="btn btn-outline-success" type="submit">
          <i className="fa fa-search"></i>
        </button>
     
    </Form>
  );
}