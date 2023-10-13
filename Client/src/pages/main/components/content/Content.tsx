import { useDispatch, useSelector } from 'react-redux';
import styles from './Content.module.scss';
import { NoteCard } from './components/note-card';
import { RootState } from '../../../../store';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note } from '../../../../models/note';
import { AddTag } from './components/add-tag';
import { useClickAway } from '@uidotdev/usehooks';
import { setOpenAddNoteToast, setOpenAddTagToast } from '../../mainSlice';
import { AddNote } from './components/add-note';

export const Content = () => {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // selectors
  const tag = useSelector((state: RootState) => state.main.tag);
  const notes = useSelector((state: RootState) => state.main.notes);
  const openAddTagToast = useSelector(
    (state: RootState) => state.main.openAddTagToast
  );
  const openAddNoteToast = useSelector(
    (state: RootState) => state.main.openAddNoteToast
  );

  // variables
  const ref = useClickAway(() => {
    dispatch(setOpenAddTagToast(false));
    dispatch(setOpenAddNoteToast(false));
  });

  // events
  const onClickNoteCard = useCallback(
    (note: Note) => () => navigate(`/note/${note.guid}`),
    [navigate]
  );

  // render
  const renderNotes = useMemo(
    () =>
      notes?.map(note => (
        <NoteCard key={note.guid} note={note} onClick={onClickNoteCard(note)} />
      )),
    [notes, onClickNoteCard]
  );

  const renderToast = useMemo(() => {
    const toastActive = openAddTagToast || openAddNoteToast;
    const toastActiveClassName = toastActive
      ? styles['content__toast_active']
      : '';
    return (
      <>
        {toastActive && (
          <div className={styles['content__backing-panel']}></div>
        )}
        <div
          ref={ref as React.LegacyRef<HTMLDivElement>}
          className={[styles['content__toast'], toastActiveClassName].join(
            ' '
          )}>
          {openAddTagToast && <AddTag />}
          {openAddNoteToast && <AddNote />}
        </div>
      </>
    );
  }, [openAddNoteToast, openAddTagToast, ref]);

  return (
    <div className={styles['content']}>
      <div className={styles['tag-title']}>{tag?.title}</div>
      <div className={styles['notes-cards-list']}>{renderNotes}</div>
      {renderToast}
    </div>
  );
};
