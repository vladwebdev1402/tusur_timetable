import {MantineProvider} from '@mantine/core';

import {Timetable} from './components';
import {theme} from './theme';

import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Timetable />
    </MantineProvider>
  );
}

export default App;
