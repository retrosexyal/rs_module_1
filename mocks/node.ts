import { setupServer } from 'msw/node'
import { handlers } from './handler'
 
export const server = setupServer(...handlers)
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())