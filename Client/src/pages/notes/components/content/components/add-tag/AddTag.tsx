import { useCallback, useMemo, useState } from 'react';
import { Button } from '../../../button';
import styles from './AddTag.module.scss';
import {
  createTag,
  deleteTags,
  setOpenAddTagToast,
} from '../../../../notesSlice';
import { Input } from '../../../input';
import { CreateTagDto, TagDto } from '../../../../../../models';
import { useAppDispatch, useAppSelector } from '../../../../../../store';

export const AddTag = () => {
  const dispatch = useAppDispatch();
  const userGuid = useAppSelector(state => state.app.user?.guid as string);
  const tags = useAppSelector(state => state.notes.tags);

  const [tagName, setTagName] = useState('');
  const [selectedTags, setSelectedTags] = useState([] as TagDto[]);

  const onClickTag = useCallback(
    (tag: TagDto) => () => {
      if (selectedTags.some(t => t.guid === tag.guid)) {
        setSelectedTags(selectedTags.filter(t => t.guid !== tag.guid));
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    },
    [selectedTags]
  );

  const onCreate = useCallback(() => {
    const createTagDto = {
      name: tagName,
    } as CreateTagDto;

    dispatch(createTag({ userGuid, createTagDto }));
  }, [dispatch, tagName, userGuid]);

  const onDeleteSome = useCallback(() => {
    dispatch(
      deleteTags({ userGuid, tagsGuids: selectedTags.map(t => t.guid) })
    );
  }, [dispatch, selectedTags, userGuid]);

  const onClose = useCallback(
    () => dispatch(setOpenAddTagToast(false)),
    [dispatch]
  );

  const renderTags = useMemo(() => {
    return tags?.map(tag => {
      const className = selectedTags.some(t => t.guid === tag.guid)
        ? styles['selected-tag']
        : '';
      return (
        <div key={tag.guid} className={className} onClick={onClickTag(tag)}>
          {tag.name}
        </div>
      );
    });
  }, [onClickTag, selectedTags, tags]);

  return (
    <div className={styles['container']}>
      <div className={styles['controls']}>
        <span className={styles['title']}>Название тега:</span>
        <Input value={tagName} onChange={setTagName} />
        <Button text="Создать" color="grey-80" onClick={onCreate} />
        <Button text="Удалить" color="grey-80" onClick={onDeleteSome} />
        <Button text="Закрыть" color="grey-80" onClick={onClose} />
      </div>
      <div className={styles['tags']}>
        <span className={styles['title']}>Теги:</span>
        <div className={styles['tags__list']}>{renderTags}</div>
      </div>
    </div>
  );
};
