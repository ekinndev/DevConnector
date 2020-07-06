import React from 'react';
import { Link } from 'react-router-dom';
export const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Create developer profiles/portfolio,share post and much more
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Register
            </Link>
            <Link to='/login' className='btn'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
