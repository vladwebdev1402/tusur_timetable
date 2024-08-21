import axios from 'axios';

export const getPage = async (building: string, weekId = 735) => {
  return await axios.get<string>(
    `https://timetable.tusur.ru/buildings/${building}?week_id=${weekId}`,
    {
      headers: {
        Accept: '*/*',
      },
    }
  );
};
