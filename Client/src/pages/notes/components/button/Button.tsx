import { useMemo } from 'react';
import styles from './Button.module.scss';

type Color = 'white' | 'grey-0' | 'grey-80';
type ColorClass = { [key in Color]: string };

// по цвету берем класс динамически >^•-•^<
const colorClass = {
  'grey-0': styles['grey-0'],
  'grey-80': styles['grey-80'],
  white: styles.white,
} as ColorClass;

type Props = {
  text?: string;
  color?: Color;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({ text, color, onClick, disabled }: Props) => {
  const className = useMemo(() => {
    const classNames = [disabled ? styles['button_disabled'] : styles.button];
    if (color) classNames.push(colorClass[color]);
    return classNames.join(' ');
  }, [color, disabled]);

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {text}
    </button>
  );
};
