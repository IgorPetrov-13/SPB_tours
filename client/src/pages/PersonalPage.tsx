import React, { useEffect, useState } from 'react';
import type { TypeUser, TypeRoads } from '../types/Types';
import axiosInstance from '../../services/axiosInstance';
import { useParams } from 'react-router-dom';
import AddForm from '../components/AddForm';
import { getAllUserRoads } from '../api/api';
import UserRoad from '../components/UserRoad';

type PropsType = {
  user: TypeUser;
};

function PersonalPage({ user }: PropsType): JSX.Element {
  const [userRoads, setUserRoads] = useState<TypeRoads | []>([]);
  const [addFormVisible, setAddFormVisible] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    getAllUserRoads(Number(id))
      .then((data) => setUserRoads(data.roads))
      .catch(console.error);
  }, []);

  return (
    <>
      {user ? (
        <div style={{ margin: '0 auto' }}>
          <h3>Личный кабинет пользователя {user.name}</h3>
          <h5>Ваши маршруты:</h5>
          {userRoads.length ? (
            userRoads.map((road) => (
              <div
                key={road.id}
                style={{
                  padding: '15px ',
                  width: '400px',
                  margin: '10px auto',
                  border: '1px solid black',
                  borderRadius: '10px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <UserRoad road={road} setUserRoads={setUserRoads} />
              </div>
            ))
          ) : (
            <p>Маршруты отсутствуют</p>
          )}
        </div>
      ) : (
        <p>загрузка</p>
      )}
      <button
        onClick={() => setAddFormVisible(!addFormVisible)}
        style={{ margin: '10px 0' }}
        className="btn-outline-success btn"
      >
        Добавить новый маршрут
      </button>
      {addFormVisible && (
        <AddForm setUserRoads={setUserRoads} setAddFormVisible={setAddFormVisible} />
      )}
    </>
  );
}

export default PersonalPage;
