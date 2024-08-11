import React from 'react';
import { useForm } from 'react-hook-form';
import type { TypeRoad, TypeRoads } from '../types/Types';
import { updateRoad } from '../api/api';
import { useParams } from 'react-router-dom';

type TypeProps = {
  road: TypeRoad;
  setUserRoads: React.Dispatch<React.SetStateAction<TypeRoads | []>>;
  setUpdateFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
function UpdateForm({ setUserRoads, setUpdateFormVisible, road }: TypeProps) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: road.title,
      mapLink: road.mapLink,
      length: road.length,
      description: road.description,
      userId: Number(id),
    },
  });

  const updateHandler = async (id: number, data: TypeRoad): Promise<void> => {
    const response = await updateRoad(id, data);
    if (response.message === 'success') {
      setUserRoads((prev: TypeRoad[]) =>
        prev.map((el) => (el.id === road.id ? { ...el, ...data } : el)),
      );
    }
  };

  const onSubmit = async (data) => {
    if (data.title && data.mapLink && data.length && data.description && data.userId) {
      await updateHandler(road.id, data);
      setUpdateFormVisible((prev) => !prev);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '20px auto' }}>
      <h4>Изменить маршрут</h4>

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

export default UpdateForm;
