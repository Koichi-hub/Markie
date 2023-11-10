import { useMemo } from 'react';
import styles from './ValidatedInput.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  errorText: string;
};

export const ValidatedInput = ({
  value,
  onChange,
  error,
  errorText,
}: Props) => {
  const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  const inputClassName = useMemo(() => {
    return [styles['input'], error ? styles['input_error'] : ''].join(' ');
  }, [error]);

  return (
    <div className={styles['validated-input']}>
      <input
        value={value}
        onChange={onChangeLocal}
        className={inputClassName}
        type="text"
      />
      {error && <div className={styles['error-text']}>{errorText}</div>}
    </div>
  );
};
