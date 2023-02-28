export const add = (a: number, b: number) => {
  return a + b;
};

export const getOsInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  let name = 'Unknown';
  let version = 'Unknown';
  if (userAgent.indexOf('win') > -1) {
    name = 'windows';
    if (userAgent.indexOf('windows nt 5.0') > -1) {
      version = 'windows 2000';
    } else if (
      userAgent.indexOf('windows nt 5.1') > -1 ||
      userAgent.indexOf('windows nt 5.2') > -1
    ) {
      version = 'windows XP';
    } else if (userAgent.indexOf('windows nt 6.0') > -1) {
      version = 'windows Vista';
    } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
      version = 'windows 7';
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
      version = 'windows 8';
    } else if (userAgent.indexOf('windows nt 6.3') > -1) {
      version = 'windows 8.1';
    } else if (
      userAgent.indexOf('windows nt 6.2') > -1 ||
      userAgent.indexOf('windows nt 10.0') > -1
    ) {
      version = 'windows 10';
    } else {
      version = 'Unknown';
    }
  } else if (userAgent.indexOf('mac') > -1) {
    version = 'mac';
  } else if (
    userAgent.indexOf('x11') > -1 ||
    userAgent.indexOf('unix') > -1 ||
    userAgent.indexOf('sunname') > -1 ||
    userAgent.indexOf('bsd') > -1
  ) {
    version = 'unix';
  } else if (userAgent.indexOf('linux') > -1) {
    if (userAgent.indexOf('android') > -1) {
      version = 'Android';
    } else {
      version = 'linux';
    }
  } else {
    version = 'Unknown';
  }
  return { name, version };
};
