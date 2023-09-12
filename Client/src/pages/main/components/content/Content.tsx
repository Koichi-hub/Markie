import { useSelector } from 'react-redux';
import styles from './Content.module.scss';
import { NoteCard } from './components/note-card';
import { RootState } from '../../../../store';
import { useMemo } from 'react';

export const Content = () => {
  const tag = useSelector((state: RootState) => state.main.tag);
  const notes = useSelector((state: RootState) => state.main.notes);

  const renderNotes = useMemo(
    () => notes?.map(note => <NoteCard note={note} />),
    [notes]
  );

  return (
    <div className={styles['content']}>
      <div className={styles['tag-title']}>{tag?.title}</div>
      <div className={styles['notes-cards-list']}>{renderNotes}</div>
    </div>
  );
};
