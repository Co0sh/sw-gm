import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FC, memo, useEffect, useState } from 'react';
import { UpdateSubscriber } from '../logic/updateSubscriber';

export interface UpdateNotificationProps {
  updateSubscriber: UpdateSubscriber;
}

const UpdateNotification: FC<UpdateNotificationProps> = ({
  updateSubscriber,
}) => {
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    const subscribe = updateSubscriber.getSubscribe();
    const unsubscribe = subscribe(() => setHasUpdate(true));
    return unsubscribe;
  }, [updateSubscriber]);

  return (
    <Snackbar
      open={hasUpdate}
      autoHideDuration={10 * 1000}
      onClose={() => setHasUpdate(false)}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Alert severity="info" onClose={() => setHasUpdate(false)}>
        An update is available, close the app to apply it.
      </Alert>
    </Snackbar>
  );
};

export default memo(UpdateNotification);
