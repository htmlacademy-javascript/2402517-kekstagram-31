const hoursToMinutes = (stringTime) => {
  const arrayTime = stringTime.split(':');
  return arrayTime[0] * 60 + (+arrayTime[1]);
};

const isMeetingImpossible = (timeStartDayInHours, timeFinishDayInHours, timeStartMeetingInHours, meetingTimeInMinutes) => {
  const timeStartDayInMinutes = hoursToMinutes(timeStartDayInHours);
  let timeFinishDayInMinutes = hoursToMinutes(timeFinishDayInHours);
  let timeStartMeetingInMinutes = hoursToMinutes(timeStartMeetingInHours);

  if (timeFinishDayInMinutes < timeStartDayInMinutes) {
    timeFinishDayInMinutes += hoursToMinutes('24:00');

    if (timeStartMeetingInMinutes >= 0 && timeStartMeetingInMinutes < timeStartDayInMinutes) {
      timeStartMeetingInMinutes += hoursToMinutes('24:00');
    }
  }

  const timeFinishMeetingInMinutes = timeStartMeetingInMinutes + meetingTimeInMinutes;

  return timeStartDayInMinutes <= timeStartMeetingInMinutes
      && timeFinishDayInMinutes >= timeFinishMeetingInMinutes;
};

isMeetingImpossible('22:00', '21:00', '0:0', 1260);
