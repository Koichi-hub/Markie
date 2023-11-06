import styles from './PageLoader.module.scss';

type Props = {
  text?: string;
};

export const PageLoader = ({ text }: Props) => (
  <div className={styles['loader-container']}>
    <div className={styles['loader']}></div>
    <div>{text}</div>
  </div>
);
