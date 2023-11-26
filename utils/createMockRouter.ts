import { NextRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  const defaultRouter: NextRouter = {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    forward: jest.fn(), 
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
  };

  return {
    ...defaultRouter,
    ...router,
    events: {
      ...defaultRouter.events,
      ...(router && router.events ? router.events : {}),
    },
    query: {
      ...defaultRouter.query,
      ...(router && router.query ? router.query : {}),
    } as ParsedUrlQuery,
  };
}
