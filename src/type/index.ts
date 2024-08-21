export type Subject = {
  subject: string;
  groups: string;
  teachers: string;
  classroom: string;
  type: SubjectType;
};

export type Day = 'пн' | 'вт' | 'ср' | 'чт' | 'пт' | 'сб';
export type Building = 'gk' | 'f' | 'mk' | 'ulk' | 'rk';
export type SubjectType =
  | 'training_type_practice'
  | 'training_type_lecture'
  | 'training_type_laboratory'
  | null;

export enum TranslateBuilding {
  'gk' = 'гк',
  'f' = 'ф',
  'mk' = 'мк',
  'ulk' = 'улк',
  'rk' = 'рк',
}
