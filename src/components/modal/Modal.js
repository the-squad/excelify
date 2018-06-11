import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import hexToRgba from 'hex-to-rgba';

import Icon from '../icon/Icon';
import IconsStore from '../icon/IconsStore';

import { COLORS, COLORS_VALUES } from '../../base/Colors';
import Space from '../../base/Space';

const customStyles = {
  overlay: {
    backgroundColor: hexToRgba(COLORS_VALUES[COLORS.TEXT], 0.75),
    padding: 0,
  },
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    background: 'transparent',
    padding: 0,
    border: 'none',
    overflowX: 'hidden',
  },
};

const ModalContainer = styled.div`
  width: 600px;
  height: max-content;
  border-radius: 4px;
  background: ${COLORS_VALUES[COLORS.WHITE]};
  pointer-events: all;
`;

const Frame = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  background-color: transparent;
  padding: ${Space[5]}px;
`;

const CloseButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  position: absolute;
  right: ${Space[8]}px;
  top: ${Space[8]}px;
  cursor: pointer;
`;

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

type Props = {
  children: any,
};

type State = {
  isModalOpened: Boolean,
};

class CustomModal extends Component<Props, State> {
  state = {
    isModalOpened: true,
  };

  openModal = () => {
    document.body.style.overflowY = 'hidden';
    this.setState({
      isModalOpened: true,
    });
  };

  closeModal = () => {
    document.body.style.overflowY = 'auto';
    this.setState({ isModalOpened: false });
  };

  render() {
    const { isModalOpened } = this.state;
    const { children } = this.props;

    return (
      <Modal isOpen={isModalOpened} onRequestClose={this.closeModal} style={customStyles}>
        <Frame>
          <ModalContainer onClick={e => e.preventDefault()}>{children}</ModalContainer>

          <CloseButton onClick={this.closeModal}>
            <Icon icon={IconsStore.getIcon('close')} width={13} color={COLORS.TEXT} />
          </CloseButton>
        </Frame>
      </Modal>
    );
  }
}

export default CustomModal;
