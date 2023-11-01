import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { TagsList } from '../tags-list';
import styles from './EditNote.module.scss';
import { ChangeNoteDto, TagDto } from '../../../../../../models';
import { Button } from '../../../button';
import { changeNoteAction, setOpenEditNoteToast } from '../../../../notesSlice';
import { Input } from '../../../input';

export const EditNote = () => {
  const dispatch = useAppDispatch();

  const note = useAppSelector(state => state.notes.note);
  const tags = useAppSelector(state => state.notes.tags);

  const [noteName, setNoteName] = useState('');
  const [selectedTags, setSelectedTags] = useState([] as TagDto[]);

  const onSelectTag = useCallback(
    (tag: TagDto) => {
      if (selectedTags.some(t => t.guid === tag.guid)) {
        setSelectedTags(selectedTags.filter(t => t.guid !== tag.guid));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    },
    [selectedTags]
  );

  const onSave = useCallback(() => {
    const changeNoteDto = {
      ...note,
      name: noteName,
      tagsGuids: selectedTags.map(t => t.guid),
    } as ChangeNoteDto;

    dispatch(changeNoteAction(changeNoteDto));
  }, [dispatch, note, noteName, selectedTags]);

  const onClose = useCallback(
    () => dispatch(setOpenEditNoteToast(false)),
    [dispatch]
  );

  useEffect(() => {
    if (note) {
      setNoteName(note.name);
      setSelectedTags(note.tags);
    }
  }, [note]);

  return (
    <div className={styles['container']}>
      <div className={styles['controls']}>
        <span className={styles['title']}>Название заметки:</span>
        <Input value={noteName} onChange={setNoteName} />
        <Button text="Сохранить" color="grey-80" onClick={onSave} />
        <Button text="Закрыть" color="grey-80" onClick={onClose} />
      </div>
      <div className={styles['tags']}>
        <span className={styles['title']}>Теги:</span>
        <TagsList
          tags={tags ?? []}
          selectedTags={selectedTags}
          onSelectTag={onSelectTag}
        />
      </div>
    </div>
  );
};
