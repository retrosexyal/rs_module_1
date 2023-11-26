import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';
import "jest-location-mock";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
fetchMock.enableMocks();
const localStorageMock = (function () {
    let store = {};
  
    return {
      getItem(key) {
        return store[key];
      },
  
      setItem(key, value) {
        store[key] = value;
      },
  
      clear() {
        store = {};
      },
  
      removeItem(key) {
        delete store[key];
      },
  
      getAll() {
        return store;
      },
    };
  })();
  
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
global.localStorage;

