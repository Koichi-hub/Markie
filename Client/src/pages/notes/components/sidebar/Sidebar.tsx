import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button';
import { TagsList } from './components/tags-list';
import styles from './Sidebar.module.scss';
import { RootState } from '../../../../store';
import { toggleOpenAddTagToast } from '../../notesSlice';

export const Sidebar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.app.user);

  const onEditTags = () => {
    dispatch(toggleOpenAddTagToast());
  };
  const onExit = () => {};

  return (
    <div className={styles['sidebar']}>
      <div className={styles['user']}>
        <img className={styles['user-picture']} src={''} />
        <div className={styles['user-username']}>{user?.userName}</div>
      </div>
      <TagsList />
      <div className={styles['buttons']}>
        <Button
          color="grey-80"
          text="Редактировать теги"
          onClick={onEditTags}
        />
        <Button color="grey-0" text="выйти" onClick={onExit} />
      </div>
    </div>
  );
};
