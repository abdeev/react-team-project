import React from 'react';
import {Puff} from 'react-loader-spinner';

function Loader () {
    return (
      <Puff
        type="Puff"
        color="#4a56e2"
        height={300}
        width={300}
        timeout={3000} 
      />
    );
  }

  export default Loader;
