const formatDate = (value) => {
  if (value !== null && value !== undefined) {
    if (value._seconds) {
      value = new Date(1e3 * value._seconds + value._nanoseconds / 1e6);
    }
    if (value.seconds) {
      value = new Date(1e3 * value.seconds + value.nanoseconds / 1e6);
    }
  }
};
// import convertFirestoreTimestampsToDates from './convertFirestoreTimestampsToDates';

/**
 * Vuexfire serialize method
 *
 * Provide this function as the value of the `serialize` option on calls to `firestoreAction`
 * For more information on the `serialize` option, see: https://vuefire.vuejs.org/api/vuefire.html#options-serialize
 */
const vuexfireSerialize = (snapshot) => {
  let data = snapshot.data();

  // Convert Firestore Timestamp objects to regular JavaScript Date objects
  data = formatDate(data);

  // snapshot.data() DOES NOT contain the `id` of the document. By
  // default, Vuefire adds it as a non enumerable property named id.
  // This allows to easily create copies when updating documents, as using
  // the spread operator won't copy it
  data = Object.defineProperty(data, 'id', { value: snapshot.id });

  return data;
};

export default vuexfireSerialize;
