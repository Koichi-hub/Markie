import styles from './Content.module.scss';
import { NoteCard } from './components/note-card';

export const Content = () => {
  return (
    <div className={styles['content']}>
      <div className={styles['notes-cards-list']}>
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
      </div>
    </div>
  );
};
