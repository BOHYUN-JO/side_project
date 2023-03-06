import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakakoOauth = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      axios
        .post('', {
          code,
        })
        .then((response) => {
          console.log('hi', response);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          navigate('/');
        });
    })();
  }, []);

  return <div>1</div>;
};
export default KakakoOauth;