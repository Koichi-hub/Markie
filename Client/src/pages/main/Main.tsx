import { Content } from './components/content';
import { Sidebar } from './components/sidebar';
import styles from './Main.module.scss';

export const Main = () => {
  return (
    <div className={styles.main}>
      <Sidebar />
      <Content />
    </div>
  );
};
