const validateFields = fields => {
  let isAllValid = true;

  fields.forEach((field: Object) => {
    if (field.isValid) {
      const { isValid, errorMessage } = field.isValid();

      if (!isValid) {
        isAllValid = false;
        field.showErrorMessage(errorMessage);
      }
    }
  });

  return isAllValid;
};

export default validateFields;
