import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./AlbumsDetailsPage.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { User } from "../../types/user";
import { useEffect, useState } from "react";
import { getUsersByAlbumId } from "../../services/userServices";
import {
  getAlbumByAlbumId,
  getPhotosByAlbumId,
} from "../../services/albumServices";
import type { Photo } from "../../types/photos";
import type { Album } from "../../types/albums";
import ShimmerContent from "../../components/ShimmerContent/ShimmerContent";
import { Image } from "antd";

function AlbumsDetailsPage() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!albumId) {
        setError("Album ID is missing");
        setIsLoading(false);
        return;
      }

      const numericAlbumId = parseInt(albumId, 10);

      try {
        const [userData, photoData, albumData] = await Promise.all([
          getUsersByAlbumId(numericAlbumId),
          getPhotosByAlbumId(numericAlbumId, 10),
          getAlbumByAlbumId(numericAlbumId),
        ]);
        setUser(userData);
        setPhotos(photoData);
        setAlbum(albumData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.breadcrumb}>
        <Breadcrumb />
      </div>
      <div className={styles.heading}>
        <div className={styles.btnBack}>
          <button onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
          </button>
        </div>
        <div className={styles.headingTitle}>Show Album</div>
      </div>
      <div className={styles.content}>
        {(isLoading) ? (
          <ShimmerContent table={true}/>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={styles.inner}>
            <div className={styles.metaCard}>
              <div className={styles.avatar}>
                <img
                  src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user?.name}`}
                  alt={user?.name}
                />
              </div>
              <div className={styles.detail}>
                <div className={styles.title}>
                  <Link to={`/users/${user?.id}`}>{user?.name}</Link>
                </div>
                <div className={styles.description}>
                  <Link to="#">{user?.email}</Link>
                </div>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.contentWrapper}>
              <div className={styles.titleContent}>
                <div>{album?.title}</div>
              </div>
              <div className={styles.lstPhoto}>
                {photos.map((photo) => (
                  <div className={styles.itemImage} key={photo.id}>
                    <Image src={photo.thumbnailUrl} alt={photo.title} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlbumsDetailsPage;
