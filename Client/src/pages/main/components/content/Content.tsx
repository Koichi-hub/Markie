import { useSelector } from 'react-redux';
import styles from './Content.module.scss';
import { NoteCard } from './components/note-card';
import { RootState } from '../../../../store';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note } from '../../../../models/note';

export const Content = () => {
  const navigate = useNavigate();

  const tag = useSelector((state: RootState) => state.main.tag);
  const notes = useSelector((state: RootState) => state.main.notes);

  const onClickNoteCard = useCallback(
    (note: Note) => () => navigate(`/note/${note.guid}`),
    [navigate]
  );

  const renderNotes = useMemo(
    () =>
      notes?.map(note => (
        <NoteCard key={note.guid} note={note} onClick={onClickNoteCard(note)} />
      )),
    [notes, onClickNoteCard]
  );

  return (
    <div className={styles['content']}>
      <div className={styles['tag-title']}>{tag?.title}</div>
      <div className={styles['notes-cards-list']}>{renderNotes}</div>
    </div>
  );
};
