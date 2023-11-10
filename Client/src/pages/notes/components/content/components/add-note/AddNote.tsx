import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../../../button';
import styles from './AddNote.module.scss';
import { createNoteAction, setOpenAddNoteToast } from '../../../../notesSlice';
import { CreateNoteDto, Limits, TagDto } from '../../../../../../models';
import { TagsList } from '../tags-list';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { ValidatedInput } from '../../../validated-input';

export const AddNote = () => {
  const dispatch = useAppDispatch();
  const tag = useAppSelector(state => state.notes.tag);
  const tags = useAppSelector(state => state.notes.tags);
  const notesLength = useAppSelector(state => state.notes.notes?.length);

  const [noteName, setNoteName] = useState('');
  const [noteNameError, setNoteNameError] = useState(false);
  const [noteNameErrorText, setNoteNameErrorText] = useState('');
  const [selectedTags, setSelectedTags] = useState([] as TagDto[]);
  const [limitError, setLimitError] = useState(false);

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

  const onCreate = useCallback(() => {
    if (!isValidInput()) return;

    const createNoteDto = {
      name: noteName,
      content: '',
      tagsGuids: selectedTags.map(t => t.guid),
    } as CreateNoteDto;

    dispatch(createNoteAction(createNoteDto));
  }, [dispatch, isValidInput, noteName, selectedTags]);

  const onClose = useCallback(
    () => dispatch(setOpenAddNoteToast(false)),
    [dispatch]
  );

  useEffect(() => {
    if (tag?.guid) setSelectedTags([tag]);
  }, [tag]);

  useEffect(() => {
    if (notesLength && notesLength >= Limits.nOTES_LIMIT) {
      setLimitError(true);
    }
  }, [notesLength]);

  const renderLimitErrorMessage = useMemo(() => {
    return (
      <div className={styles['notes-limit']}>
        {limitError && `Превышен лимит заметок: ${Limits.nOTES_LIMIT}`}
      </div>
    );
  }, [limitError]);

  return (
    <div className={styles['container']}>
      {renderLimitErrorMessage}
      <div className={styles['form']}>
        <div className={styles['controls']}>
          <span className={styles['title']}>Название заметки:</span>
          <ValidatedInput
            value={noteName}
            onChange={onChangeNoteName}
            error={noteNameError}
            errorText={noteNameErrorText}
          />
          <Button
            text="Создать"
            color="grey-80"
            onClick={onCreate}
            disabled={noteNameError || limitError}
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
    </div>
  );
};
