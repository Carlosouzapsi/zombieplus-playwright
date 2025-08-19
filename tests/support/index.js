import { test as base, expect } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { MoviesPage } from "../pages/MoviesPage";
import { LandingPage } from "../pages/LandingPage";
import { Toast } from "../pages/Components";

// usando injeção de dependência
const test = base.extend({
  page: async ({ page }, use) => {
    await use({
      ...page,
      landing: new LandingPage(page),
      login: new LoginPage(page),
      movies: new MoviesPage(page),
      toast: new Toast(page),
    });
  },
});

export { test, expect };
