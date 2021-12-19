import { ChangeEvent, useEffect, useState, VFC } from 'react';
import useRaceStore from './hooks/useRaceStorage';
import {
  VStack,
  Box,
  Container,
  Flex,
  Text,
  Textarea,
  CloseButton,
} from '@chakra-ui/react';

type Props = {
  raceId: string;
  horseId: string;
  header: string;
  open: boolean;
  onClose: () => void;
};

const MyModal: VFC<Props> = ({ raceId, horseId, header, open, onClose }) => {
  const { getMemo, setMemo } = useRaceStore(raceId);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (open && horseId) {
      setInput(getMemo(horseId));
    }
  }, [open, horseId]);

  const handleClose = () => {
    setMemo(horseId, input);
    onClose();
    setInput('');
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value, input);

    setInput(e.target.value);
  };

  return open ? (
    <Container
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      right={0}
      bgColor="white"
      zIndex={50000}
    >
      <VStack height="full">
        <Flex width="full" alignItems="center" justify="space-between" py={2}>
          <Text as="h4">{header}</Text>
          <CloseButton onClick={handleClose} />
        </Flex>
        <Flex flex="1" width="full" flexDirection="column" pb={2}>
          <Textarea
            flex="1"
            width="full"
            value={input}
            onChange={handleInput}
          />
        </Flex>
      </VStack>
    </Container>
  ) : null;
};

export default MyModal;
