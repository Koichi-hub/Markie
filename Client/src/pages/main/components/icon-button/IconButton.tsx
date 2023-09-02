import styles from './IconButton.module.scss';

type Props = {
  src: string;
};

export const IconButton = ({ src }: Props) => {
  return (
    <div className={styles['icon-button']}>
      <img src={src} alt="" />
    </div>
  );
};
