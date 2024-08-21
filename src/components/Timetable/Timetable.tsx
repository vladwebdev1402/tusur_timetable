import {ChangeEvent, useState} from 'react';
import {getPage} from '@/api';
import {useDebounce, useFetch} from '@/hooks';
import {BUILDINGS, BUTTON_WEEKS, COUPLES_PER_DAY, MY_GROUP} from './lib';
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Loader,
  ScrollArea,
  Table,
  Text,
  Title,
} from '@mantine/core';
import {SubjectCard} from '@/ui';
import {useParsePage} from './hooks';
import clsx from 'clsx';

const Timetable = () => {
  const [currentWeek, setCurrentWeek] = useState(BUTTON_WEEKS[0].weekId);
  const [group, setGroup] = useState(MY_GROUP);

  const {data, isLoading, error} = useFetch(async () => {
    const response = await Promise.all(
      BUILDINGS.map(async building => {
        const res = await getPage(building, currentWeek);
        return {
          building,
          html: res.data,
        };
      })
    );
    return response;
  }, [currentWeek]);

  const {timetable} = useParsePage(data, group);

  const handleGroupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newGroup = e.target.value.replace(/[^0-9-А-Я]/g, '');
    setGroup(newGroup);
  };

  const debounceHandleGroupChange = useDebounce(handleGroupChange, 800);

  return (
    <Container pt="md" pb="100px">
      <Title order={1} ta="center">
        Расписание
      </Title>
      <Flex wrap="wrap" gap="sm" mt="md">
        {BUTTON_WEEKS.map(button => (
          <Button
            h="auto"
            ta="left"
            variant={currentWeek === button.weekId ? 'filled' : 'default'}
            onClick={() => setCurrentWeek(button.weekId)}
            disabled={isLoading && currentWeek !== button.weekId}
            key={button.weekId}
          >
            <Flex direction="column">
              <Text>{button.parity}</Text>
              <Text>{button.title}</Text>
            </Flex>
          </Button>
        ))}
      </Flex>
      <Box mt="md">
        <Input
          placeholder="Группа"
          onChange={debounceHandleGroupChange}
          disabled={isLoading}
          defaultValue={MY_GROUP}
        />
      </Box>
      {error && (
        <Text c="red" ta="center" mt="md">
          {error}
        </Text>
      )}
      {isLoading && (
        <Flex justify="center">
          <Loader h={150} w={150} mt="150px" />
        </Flex>
      )}
      {timetable && !isLoading && (
        <ScrollArea mt="md">
          <Table layout="fixed" miw={'768px'}>
            <Table.Thead>
              <Table.Tr>
                {Object.keys(timetable).map(day => (
                  <Table.Th key={day}>{day}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Array(COUPLES_PER_DAY)
                .fill(null)
                .map((_, idx) => (
                  <Table.Tr key={idx}>
                    {Object.keys(timetable).map(
                      day =>
                        timetable[day] && (
                          <Table.Td
                            key={`${day}${idx}`}
                            bg={clsx({
                              '#d7d7f1':
                                timetable[day][idx][0]?.type ===
                                'training_type_laboratory',
                              '#d5f6ff':
                                timetable[day][idx][0]?.type ===
                                'training_type_practice',
                              '#e4ffd5':
                                timetable[day][idx][0]?.type ===
                                'training_type_lecture',
                            })}
                          >
                            {(timetable[day][idx][0] && (
                              <SubjectCard subject={timetable[day][idx][0]} />
                            )) || <Box h="80px" />}
                          </Table.Td>
                        )
                    )}
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      )}
    </Container>
  );
};

export {Timetable};
