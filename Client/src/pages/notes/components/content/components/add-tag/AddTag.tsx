import { useCallback, useMemo, useState } from 'react';
import { Button } from '../../../button';
import styles from './AddTag.module.scss';
import {
  createTag,
  deleteTags,
  selectBaseTag,
  setOpenAddTagToast,
} from '../../../../notesSlice';
import { Input } from '../../../input';
import { CreateTagDto, TagDto } from '../../../../../../models';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { TagsList } from '../tags-list';

export const AddTag = () => {
  const dispatch = useAppDispatch();
  const userGuid = useAppSelector(state => state.app.user?.guid as string);
  const tags = useAppSelector(state => state.notes.tags);

  const [tagName, setTagName] = useState('');
  const [selectedTags, setSelectedTags] = useState([] as TagDto[]);

  const removeButtonText = useMemo(() => {
    const text =
      selectedTags.length > 0 ? `Удалить (${selectedTags.length})` : 'Удалить';
    return text;
  }, [selectedTags.length]);

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
    if (!tagName) return;

    const createTagDto = {
      name: `#${tagName}`,
    } as CreateTagDto;

    dispatch(createTag({ userGuid, createTagDto }));
  }, [dispatch, tagName, userGuid]);

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

  return (
    <div className={styles['container']}>
      <div className={styles['controls']}>
        <span className={styles['title']}>Название тега:</span>
        <Input value={tagName} onChange={setTagName} />
        <Button text="Создать" color="grey-80" onClick={onCreate} />
        <Button
          text={removeButtonText}
          color="grey-80"
          onClick={onDeleteSome}
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
