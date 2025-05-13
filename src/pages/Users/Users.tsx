import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./User.module.css";
import { getUsers } from "../../services/userServices";
import ShimmerRow from "../../components/ShimmerRow/ShimmerRow";
import Button from "../../components/Button/Button";
import type { User } from "../../types/user";

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const renderTableContent = () => (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={styles.tableTitle}>ID</th>
          <th className={styles.tableTitle}>Avatar</th>
          <th className={styles.tableTitle}>Email</th>
          <th className={styles.tableTitle}>Phone</th>
          <th className={styles.tableTitle}>Website</th>
          <th className={styles.tableTitle}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {users.map((user) => (
          <tr key={user.id}>
            <td className={styles.tableContent}>{user.id}</td>
            <td className={styles.tableContent}>
              <div className={styles.logo}>
                <img
                  src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user.name}`}
                  alt={user.name}
                />
              </div>
            </td>
            <td className={styles.tableContent}>
              <Link to="#">
                <div className={styles.name}>{user.email}</div>
              </Link>
            </td>
            <td className={styles.tableContent}>
              <Link to="#">
                <div className={styles.name}>{user.phone}</div>
              </Link>
            </td>
            <td className={styles.tableContent}>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.name}
              >
                {user.website}
              </a>
            </td>
            <td className={styles.tableContent}>
              <Button to={`/users/${user.id}`}>Show</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderLoading = () => (
    <table className={styles.table}>
      <tbody className={styles.tableBody}>
        {Array.from({ length: 5 }).map((_, i) => (
          <ShimmerRow columns={6} key={i} />
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div className={styles.title}>Users</div>
      <div className={styles.wrapper}>
        {isLoading
          ? renderLoading()
          : error
          ? <p className={styles.error}>Error: {error}</p>
          : renderTableContent()}
      </div>
    </>
  );
}

export default UsersPage;
