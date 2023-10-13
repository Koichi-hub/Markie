import styles from './IconButton.module.scss';

type Props = {
  src?: string;
  onClick?: () => void;
};

export const IconButton = ({ src, onClick }: Props) => {
  return (
    <div className={styles['icon-button']} onClick={onClick}>
      <img src={src} alt="" />
    </div>
  );
};
