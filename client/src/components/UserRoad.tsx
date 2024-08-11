import React, { useState } from 'react';
import { TypeRoad } from '../types/Types';
import { deleteRoad } from '../api/api';
import UpdateForm from './UpdateForm';

type TypeProps = {
  road: TypeRoad;
  setUserRoads: any;
};
function UserRoad({ road, setUserRoads }: TypeProps): JSX.Element {
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
  const deleteHandler = async (id: number): Promise<void> => {
    const response = await deleteRoad(id);
    if (response === 'success') {
      setUserRoads((prev: TypeRoad[]) => prev.filter((el) => el.id !== id));
    }
  };
  return (
    <>
      {updateFormVisible ? (
        <UpdateForm
          road={road}
          setUserRoads={setUserRoads}
          setUpdateFormVisible={setUpdateFormVisible}
        />
      ) : (
        <>
          <h6>
            Название: <strong>{road.title}</strong>
          </h6>
          <p>
            Длина маршрута: <strong>{road.length} км</strong>
          </p>
          <button
            className="btn btn-outline-primary btn-sm"
            style={{ marginRight: '10px' }}
            onClick={() => setUpdateFormVisible((prev) => !prev)}
          >
            Изменить
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(road.id)}>
            Удалить
          </button>
        </>
      )}
    </>
  );
}

export default UserRoad;
