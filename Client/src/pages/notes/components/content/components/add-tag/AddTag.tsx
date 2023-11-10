import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../../../button';
import styles from './AddTag.module.scss';
import {
  createTag,
  deleteTags,
  selectBaseTag,
  setOpenAddTagToast,
} from '../../../../notesSlice';
import { CreateTagDto, Limits, TagDto } from '../../../../../../models';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { TagsList } from '../tags-list';
import { ValidatedInput } from '../../../validated-input';

export const AddTag = () => {
  const dispatch = useAppDispatch();
  const userGuid = useAppSelector(state => state.app.user?.guid as string);
  const tags = useAppSelector(state => state.notes.tags);

  const [tagName, setTagName] = useState('');
  const [tagNameError, setTagNameError] = useState(false);
  const [tagNameErrorText, setTagNameErrorText] = useState('');
  const [selectedTags, setSelectedTags] = useState([] as TagDto[]);
  const [limitError, setLimitError] = useState(false);

  const validateTagName = useCallback((value: string) => {
    if (!value) {
      setTagNameError(true);
      setTagNameErrorText('поле должно быть заполнено');
      return false;
    } else if (value.length >= Limits.tAG_NAME_MAXLENGTH) {
      setTagNameError(true);
      setTagNameErrorText(
        `длина строки должна быть меньше ${Limits.tAG_NAME_MAXLENGTH}`
      );
      return false;
    }

    setTagNameError(false);
    setTagNameErrorText('');
    return true;
  }, []);

  const isValidInput = useCallback(() => {
    return validateTagName(tagName);
  }, [tagName, validateTagName]);

  const onChangeTagName = useCallback(
    (value: string) => {
      validateTagName(value);
      setTagName(value);
    },
    [validateTagName]
  );

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

    const createTagDto = {
      name: `#${tagName}`,
    } as CreateTagDto;

    dispatch(createTag({ userGuid, createTagDto }));
  }, [dispatch, isValidInput, tagName, userGuid]);

  const onDeleteSome = useCallback(() => {
    if (selectedTags.length === 0) return;

    dispatch(
      deleteTags({ userGuid, tagsGuids: selectedTags.map(t => t.guid) })
    );
    dispatch(selectBaseTag());
    setSelectedTags([]);
  }, [dispatch, selectedTags, userGuid]);

  const onClose = useCallback(
    () => dispatch(setOpenAddTagToast(false)),
    [dispatch]
  );

  const removeButtonText = useMemo(() => {
    const text =
      selectedTags.length > 0 ? `Удалить (${selectedTags.length})` : 'Удалить';
    return text;
  }, [selectedTags.length]);

  const renderControls = useMemo(() => {
    return (
      <div className={styles['controls']}>
        <span className={styles['title']}>Название тега:</span>
        <ValidatedInput
          value={tagName}
          onChange={onChangeTagName}
          error={tagNameError}
          errorText={tagNameErrorText}
        />
        <Button
          text="Создать"
          color="grey-80"
          onClick={onCreate}
          disabled={tagNameError || limitError}
        />
        <Button
          text={removeButtonText}
          color="grey-80"
          onClick={onDeleteSome}
          disabled={selectedTags.length == 0}
        />
        <Button text="Закрыть" color="grey-80" onClick={onClose} />
      </div>
    );
  }, [
    limitError,
    onChangeTagName,
    onClose,
    onCreate,
    onDeleteSome,
    removeButtonText,
    selectedTags.length,
    tagName,
    tagNameError,
    tagNameErrorText,
  ]);

  useEffect(() => {
    if (tags && tags?.length >= Limits.tAGS_LIMIT) {
      setLimitError(true);
    }
  }, [tags]);

  const renderTags = useMemo(() => {
    return (
      <div className={styles['tags']}>
        <span className={styles['title']}>Теги:</span>
        <TagsList
          tags={tags ?? []}
          selectedTags={selectedTags}
          onSelectTag={onSelectTag}
        />
      </div>
    );
  }, [onSelectTag, selectedTags, tags]);

  const renderLimitErrorMessage = useMemo(() => {
    return (
      <div className={styles['tags-limit']}>
        {limitError && `Превышен лимит тегов: ${Limits.tAGS_LIMIT}`}
      </div>
    );
  }, [limitError]);

  return (
    <div className={styles['container']}>
      {renderLimitErrorMessage}
      <div className={styles['form']}>
        {renderControls}
        {renderTags}
      </div>
    </div>
  );
};
