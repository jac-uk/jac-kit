import vuexfireSerialize from '../../helpers/vuexfireSerialize';
import { formatSearchTerm } from '../../helpers/search';
import { query, where, orderBy as firestoreOrderBy, limit, startAfter as firestoreStarAfter, endBefore as firestoreEndBefore, documentId, limitToLast, getDocs } from "firebase/firestore";

const search = (searchValue) => {
  let returnValue = null;
  const searchArr = [...searchValue];
  let searchStr, searchStrNext;
  const searchLength = searchArr.length;

  if (searchValue) {
    // searchArr[0] = searchArr[0].toUpperCase(); // First letter Uppercase
    searchStr = searchArr.join('');
    const nextLastCharacter = nextChar(searchArr[searchLength - 1]);
    searchArr[searchLength - 1] = nextLastCharacter;
    searchStrNext = searchArr.join('');
    returnValue = { 'value1': searchStr, 'value2': searchStrNext };
  }
  return returnValue;
};

const nextChar = (c) => String.fromCharCode(c.charCodeAt(0) + 1);

const getValueAtObjectPath = (object, path) => {
  if (path && path.indexOf('.') >= 0) {
    let currentPath = path.substring(0, path.indexOf('.'));
    let remainingPath = path.substring(path.indexOf('.') + 1);
    let valueAtPath = object[currentPath];
    while (remainingPath.indexOf('.') >= 0) {
      currentPath = remainingPath.substring(0, remainingPath.indexOf('.'));
      remainingPath = remainingPath.substring(remainingPath.indexOf('.') + 1);
      valueAtPath = valueAtPath[currentPath];
    }
    valueAtPath = valueAtPath[remainingPath];
    return valueAtPath;
  } else {
    return object[path];
  }
};

// apply where, orderBy conditions to query
const filteredQuery = (ref, params) => {
  let queryRef = ref;
  if (params.where) {
    params.where.forEach(item => {
      queryRef = query(queryRef, where(item.field, item.comparator, item.value));
    });
  }

  let orderBy;
  if (params.orderBy) {
    orderBy = (params.orderBy && params.orderBy instanceof Array) ? params.orderBy : [params.orderBy];  // ensure orderby is an array
  }

  if (['uppercase-letter', 'lowercase-letter'].includes(params.pageItemType) && params.orderBy && params.currentLetter) {
    queryRef = query(
      queryRef,
      where(params.orderBy, '>=', params.currentLetter),
      where(params.orderBy, '<=', `${params.currentLetter}\uf8ff`),
    );
  }

  if (params.searchTerm) {
    params.searchTerm = formatSearchTerm(params.searchTerm);
    if (params.customSearch) {
      if (params.customSearchValues) {
        if (params.customSearch.field === 'id') {
          queryRef = query(queryRef, where(documentId(), 'in', params.customSearchValues));
        } else {
          queryRef = query(queryRef, where(params.customSearch.field, 'in', params.customSearchValues));
        }
      } else {
        queryRef = query(queryRef, where(params.customSearch.field, '==', null));
      }
    } else if (params.searchMap) {
      const searchParts = getSearchMap([params.searchTerm]);
      Object.keys(searchParts).forEach(searchPart => {
        queryRef = query(queryRef, where(`${params.searchMap}.${searchPart}`, '==', true));
      });
    } else {
      const returnSearch = search(params.searchTerm);
      if (returnSearch) {
        queryRef = query(
          queryRef,
          where(params.search[0], '>=', returnSearch.value1),
          where(params.search[0], '<', returnSearch.value2),
          firestoreOrderBy(params.search[0], 'asc'),
        );
        orderBy = [params.search[0]];
      }
    }
  } else if (orderBy) {
    const direction = params.direction ? params.direction : 'asc';
    orderBy.forEach(field => {
      if (field === 'documentId') {
        queryRef = query(queryRef,firestoreOrderBy(documentId(), direction));
      } else {
        queryRef = query(queryRef,firestoreOrderBy(field, direction));
      }
    });
  }

  return { queryRef, orderBy };
};

const getStartAfter = (data, orderBy) => {
  const startAfter = [];
  orderBy.forEach(field => {
    if (field === 'documentId') {
      startAfter.push(data[data.length - 1].id);
    } else {
      startAfter.push(getValueAtObjectPath(data[data.length - 1], field));
    }
  });
  return startAfter;
};

