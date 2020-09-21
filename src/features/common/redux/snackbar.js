import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR  } from './constants';

export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;

  return {
      type: ENQUEUE_SNACKBAR,
      notification: {
          ...notification,
          key: key || new Date().getTime() + Math.random(),
      },
  };
};

export const closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key,
});


export function useSnackbar() {
  const dispatch = useDispatch();
  const {notification} = useSelector(state => ({
    notification:state.home.notification,
  }), shallowEqual);
  const enqueueAction = useCallback(data => dispatch(enqueueSnackbar(data)), [dispatch]);
  const closeAction = useCallback(data => dispatch(closeSnackbar(data)), [dispatch]);
  const removeAction = useCallback(data => dispatch(removeSnackbar(data)), [dispatch]);

  return { notification, enqueueSnackbar: enqueueAction, closeSnackbar: closeAction, removeSnackbar: removeAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
        return {
            ...state,
            notifications: [
                ...state.notifications,
                {
                    key: action.key,
                    ...action.notification,
                },
            ],
        };

    case CLOSE_SNACKBAR:
        return {
            ...state,
            notifications: state.notifications.map(notification => (
                (action.dismissAll || notification.key === action.key)
                    ? { ...notification, dismissed: true }
                    : { ...notification }
            )),
        };

    case REMOVE_SNACKBAR:
        return {
            ...state,
            notifications: state.notifications.filter(
                notification => notification.key !== action.key,
            ),
        };

    default:
        return state;
  }
}