import styles from './Button.module.scss';

type Props = {
  text?: string;
  onClick?: () => void;
};

export const Button = ({ text, onClick }: Props) => {
  return (
    <button className={styles['button']} onClick={onClick}>
      {text}
    </button>
  );
};
