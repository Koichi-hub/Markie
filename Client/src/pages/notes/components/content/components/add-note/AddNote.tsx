import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../../button';
import styles from './AddNote.module.scss';
import { createNoteAction, setOpenAddNoteToast } from '../../../../notesSlice';
import { Input } from '../../../input';
import { CreateNoteDto, TagDto } from '../../../../../../models';
import { TagsList } from '../tags-list';
import { useAppDispatch, useAppSelector } from '../../../../../../store';

export const AddNote = () => {
  const dispatch = useAppDispatch();
  const tag = useAppSelector(state => state.notes.tag);
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

  const onCreate = useCallback(() => {
    if (!noteName) return;

    const createNoteDto = {
      name: noteName,
      content: '',
      tagsGuids: selectedTags.map(t => t.guid),
    } as CreateNoteDto;

    dispatch(createNoteAction(createNoteDto));
  }, [dispatch, noteName, selectedTags]);

  const onClose = useCallback(
    () => dispatch(setOpenAddNoteToast(false)),
    [dispatch]
  );

  useEffect(() => {
    if (tag?.guid) setSelectedTags([tag]);
  }, [tag]);

  return (
    <div className={styles['container']}>
      <div className={styles['controls']}>
        <span className={styles['title']}>Название заметки:</span>
        <Input value={noteName} onChange={setNoteName} />
        <Button text="Создать" color="grey-80" onClick={onCreate} />
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
