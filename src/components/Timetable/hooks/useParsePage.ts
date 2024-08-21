import {load} from 'cheerio';
import {useMemo} from 'react';
import {SubjectType, TranslateBuilding} from '@/type';
import {getPageResponse, Timetable} from '../type';
import {COUPLES_PER_DAY, DAYS} from '../lib';

export const useParsePage = (data: getPageResponse | null, group: string) => {
  const timetable = useMemo(() => {
    const parsePage = () => {
      const timetable: Timetable = {};
      if (data) {
        data.forEach(({building, html}) => {
          const $ = load(html);

          const rows = $('table tbody tr');

          rows.each((_, row) => {
            const el = $(row).children();

            const classroom =
              TranslateBuilding[building] +
              el.children('.auditorium_info').text().replace('\\n', '');

            const couples = $(row).children('td');

            couples.each((idx, couple) => {
              const day = DAYS[Math.floor(idx / COUPLES_PER_DAY)];
              const coupleNumber = idx % COUPLES_PER_DAY;

              if (timetable[day] === undefined) {
                timetable[day] = {};
              }

              if (timetable[day][coupleNumber] === undefined)
                timetable[day][coupleNumber] = [];

              if ($(couple).has('.hidden')) {
                const hiddenBlock = $(couple).children('.hidden');
                const element = $(hiddenBlock);
                const tags = element.children('p');

                if ($(tags[1]).text().includes(group)) {
                  timetable[day][coupleNumber].push({
                    subject: $(tags[0]).text(),
                    groups: $(tags[1]).text(),
                    teachers: $(tags[2]).text(),
                    type:
                      (hiddenBlock
                        .parent()
                        .attr('class')
                        ?.split(' ')[1] as SubjectType) || null,
                    classroom,
                  });
                }
                return;
              }
              timetable[day][coupleNumber] = [null];
            });
          });
        });

        return timetable;
      }

      return null;
    };
    return parsePage();
  }, [data, group]);

  return {timetable};
};
