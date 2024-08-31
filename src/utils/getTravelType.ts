import {TravelType} from '../interfaces/TravelInfo.interface';

export const getTravelTypeField = (type: TravelType): string => {
  switch (type) {
    case 'fast':
      return 'Express';
    case 'schedule':
      return 'Agendado';
    case 'shared':
      return 'Express compartido';
    case 'shared-schedule':
      return 'Agendado compartido';
    default:
      return '';
  }
};
