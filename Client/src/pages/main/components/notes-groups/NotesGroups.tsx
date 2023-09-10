import { NotesGroup } from './notes-group';
import styles from './NotesGroups.module.scss';

export const NotesGroups = () => {
  return (
    <div className={styles['notes-groups']}>
      <NotesGroup text="Все заметки" count={0} />
      <NotesGroup text="Все заметки" count={0} />
      <NotesGroup text="Все заметки" count={0} />
      <NotesGroup text="Все заметки" count={0} />
      <NotesGroup text="Все заметки" count={0} />
      <NotesGroup text="Все заметки" count={0} />
      <NotesGroup text="Все заметки" count={0} />
      <NotesGroup text="Все заметки" count={0} />
      <NotesGroup text="Все заметки" count={0} />
    </div>
  );
};
