import {Subject} from '@/type';
import {Flex, Text, Tooltip} from '@mantine/core';

type SubjectCardProps = {
  subject: Subject;
};

const SubjectCard = ({subject}: SubjectCardProps) => {
  return (
    <Tooltip label={subject.teachers}>
      <Flex direction="column" gap="xs" ta="center" c="black">
        <Text size="12px">{subject.subject}</Text>
        <Text size="12px">{subject.classroom}</Text>
        <Text size="12px">{subject.groups}</Text>
      </Flex>
    </Tooltip>
  );
};

export {SubjectCard};
