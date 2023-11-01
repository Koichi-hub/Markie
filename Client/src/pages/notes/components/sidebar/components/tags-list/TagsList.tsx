import { TagItem } from './tag-item';
import styles from './TagsList.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { useCallback, useEffect, useMemo } from 'react';
import {
  fetchNotes,
  fetchTags,
  selectTagAction,
  setTag,
} from '../../../../notesSlice';
import { TagDto } from '../../../../../../models';

export const TagsList = () => {
  const dispatch = useAppDispatch();
  const userGuid = useAppSelector(state => state.app.user?.guid as string);
  const baseTag = useAppSelector(state => state.notes.baseTag);
  const note = useAppSelector(state => state.notes.note);
  const tags = useAppSelector(state => state.notes.tags);

  const onSelectBaseTag = useCallback(() => {
    dispatch(fetchNotes(userGuid));
    dispatch(setTag(baseTag as TagDto));
  }, [baseTag, dispatch, userGuid]);

  const onSelectTag = useCallback(
    (tag: TagDto) => {
      if (!note) dispatch(selectTagAction(tag));
    },
    [dispatch, note]
  );

  useEffect(() => {
    dispatch(fetchTags(userGuid));
  }, [dispatch, userGuid]);

  const renderTags = useMemo(
    () =>
      tags?.map((tag, index) => (
        <TagItem key={index} tag={tag} onSelectTag={onSelectTag} />
      )),
    [onSelectTag, tags]
  );

  return (
    <div className={styles['tags']}>
      <TagItem tag={baseTag as TagDto} onSelectTag={onSelectBaseTag} />
      {renderTags}
    </div>
  );
};
