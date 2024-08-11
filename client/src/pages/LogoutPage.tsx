import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';
import { TypeUser } from '../types/Types';

/* eslint-disable react/prop-types */
type TypeProps = {
  user: TypeUser | null;
  setUser: React.Dispatch<React.SetStateAction<TypeUser | null>>;
};

function LogoutPage({ user, setUser }: TypeProps): JSX.Element {
  const navigate = useNavigate();

  const logoutUser = () => {
    axiosInstance
      .delete('/auth/logout')
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setUser(null);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h3>Покинуть страницу, {user.name}?</h3>
      <br />
      <button onClick={logoutUser} style={{background:"#fc7b7b"}}>Выход</button>
    </>
  );
}

export default LogoutPage;
