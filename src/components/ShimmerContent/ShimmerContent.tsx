import ShimmerRow from "../ShimmerRow/ShimmerRow";
import styles from "./ShimmerContent.module.css";

function ShimmerContent({ table = false }) {
  return (
    <div className={styles.shimmerWrapper}>
      <div className={styles.metaCard}>
        <div className={styles.avatar}></div>
        <div className={styles.detail}>
          <div className={styles.title}></div>
          <div className={styles.description}></div>
        </div>
      </div>
      <div className={styles.divider}></div>
      {table ? (
        <>
          <div className={styles.titleHeader}></div>
          <table className={styles.table}>
            <tbody className={styles.tableBody}>
              {[...Array(5)].map((_, index) => (
                <ShimmerRow columns={3} key={index} />
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div className={styles.albumTitle}></div>
          <div className={styles.photoGrid}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div className={styles.photoItem} key={i}></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ShimmerContent;
