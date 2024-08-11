import axiosInstance from '../../services/axiosInstance';
import type { TypeRoads, TypeRoad } from '../types/Types';

export async function getAllRoads(): Promise<{ message: string; roads: TypeRoads }> {
  const { data } = await axiosInstance.get<{ message: string; roads: TypeRoads }>('/roads');
  return data;
}
export async function getAllUserRoads(id: number): Promise<{ message: string; roads: TypeRoads }> {
  const { data } = await axiosInstance.get<{ message: string; roads: TypeRoads }>(`/users/${id}`);
  return data;
}

export async function getOneRoad(id: number): Promise<{ message: string; road: TypeRoad }> {
  const { data } = await axiosInstance.get<{ message: string; road: TypeRoad }>(`/roads/${id}`);
  return data;
}

export async function deleteRoad(id: number): Promise<string> {
  const { data } = await axiosInstance.delete<{ message: string }>(`/roads/${id}`);
  return data.message;
}

export async function createRoad(road: TypeRoad): Promise<{ message: string; newRoad: TypeRoad }> {
  const { data } = await axiosInstance.post<{ message: string; newRoad: TypeRoad }>('/roads', road);
  return data;
}

export async function updateRoad(
  id: number,
  road: TypeRoad,
): Promise<{ message: string; updatedRoad: TypeRoad }> {
  const { data } = await axiosInstance.put<{ message: string; updatedRoad: TypeRoad }>(
    `/roads/${id}`,
    road,
  );
  return data;
}
