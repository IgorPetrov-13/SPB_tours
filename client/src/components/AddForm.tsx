import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import type { TypeRoads } from '../types/Types';

type TypeProps = {
  setUserRoads: React.Dispatch<React.SetStateAction<TypeRoads | []>>;
  setAddFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
function AddForm({ setUserRoads, setAddFormVisible }: TypeProps) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      mapLink: '',
      length: 0,
      description: '',
      userId: id,
    },
  });

  const onSubmit = (data) => {
    if (data.title && data.mapLink && data.length && data.description && data.userId) {
      axiosInstance
        .post('/roads', data)
        .then(({ data }) => {
          console.log(data); //!!!
          setUserRoads((prev) => [...prev, data.newRoad]);
          reset();
          setAddFormVisible(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '20px auto' }}>
      <h4>Добавить новый маршрут</h4>

      <label>
        Название маршрута
        <input
          className="form-control"
          {...register('title', {
            required: 'Пожалуйста, напишите название',
            minLength: {
              value: 1,
              message: 'Минимум один символ',
            },
          })}
        />
      </label>
      <br />
      {errors?.title && <div style={{ color: 'red' }}>{errors?.title.message || 'Error'}</div>}

      <label>
        Ссылка на карту
        <input
          className="form-control"
          {...register('mapLink', {
            required: 'Необходима ссылка на карту',
            minLength: {
              value: 1,
              message: 'Минимум один символ',
            },
          })}
        />
      </label>
      <br />
      {errors?.mapLink && <div style={{ color: 'red' }}>{errors?.mapLink.message || 'Error'}</div>}

      <br />
      <label>
        Длина маршрута в км
        <input
          type="number"
          className="form-control"
          {...register('length', {
            required: 'Укажите длину маршрута',
          })}
        />
      </label>
      {errors?.length && <div style={{ color: 'red' }}>{errors?.length.message || 'Error'}</div>}
      <br />
      <label>
        Описание
        <input
          className="form-control"
          {...register('description', {
            required: 'Необходима ссылка на карту',
            minLength: {
              value: 1,
              message: 'Минимум один символ',
            },
            maxLength: {
              value: 1000,
              message: 'Максимум 1000 символов',
            },
          })}
        />
      </label>
      <br />
      {errors?.description && (
        <div style={{ color: 'red' }}>{errors?.description.message || 'Error'}</div>
      )}

      <br />
      <br />
      <input type="submit" disabled={!isValid} />
    </form>
  );
}

export default AddForm;
