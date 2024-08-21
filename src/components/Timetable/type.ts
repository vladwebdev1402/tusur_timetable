import {Building, Day, Subject} from '../../type';

export type Timetable = Partial<
  Record<Day | string, Record<number, (Subject | null)[]>>
>;

export type getPageResponse = {html: string; building: Building}[];
