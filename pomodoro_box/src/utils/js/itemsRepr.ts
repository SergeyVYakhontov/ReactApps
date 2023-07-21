const pomodoroRepr = (pomodoroCount: number): string => {
  const pomidoroRest = pomodoroCount % 10;

  if (10 <= pomodoroCount && pomodoroCount <= 20) {
    return "помидоров";
  }
  else if (pomidoroRest === 0) {
    return "помидоров";
  }
  else if (pomidoroRest === 1) {
    return "помидор";
  }
  else if (
    pomidoroRest === 2 ||
    pomidoroRest === 3 ||
    pomidoroRest === 4
  ) {
    return "помидора";
  }
  else {
    return "помидоров";
  }
}

const hoursRepr = (hoursCount: number): string => {
  const hoursRest = hoursCount % 10;

  if (10 <= hoursCount && hoursCount <= 20) {
    return "часов";
  }
  else if (hoursRest === 0) {
    return "часов";
  }
  else if (hoursRest === 1) {
    return "час";
  }
  else if (
    hoursRest === 2 ||
    hoursRest === 3 ||
    hoursRest === 4
  ) {
    return "часа";
  }
  else {
    return "часов";
  }
}

export { pomodoroRepr, hoursRepr };
