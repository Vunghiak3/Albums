import styles from "./ShimmerRow.module.css";

interface ShimmerRowProps {
  columns: number;
}

function ShimmerRow({ columns }: ShimmerRowProps) {
  return (
    <tr className={styles.shimmerRow}>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index}>
          <div className={styles.shimmerBox}></div>
        </td>
      ))}
    </tr>
  );
}

export default ShimmerRow;
