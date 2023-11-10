import styles from './Content.module.scss';
import { NoteCard } from './components/note-card';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { useCallback, useMemo, useState } from 'react';
import { ChangeNoteDto } from '../../../../models';
import { AddTag } from './components/add-tag';
import { useClickAway } from '@uidotdev/usehooks';
import {
  changeNoteAction,
  deleteNoteAction,
  fetchNote,
  setOpenAddNoteToast,
  setOpenAddTagToast,
  setOpenEditNoteToast,
} from '../../notesSlice';
import { AddNote } from './components/add-note';
import { NoteEditor } from './components/note-editor';
import { IconButton } from './components/icon-button';
import { EditNote } from './components/edit-note';
import { ConfirmDeletionNoteModal } from './components/confirm-deletion-note-modal';
import { Button } from '../button';

export const Content = () => {
  // hooks
  const dispatch = useAppDispatch();

  // selectors
  const note = useAppSelector(state => state.notes.note);
  const noteSaved = useAppSelector(state => state.notes.noteSaved);
  const noteChanged = useAppSelector(state => state.notes.noteChanged);
  const notes = useAppSelector(state => state.notes.notes);
  const openAddTagToast = useAppSelector(state => state.notes.openAddTagToast);
  const openAddNoteToast = useAppSelector(
    state => state.notes.openAddNoteToast
  );
  const openEditNoteToast = useAppSelector(
    state => state.notes.openEditNoteToast
  );

  // state
  const [openConfirmDeletionNoteModal, setOpenConfirmDeletionNoteModal] =
    useState(false);

  // variables
  const ref = useClickAway(() => {
    dispatch(setOpenAddTagToast(false));
    dispatch(setOpenAddNoteToast(false));
    dispatch(setOpenEditNoteToast(false));
  });

  // events
  const onClickNoteCard = useCallback(
    (noteGuid: string) => () => {
      dispatch(fetchNote(noteGuid));
    },
    [dispatch]
  );

  const onClickEditNoteTags = useCallback(() => {
    dispatch(setOpenEditNoteToast(true));
  }, [dispatch]);

  const onDeleteNote = useCallback(() => {
    dispatch(deleteNoteAction());
    setOpenConfirmDeletionNoteModal(false);
  }, [dispatch]);

  const onOpenConfirmDeletionNoteModal = () =>
    setOpenConfirmDeletionNoteModal(true);

  const onCloseConfirmDeletionNoteModal = () =>
    setOpenConfirmDeletionNoteModal(false);

  const onSaveNote = useCallback(() => {
    if (!noteChanged || noteSaved) return;

    const changeNoteDto = {
      ...note,
      tagsGuids: note?.tags.map(t => t.guid),
    } as ChangeNoteDto;

    dispatch(changeNoteAction(changeNoteDto));
  }, [dispatch, note, noteChanged, noteSaved]);

  // render
  const renderNotes = useMemo(
    () =>
      !note && (
        <div className={styles['notes-cards-list']}>
          {notes?.map(note => (
            <NoteCard
              key={note.guid}
              note={note}
              onClick={onClickNoteCard(note.guid)}
            />
          ))}
        </div>
      ),
    [note, notes, onClickNoteCard]
  );

  const renderNoteEditor = useMemo(
    () => note && <NoteEditor note={note} />,
    [note]
  );

  const renderToast = useMemo(() => {
    const toastActive =
      openAddTagToast || openAddNoteToast || openEditNoteToast;
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
          {openEditNoteToast && <EditNote />}
        </div>
      </>
    );
  }, [openAddNoteToast, openAddTagToast, openEditNoteToast, ref]);

  const renderTitle = useMemo(() => {
    return note ? <span>{note?.name}</span> : '';
  }, [note]);

  const renderControls = useMemo(
    () =>
      note && (
        <div className={styles['controls']}>
          <Button color="grey-80" text="Сохранить" onClick={onSaveNote} />
          <IconButton
            src="/assets/icons/delete.svg"
            onClick={onOpenConfirmDeletionNoteModal}
          />
          <ConfirmDeletionNoteModal
            open={openConfirmDeletionNoteModal}
            onDelete={onDeleteNote}
            onCancel={onCloseConfirmDeletionNoteModal}
            note={note}
          />
          <IconButton
            src="/assets/icons/edit.svg"
            onClick={onClickEditNoteTags}
          />
        </div>
      ),
    [
      note,
      onClickEditNoteTags,
      onDeleteNote,
      onSaveNote,
      openConfirmDeletionNoteModal,
    ]
  );

  const renderNoteStatus = useMemo(() => {
    if (note && noteChanged) {
      return (
        <div
          className={[
            styles['status'],
            !noteSaved && styles['status_dungeor'],
          ].join(' ')}>
          {noteSaved ? 'Сохранено' : 'Не сохранено'}
        </div>
      );
    }
  }, [note, noteChanged, noteSaved]);

  return (
    <div className={styles['content']}>
      <div className={styles['header']}>
        <div className={styles['title']}>{renderTitle}</div>
        <div className={styles['controls-container']}>
          {renderNoteStatus}
          {renderControls}
        </div>
      </div>
      {renderNotes}
      {renderNoteEditor}
      {renderToast}
    </div>
  );
};
