import { TagItem } from './tag-item';
import styles from './TagsList.module.scss';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../../../../store';
import { useCallback, useEffect, useMemo } from 'react';
import { fetchTags, setTag } from '../../../../notesSlice';
import { TagDto } from '../../../../../../models';

export const TagsList = () => {
  const dispatch = useAppDispatch();
  const userGuid = useAppSelector(state => state.app.user?.guid as string);
  const tags = useAppSelector((state: RootState) => state.notes.tags);

  const onSelectTag = useCallback(
    (tag: TagDto) => dispatch(setTag(tag)),
    [dispatch]
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

  return <div className={styles['tags']}>{renderTags}</div>;
};
