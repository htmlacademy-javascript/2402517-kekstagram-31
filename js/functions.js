const hoursToMinutes = (stringTime) => stringTime.split(':')[0] * 60 + (+stringTime.split(':')[1]);

const isMeetingImpossibleAtWorkingDay = (timeStartDayInHours, timeFinishDayInHours, timeStartMeetingInHours, meetingTimeInMinutes) => {
  const timeStartDayInMinutes = hoursToMinutes(timeStartDayInHours);
  let timeFinishDayInMinutes = hoursToMinutes(timeFinishDayInHours);
  const timeStartMeetingInMinutes = hoursToMinutes(timeStartMeetingInHours);

  if (timeFinishDayInMinutes < timeStartDayInMinutes) {
    timeFinishDayInMinutes += hoursToMinutes('24:00');
  }

  return timeStartDayInMinutes <= timeStartMeetingInMinutes
      && timeFinishDayInMinutes >= timeStartMeetingInMinutes + meetingTimeInMinutes;
};

isMeetingImpossibleAtWorkingDay('8:00', '07:00', '08:00', 1380);
