import { getAlbumByAlbumId } from "./albumServices";

export async function getUserById(id: number) {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUsers() {
  const url = `https://jsonplaceholder.typicode.com/users`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();

    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUsersByAlbumId(albumId: number) {
  const album = await getAlbumByAlbumId(albumId);
  const url = `https://jsonplaceholder.typicode.com/users/${album.userId}`;
  
  try {
    const response = await fetch(url);
    const user = await response.json();

    return user;
  } catch (error) {
    throw error;
  }
}
