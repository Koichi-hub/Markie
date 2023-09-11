import { useSelector } from 'react-redux';
import styles from './Content.module.scss';
import { NoteCard } from './components/note-card';
import { RootState } from '../../../../store';

export const Content = () => {
  const tag = useSelector((state: RootState) => state.main.tag);

  return (
    <div className={styles['content']}>
      <div className={styles['tag-title']}>{tag?.title}</div>
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
