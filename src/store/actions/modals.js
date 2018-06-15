export const MODALS = {
  UPLOAD: {
    OPEN: 'OPEN_UPLOAD_MODAL',
    CLOSE: 'CLOSE_UPLOAD_MODAL',
  },
};

export const openUploadModal = (): Object => ({
  type: MODALS.UPLOAD.OPEN,
});

export const closeUploadModal = (): Object => ({
  type: MODALS.UPLOAD.CLOSE,
});
