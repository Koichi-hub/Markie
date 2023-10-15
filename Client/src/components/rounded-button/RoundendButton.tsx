import styles from './RoundendButton.module.scss';

type Props = {
  text?: string;
  focus?: boolean;
  onClick?: () => void;
};

export const RoundendButton = ({ text, focus, onClick }: Props) => {
  const className = focus ? styles['button_focus'] : '';

  return (
    <button
      className={[styles['button'], className].join(' ')}
      onClick={onClick}>
      {text}
    </button>
  );
};
