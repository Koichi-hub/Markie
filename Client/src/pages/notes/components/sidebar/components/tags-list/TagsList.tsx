import { TagItem } from './tag-item';
import styles from './TagsList.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../../store';
import { useCallback, useEffect, useMemo } from 'react';
import {
  fetchTags,
  resetNote,
  selectBaseTag,
  selectTagAction,
} from '../../../../notesSlice';
import { TagDto } from '../../../../../../models';

export const TagsList = () => {
  const dispatch = useAppDispatch();
  const userGuid = useAppSelector(state => state.app.user?.guid as string);
  const baseTag = useAppSelector(state => state.notes.baseTag);
  const tag = useAppSelector(state => state.notes.tag);
  const tags = useAppSelector(state => state.notes.tags);

  const onSelectBaseTag = useCallback(() => {
    if (!tag?.guid) dispatch(resetNote());
    else dispatch(selectBaseTag());
  }, [dispatch, tag?.guid]);

  const onSelectTag = useCallback(
    (t: TagDto) => {
      if (tag?.guid && tag.guid == t.guid) dispatch(resetNote());
      else dispatch(selectTagAction(t));
    },
    [dispatch, tag]
  );

  useEffect(() => {
    if (userGuid) dispatch(fetchTags(userGuid));
  }, [dispatch, userGuid]);

  const renderTags = useMemo(
    () =>
      tags?.map((t, index) => (
        <TagItem
          key={index}
          tag={t}
          onSelectTag={onSelectTag}
          selected={t.guid === tag?.guid}
        />
      )),
    [onSelectTag, tag?.guid, tags]
  );

  return (
    <div className={styles['tags']}>
      <TagItem
        tag={baseTag as TagDto}
        onSelectTag={onSelectBaseTag}
        selected={!tag?.guid}
      />
      {renderTags}
    </div>
  );
};
