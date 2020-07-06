import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('password do not match');
    } else {
      console.log('Success');
    }
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Create your account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <div className='form-group'>
          <input
            name='name'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Email Adress'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='password'
            onChange={(e) => onChange(e)}
            value={password}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='confirm password'
            value={password2}
            name='password2'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account ? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