const getEndBefore = (data, orderBy) => {
  const endBefore = [];
  orderBy.forEach(field => {
    if (field === 'documentId') {
      endBefore.push(data[0].id);
    } else {
      endBefore.push(getValueAtObjectPath(data[0], field));
    }
  });
  return endBefore;
};

// apply pagination conditions (jump within 1 page) to query
const paginatedPrevNextQuery = (data, ref, params, orderBy) => {
  let queryRef = ref;

  if (params.pageSize) {
    if (params.pageChange > 0) {
      // page forward
      if (data.length) {
        const startAfter = getStartAfter(data, orderBy);
        queryRef = query(
          queryRef,
          firestoreStarAfter(...startAfter),
          limit(params.pageSize),
        );
      } else {
        queryRef = query(queryRef, limit(params.pageSize));
      }
    } else if (params.pageChange < 0) {
      // page backward
      if (data.length) {
        const endBefore = getEndBefore(data, orderBy);
        queryRef = query(
          queryRef,
          firestoreEndBefore(...endBefore),
          limitToLast(params.pageSize),
        );
      } else {
        queryRef = query(queryRef, limit(params.pageSize));
      }
    } else {
      queryRef = query(queryRef, limit(params.pageSize));
    }
  }
  return queryRef;
};

// apply pagination conditions to query
const paginatedQuery = async (data, ref, params, orderBy) => {
  let queryRef = ref;

  if (params.pageSize) {
    if (params.pageChange > 0) {
      // page forward
      if (data.length) {
        let startAfter = getStartAfter(data, orderBy);

        // should query first to update startAfter position if jump more than 1 page
        if (params.pageChange > 1) {
          const limitSize = params.pageSize * (params.pageChange - 1);
          const tmpRef = query(
            queryRef,
            firestoreStarAfter(...startAfter),
            limit(limitSize),
          );
          const snap = await getDocs(tmpRef);
          const tmpData = [];
          snap.forEach(doc => {
            tmpData.push(vuexfireSerialize(doc));
          });
          startAfter = getStartAfter(tmpData, orderBy);
        }

        queryRef = query(
          queryRef,
          firestoreStarAfter(...startAfter),
          limit(params.pageSize),
        );
      } else {
        queryRef = query(queryRef, limit(params.pageSize));
      }
    } else if (params.pageChange < 0) {
      // page backward
      if (data.length) {
        let endBefore = getEndBefore(data, orderBy);

        // should query first to update endBefore position if jump more than 1 page
        if (params.pageChange < -1) {
          const limit = params.pageSize * (Math.abs(params.pageChange) - 1);
          const tmpRef = query(
            queryRef,
            firestoreEndBefore(...endBefore),
            limitToLast(limit),
          );
          const snap = await getDocs(tmpRef);
          const tmpData = [];
          snap.forEach(doc => {
            tmpData.push(vuexfireSerialize(doc));
          });
          endBefore = getEndBefore(tmpData, orderBy);
        }

        queryRef = query(
          queryRef,
          firestoreEndBefore(...endBefore),
          limitToLast(params.pageSize),
        );
      } else {
        queryRef = query(queryRef, limit(params.pageSize));
      }
    } else {
      queryRef = query(queryRef, limit(params.pageSize));
    }
  }
  return queryRef;
};

const getTotal = async queryRef => {
  try {
    const snap = await getDocs(queryRef);
    return snap.size;
  } catch (error) {
    return null;
  }
};

const tableQuery = (data, ref, params) => {
  let queryRef = ref;
  if (params) {
    const res = filteredQuery(queryRef, params);
    queryRef = res.queryRef;
    const orderBy = res.orderBy;
    queryRef = paginatedPrevNextQuery(data, queryRef, params, orderBy);
  }
  return queryRef;
};

const tableAsyncQuery = async (data, ref, params, total) => {
  let queryRef = ref;
  if (params) {
    const res = filteredQuery(queryRef, params);
    queryRef = res.queryRef;
    const orderBy = res.orderBy;

    if (total === null) {
      total = await getTotal(queryRef); // retrieve total number of data if required
    }

    queryRef = await paginatedQuery(data, queryRef, params, orderBy);
  }
  return { queryRef, total };
};

const getSearchMap = (searchables) => {
  const searchMap = {};
  const n = 3;
  searchables.forEach(searchable => {
    if (searchable) {
      const src = searchable.toLowerCase();
      for (let i = 0, len = src.length - n; i <= len; ++i) {
        searchMap[src.substring(i, i + n)] = true;
      }
    }
  });
  return searchMap;
};

export { tableAsyncQuery };
export default tableQuery;
