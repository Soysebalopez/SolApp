import type { Patient } from './patient';
import type { ViewApi } from '@fullcalendar/core';

declare module '@fullcalendar/core/index.js' {
  interface EventInput {
    title: string;
    start: Date;
    end?: Date;
    allDay?: boolean;
    id?: string;
    extendedProps?: {
      patientId?: string;
      visitId?: string;
      description?: string;
    };
  }

  interface DateSelectArg {
    start: Date;
    end: Date;
    allDay: boolean;
    view: ViewApi;
  }

  interface EventClickArg {
    event: {
      id: string;
      title: string;
      start: Date;
      end?: Date;
      allDay: boolean;
      extendedProps: {
        patientId?: string;
        visitId?: string;
        description?: string;
      };
    };
  }
}

declare module '@fullcalendar/react' {
  import { FC } from 'react';
  import { CalendarOptions } from '@fullcalendar/core';

  interface FullCalendarProps extends CalendarOptions {
    // Add any additional props here
  }

  const FullCalendar: FC<FullCalendarProps>;
  export default FullCalendar;
}

declare module '@fullcalendar/daygrid' {
  const plugin: any;
  export default plugin;
}

declare module '@fullcalendar/timegrid' {
  const plugin: any;
  export default plugin;
}

declare module '@fullcalendar/interaction' {
  const plugin: any;
  export default plugin;
}

declare module '@mui/x-date-pickers/DateTimePicker' {
  import { FC } from 'react';

  interface DateTimePickerProps {
    label?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
  }

  export const DateTimePicker: FC<DateTimePickerProps>;
}

export {}; 