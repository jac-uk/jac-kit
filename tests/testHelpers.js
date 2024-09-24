import { shallowMount } from '@vue/test-utils';
import { Timestamp } from '@firebase/firestore'
import { vi } from 'vitest';

const mocks = {
  route: {
    name: 'name-of-current-route',
    params: {
      id: 'abc123',
    },
    path: 'name/of/current/path',
  },
  router: {
    push: vi.fn(),
    replace: vi.fn(),
  },
  store: {
    dispatch: vi.fn(),
    state: {
      auth: {
        currentUser: {
          role: 'superadmin',
        },
      },
      vacancy: {
        record: {
          typeOfExercise: null,
          referenceNumber: null,
          isCourtOrTribunal: null,
          appointmentType: null,
          welshRequirement: null,
        },
      },
      candidate: {
        record: {
        },
      },
      application: {
        record: { progress: { started: true } },
      },
      applications: {
        records: [],
      },
      qualifyingTest: {
        record: {
          title: null,
        },
      },
      qualifyingTestResponses: {
        record: {
        },
      },
    },
    getters: {
      'vacancy/getCloseDate': new Date(),
      'vacancy/id': vi.fn(),
      'application/data': () => vi.fn(),
      'vacancies/bind': () => vi.fn(), //see views/vacancies.spec.js
      'qualifyingTest/data': () => vi.fn(),
    },
  },
};

const createTestSubject = (component, customMountOptions = {
  mocks: {},
  stubs: [],
  propsData: {},
}) => {
  return shallowMount(component, {
    mocks: {
      $route: mocks.route,
      $router: mocks.router,
      $store: mocks.store,
      ...customMountOptions.mocks,
    },
    stubs: [...customMountOptions.stubs],
    propsData: { ...customMountOptions.propsData },
  });
};

export {
  mocks,
  createTestSubject,
  Timestamp
};
