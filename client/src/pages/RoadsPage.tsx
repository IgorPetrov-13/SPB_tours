import React, { useEffect, useState } from 'react';
import { TypeRoads } from '../types/Types';
import { getAllRoads } from '../api/api';
import { Link } from 'react-router-dom';

function RoadsPage(): JSX.Element {
  const [roads, setRoads] = useState<TypeRoads | []>([]);

  useEffect(() => {
    getAllRoads()
      .then((data) => setRoads(data.roads))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h3>Доступные маршруты</h3>
      {roads.length ? (
        roads.map((road) => (
          <Link to={`/roads/${road.id}`} key={road.id} style={{ textDecoration: 'none' }}>
            <div
              className="road-item"
              style={{
                border: '1px solid black',
                maxWidth: '400px',
                margin: '10px auto',
                borderRadius: '10px',
                backgroundColor: '#f5f5f5',
                padding: '10px',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <h4>{road.title}</h4>
              <div style={{ width: '300px', height: '300px' }}>
                <iframe src={road.mapLink} width="300" height="300" frameBorder="0"></iframe>
              </div>
              <p>
                Длина маршрута: <strong>{road.length} км</strong>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>Маршруты отсутствуют</p>
      )}
    </div>
  );
}

export default RoadsPage;
