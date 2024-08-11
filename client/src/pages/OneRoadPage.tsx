import React, { useEffect, useState } from 'react';
import type { TypeRoad } from '../types/Types';
import { getOneRoad } from '../api/api';
import { useParams } from 'react-router-dom';

function OneRoadPage(): JSX.Element {
  const [road, setRoad] = useState<TypeRoad>([]);
  const { roadId } = useParams();

  useEffect(() => {
    getOneRoad(Number(roadId))
      .then((data) => setRoad(data.road))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h3>Подробнее о маршруте</h3>
      {road.title ? (
        <div
          className="road-item"
          style={{
            border: '1px solid black',
            maxWidth: '500px',
            margin: '10px auto',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            color: 'black',
          }}
        >
          <h4>{road.title}</h4>
          <iframe src={road.mapLink} width="400" height="400" frameBorder="0"></iframe>
          <p>
            Длина маршрута: <strong>{road.length} км</strong>
          </p>
          <p>{road.description}</p>
        </div>
      ) : (
        <p>Маршрут отсутствует</p>
      )}
    </div>
  );
}

export default OneRoadPage;
