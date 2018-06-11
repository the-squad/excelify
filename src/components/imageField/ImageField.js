import React, { Component } from 'react';

class ImageField extends Component {
  onChange = () => {};

  setProps = (onChange, callbackParams) => {
    this.onChange = onChange;
    this.callbackParams = callbackParams;
  };

  callbackParams;

  uploadPhoto = () => {
    const file = this.photoInput.files[0];
    this.photoInput.value = '';
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.onChange(fileReader.result, this.callbackParams);
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  click = () => {
    this.photoInput.click();
  };

  render() {
    return (
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={this.uploadPhoto}
        ref={photoInput => {
          this.photoInput = photoInput;
        }}
        style={{ display: 'none' }}
      />
    );
  }
}

export default ImageField;
