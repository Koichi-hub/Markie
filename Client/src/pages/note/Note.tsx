import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Note = () => {
  const navigate = useNavigate();
  const { noteGuid } = useParams();

  useEffect(() => {
    if (!noteGuid) {
      navigate('/main');
    }
  });

  return <div></div>;
};
