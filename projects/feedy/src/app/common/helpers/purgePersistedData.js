import toastr from 'toastr/toastr';

import server from 'server/entry';
import { purge } from 'server/common/helpers/localStorage';

export const purgeReloading = () => {
  purge();
  toastr.info('Database purged');
  setTimeout(() => window.location.reload(), 1000);
};

const compareVersionsAndPurge = (versionSegments, pastVersionSegments) => {
  if (pastVersionSegments[0] < versionSegments[0] ||
    pastVersionSegments[1] < versionSegments[1]) {
    purge();
    toastr.info('Previous data purged as it was from another version');
  }
};

export const purgeDataFromOlderVersions = (version) => {
  const versionSegments = version.split('.').map(Number);
  const pastVersionSegments = server.getDataSavedVersion();

  if (pastVersionSegments) {
    compareVersionsAndPurge(versionSegments, pastVersionSegments);
  }
};
