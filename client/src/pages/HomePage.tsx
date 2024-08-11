import React from 'react';
import type { TypeUser } from '../types/Types';

type TypeProps = {
  user: TypeUser | null;
};

function HomePage({ user }: TypeProps): JSX.Element {
  return (
    <div>
      <h3 style={{ margin: '15px auto', textAlign: 'center' }}>
        Привет, {user ? user.name : 'Гость'}{' '}
      </h3>
      <p>На сайт, где ты найдешь самые интересные маршруты по Санкт-Петербургу</p>
      <a href="/roads" style={{ textAlign: 'center' }}>
        Найти свой маршрут
      </a>
      <div style={{ maxWidth: '500px', margin: '10px auto' }}>
        <img
          style={{ width: '100%' }}
          src="https://spbcult.ru/upload/medialibrary/08b/h2pshez63l41dc1p6a8jzs7z815mcfnt.jpg"
          alt="Санкт-Петербург"
        />
      </div>
    </div>
  );
}

export default HomePage;
