import Popup from 'reactjs-popup';
import styles from './ConfirmDeletionNoteModal.module.scss';
import { Button } from '../../../button';
import styled from 'styled-components';
import { NoteDto } from '../../../../../../models';

const StyledPopup = styled(Popup)`
  @keyframes modal-anim {
    0% {
      transform: scale(1) translateY(0px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }

    1% {
      transform: scale(0.96) translateY(10px);
      opacity: 0;
      box-shadow: 0 0 0 rgba(241, 241, 241, 0);
    }

    100% {
      transform: scale(1) translateY(0px);
      opacity: 1;
      box-shadow: 0 0 500px rgba(241, 241, 241, 0);
    }
  }

  &-content {
    -webkit-animation: modal-anim 0.2s cubic-bezier(0.38, 0.1, 0.36, 0.9)
      forwards;
  }
`;

type Props = {
  note: NoteDto;
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
};

export const ConfirmDeletionNoteModal = ({
  note,
  open,
  onDelete,
  onCancel,
}: Props) => {
  return (
    <StyledPopup open={open} onClose={onCancel} modal nested>
      <div className={styles['modal']}>
        <div className={styles['title']}>Удаление заметки</div>
        <div className={styles['content']}>
          Вы уверены, что хотите удалить заметку "{note?.name}"?
        </div>
        <div className={styles['controls']}>
          <Button color="grey-80" text="Удалить" onClick={onDelete} />
          <Button color="grey-80" text="Отмена" onClick={onCancel} />
        </div>
      </div>
    </StyledPopup>
  );
};
