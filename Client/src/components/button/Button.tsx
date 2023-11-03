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
};

export const Button = ({ text, color, onClick }: Props) => {
  const className = useMemo(
    () => [styles.button, color ? colorClass[color] : ''].join(' '),
    [color]
  );

  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};
