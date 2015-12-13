import { getSavedVersionsArrs } from 'helpers/localStorage';
import { uniq, comparator, sort } from 'ramda';

const verComparator = comparator((verA, verB) => {
  return (verA[0] === verB[0])  ? verA[1] > verB[1] : verA[0] > verB[0];
});

export default () => {
  const versions = getSavedVersionsArrs();
  const uniqVersions = uniq(versions);
  const sortedVersions = sort(verComparator)(uniqVersions);

  return sortedVersions.length > 0 ? sortedVersions[0] : null;
};
