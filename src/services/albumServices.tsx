import type { Album } from "../types/albums";
import type { Photo } from "../types/photos";
import { getUserById } from "./userServices";

export async function getAlbums() {
  const url = `https://jsonplaceholder.typicode.com/albums`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const albums: Album[] = await response.json();

    const userCache: { [key: number]: string } = {};

    const albumsWithUserNames = await Promise.all(
      albums.map(async (album) => {
        if (!userCache[album.userId]) {
          const user = await getUserById(album.userId);
          userCache[album.userId] = user?.name || "Unknown User";
        }

        return {
          ...album,
          name: userCache[album.userId],
        };
      })
    );

    return albumsWithUserNames;
  } catch (error) {
    throw error;
  }
}

export async function getAlbumsByUserId(userId: number) {
  const params = new URLSearchParams({ userId: userId.toString() });
  const url = `https://jsonplaceholder.typicode.com/albums?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const albums: Album[] = await response.json();

    return albums;
  } catch (error) {
    throw error;
  }
}

export async function getAlbumByAlbumId(albumId: number) {
  const url = `https://jsonplaceholder.typicode.com/albums/${albumId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const album: Album = await response.json();

    return album;
  } catch (error) {
    throw error;
  }
}

export async function getPhotosByAlbumId(albumId: number, countItem: number) {
  const params = new URLSearchParams({ albumId: albumId.toString() });
  const url = `https://jsonplaceholder.typicode.com/photos?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const photos: Photo[] = await response.json();

    return photos.slice(0, countItem);
  } catch (error) {
    throw error;
  }
}
