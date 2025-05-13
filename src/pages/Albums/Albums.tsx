import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Albums.module.css";
import Button from "../../components/Button/Button";
import ShimmerRow from "../../components/ShimmerRow/ShimmerRow";
import { getAlbums } from "../../services/albumServices";
import type { Album } from "../../types/albums";
import Pagination from "../../components/Pagination/Pagination";

function AlbumsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialPage = parseInt(searchParams.get("current") || "1", 10);
  const initialPageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const currentAlbums = albums.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setSearchParams({
      pageSize: pageSize.toString(),
      current: currentPage.toString(),
    });
  }, [currentPage, pageSize, setSearchParams]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbums();
        setAlbums(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const AlbumRow = ({ album }: { album: Album }) => (
    <tr>
      <td className={styles.tableContent}>{album.id}</td>
      <td className={styles.tableContent}>{album.title}</td>
      <td className={styles.tableContent}>
        <Link to={`/users/${album.userId}`}>
          <div className={styles.logo}>
            <img
              src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${album.name}`}
              alt={`Avatar for ${album.name}`}
            />
          </div>
          <div className={styles.name}>{album.name}</div>
        </Link>
      </td>
      <td className={styles.tableContent}>
        <Button to={`/albums/${album.id}`}>Show</Button>
      </td>
    </tr>
  );

  const renderTableContent = () => (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={styles.tableTitle}>ID</th>
          <th className={styles.tableTitle}>Title</th>
          <th className={styles.tableTitle}>User</th>
          <th className={styles.tableTitle}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {currentAlbums.map((album) => (
          <AlbumRow key={album.id} album={album} />
        ))}
      </tbody>
    </table>
  );

  const renderLoading = () => (
    <table className={styles.table}>
      <tbody className={styles.tableBody}>
        {[...Array(5)].map((_, index) => (
          <ShimmerRow columns={4} key={index} />
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div className={styles.wrapper}>
        {isLoading ? (
          renderLoading()
        ) : error ? (
          <p className={styles.error}>Error: {error}</p>
        ) : (
          renderTableContent()
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={albums.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(val) => {
          setPageSize(val);
          setCurrentPage(1);
        }}
      />
    </>
  );
}

export default AlbumsPage;
