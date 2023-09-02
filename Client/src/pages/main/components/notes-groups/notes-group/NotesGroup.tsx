import { IconButton } from '../../icon-button';
import styles from './NotesGroup.module.scss';

type Props = {
  text: string;
  count: number;
};

export const NotesGroup = ({ text, count }: Props) => {
  return (
    <div className={styles['notes-group']}>
      <span className={styles['text']}>{text}</span>

      <div className={styles['right-part']}>
        <IconButton src="assets/icons/add.svg" />
        <span>{count}</span>
      </div>
    </div>
  );
};
