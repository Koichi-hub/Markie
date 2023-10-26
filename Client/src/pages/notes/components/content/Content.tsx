import { useDispatch, useSelector } from 'react-redux';
import styles from './Content.module.scss';
import { NoteCard } from './components/note-card';
import { RootState } from '../../../../store';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NoteDto } from '../../../../models';
import { AddTag } from './components/add-tag';
import { useClickAway } from '@uidotdev/usehooks';
import { setOpenAddNoteToast, setOpenAddTagToast } from '../../notesSlice';
import { AddNote } from './components/add-note';
import { routes } from '../../../../router';
import { NoteEditor } from './components/note-editor';

export const Content = () => {
  // hooks
  const { noteGuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // selectors
  const tag = useSelector((state: RootState) => state.notes.tag);
  const notes = useSelector((state: RootState) => state.notes.notes);
  const openAddTagToast = useSelector(
    (state: RootState) => state.notes.openAddTagToast
  );
  const openAddNoteToast = useSelector(
    (state: RootState) => state.notes.openAddNoteToast
  );

  // variables
  const ref = useClickAway(() => {
    dispatch(setOpenAddTagToast(false));
    dispatch(setOpenAddNoteToast(false));
  });

  // events
  const onClickNoteCard = useCallback(
    (note: NoteDto) => () => navigate(`${routes.notes}/${note.guid}`),
    [navigate]
  );

  // render
  const renderNotes = useMemo(
    () =>
      !noteGuid && (
        <div className={styles['notes-cards-list']}>
          {notes?.map(note => (
            <NoteCard
              key={note.guid}
              note={note}
              onClick={onClickNoteCard(note)}
            />
          ))}
        </div>
      ),
    [noteGuid, notes, onClickNoteCard]
  );

  const renderNoteEditor = useMemo(
    () => noteGuid && <NoteEditor />,
    [noteGuid]
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
      <div className={styles['tag-title']}>{tag?.name}</div>
      {renderNotes}
      {renderNoteEditor}
      {renderToast}
    </div>
  );
};
