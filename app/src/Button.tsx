import React, { VFC } from 'react';
import { createPortal } from 'react-dom';
import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

type Props = {
  container: Element;
  onClick: () => void;
};

const MyButton: VFC<Props> = ({ container, onClick }) => {
  return createPortal(
    <EditIcon ml="6px" transform="translateY(-2px)" onClick={onClick} />,
    container
  );
};

export default MyButton;
