import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import type { TypeUser, TypeAuth } from '../types/Types';

type TypeProps = {
  setUser: React.Dispatch<React.SetStateAction<TypeUser | null>>;
};
function AuthorizationPage({ setUser }: TypeProps): JSX.Element {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TypeAuth>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();

  const onSubmit = (data: { email: string; password: string }) => {
    axiosInstance
      .post('/auth/authorization', data)
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setUser(data.user);
        navigate('/');
      })
      .catch(() => {
        setError('Не верный email или пароль');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Вход</h2>

      <label>
        Email
        <input
          className="form-control"
          {...register('email', {
            required: 'Введите email',
            minLength: {
              value: 4,
              message: 'Минимум 4 символа',
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email',
            },
          })}
        />
      </label>
      <br />
      {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}

      <label>
        Пароль
        <input
          className="form-control"
          type="password"
          {...register('password', {
            required: 'Enter password',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          })}
        />
      </label>

      <br />
      {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
      <br />

      {error && <h5 style={{ color: 'red' }}>{error}</h5>}
      <input type="submit" disabled={!isValid} />
      <br />
    </form>
  );
}

export default AuthorizationPage;
