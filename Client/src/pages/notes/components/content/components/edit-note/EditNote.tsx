import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { TagsList } from '../tags-list';
import styles from './EditNote.module.scss';
import { ChangeNoteDto, Limits, TagDto } from '../../../../../../models';
import { Button } from '../../../button';
import { changeNoteAction, setOpenEditNoteToast } from '../../../../notesSlice';
import { ValidatedInput } from '../../../validated-input';

export const EditNote = () => {
  const dispatch = useAppDispatch();

  const note = useAppSelector(state => state.notes.note);
  const tags = useAppSelector(state => state.notes.tags);

  const [noteName, setNoteName] = useState('');
  const [noteNameError, setNoteNameError] = useState(false);
  const [noteNameErrorText, setNoteNameErrorText] = useState('');
  const [selectedTags, setSelectedTags] = useState([] as TagDto[]);

  const validateNoteName = useCallback((value: string) => {
    if (!value) {
      setNoteNameError(true);
      setNoteNameErrorText('поле должно быть заполнено');
      return false;
    } else if (value.length > Limits.nOTE_NAME_MAXLENGTH) {
      setNoteNameError(true);
      setNoteNameErrorText(
        `длина строки должна быть не больше ${Limits.nOTE_NAME_MAXLENGTH}`
      );
      return false;
    }

    setNoteNameError(false);
    setNoteNameErrorText('');
    return true;
  }, []);

  const isValidInput = useCallback(() => {
    return validateNoteName(noteName);
  }, [noteName, validateNoteName]);

  const onChangeNoteName = (value: string) => {
    validateNoteName(value);
    setNoteName(value);
  };

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
    if (!isValidInput()) return;

    const changeNoteDto = {
      ...note,
      name: noteName,
      tagsGuids: selectedTags.map(t => t.guid),
    } as ChangeNoteDto;

    dispatch(changeNoteAction(changeNoteDto));
  }, [dispatch, isValidInput, note, noteName, selectedTags]);

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
        <ValidatedInput
          value={noteName}
          onChange={onChangeNoteName}
          error={noteNameError}
          errorText={noteNameErrorText}
        />
        <Button
          text="Сохранить"
          color="grey-80"
          onClick={onSave}
          disabled={noteNameError}
        />
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
