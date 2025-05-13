import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./UserDetailsPage.module.css";
import { getUserById } from "../../services/userServices";
import { getAlbumsByUserId } from "../../services/albumServices";
import Button from "../../components/Button/Button";
import type { User } from "../../types/user";
import type { Album } from "../../types/albums";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ShimmerContent from "../../components/ShimmerContent/ShimmerContent";

function UserDetailsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError("User ID is missing");
        setIsLoading(false);
        return;
      }

      const numericUserId = parseInt(userId, 10);

      try {
        const [userData, albumData] = await Promise.all([
          getUserById(numericUserId),
          getAlbumsByUserId(numericUserId),
        ]);
        setUser(userData);
        setAlbums(albumData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

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
        <div className={styles.headingTitle}>Show User</div>
      </div>
      <div className={styles.content}>
        {isLoading ? (
          <ShimmerContent table={true} />
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
                <div className={styles.title}>{user?.name}</div>
                <div className={styles.description}>
                  <Link to="#">{user?.email}</Link>
                </div>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.tableWrapper}>
              <div className={styles.titleHeader}>Albums</div>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th className={styles.tableTitle}>ID</th>
                      <th className={styles.tableTitle}>Title</th>
                      <th className={styles.tableTitle}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums.map((album) => (
                      <tr key={album.id}>
                        <td className={styles.tableContent}>{album.id}</td>
                        <td className={styles.tableContent}>{album.title}</td>
                        <td className={styles.tableContent}>
                          <Button to={`/albums/${album.id}`}>Show</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetailsPage;
