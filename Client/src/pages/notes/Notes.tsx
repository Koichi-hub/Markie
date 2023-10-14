import { Content } from './components/content';
import { Sidebar } from './components/sidebar';
import styles from './Notes.module.scss';

export const Notes = () => {
  return (
    <div className={styles.notes}>
      <Sidebar />
      <Content />
    </div>
  );
};
