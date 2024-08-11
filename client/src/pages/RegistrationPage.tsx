import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import type { TypeRegistration, TypeUser } from '../types/Types';

type TypeProps = {
  setUser: React.Dispatch<React.SetStateAction<TypeUser | null>>;
};

function RegistrationPage({ setUser }: TypeProps): JSX.Element {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TypeRegistration>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data: TypeRegistration) => {
    if (data.confirm === data.password) {
      axiosInstance
        .post('/auth/registration', data)
        .then(({ data }) => {
          setAccessToken(data.accessToken);
          setUser(data.user);
          navigate('/');
        })
        .catch(() => {
          setError('Не верный email или пароль');
        });
    } else {
      setError('Пароли не совпадают');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>
        <label>
          Ваше имя
          <input
            className="form-control"
            {...register('name', {
              required: 'Введите имя',
              minLength: {
                value: 3,
                message: 'Минимум три символа',
              },
            })}
          />
        </label>
        <br />
        {errors?.name && <div style={{ color: 'red' }}>{errors?.name.message || 'Error'}</div>}
        <label>
          Ваш email
          <input
            className="form-control"
            {...register('email', {
              required: 'Введите email',
              minLength: {
                value: 4,
                message: 'Минимум четыре символа',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Некорректный email',
              },
            })}
          />
        </label>
        {errors?.email && <div style={{ color: 'red' }}>{errors?.email.message || 'Error'}</div>}
        <br />
        <label>
          Пароль
          <input
            className="form-control"
            type="password"
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: 3,
                message: 'Минимум три символа',
              },
            })}
          />
        </label>
        <br />
        {errors?.password && (
          <div style={{ color: 'red' }}>{errors?.password.message || 'Error'}</div>
        )}
        <label>
          Повторите пароль
          <input
            className="form-control"
            type="password"
            {...register('confirm', {
              required: 'Повторите пароль',
              minLength: {
                value: 3,
                message: 'Минимум три символа',
              },
            })}
          />
        </label>
        {errors?.confirm && (
          <div style={{ color: 'red' }}>{errors?.confirm.message || 'Error'}</div>
        )}
      
         <br />
        <input type="submit" disabled={!isValid} style={{marginTop: '10px'}} />
        <br />
        {error && <h5 style={{ color: 'red' }}>{error}</h5>}
      </form>
    </>
  );
}

export default RegistrationPage;
