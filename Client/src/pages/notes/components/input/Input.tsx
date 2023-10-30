import styles from './Input.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const Input = ({ value, onChange }: Props) => {
  const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <input
      value={value}
      onChange={onChangeLocal}
      className={styles['input']}
      type="text"
    />
  );
};
