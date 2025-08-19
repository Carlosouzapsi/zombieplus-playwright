import { test, expect } from "../support";

import data from "../support/fixtures/movies.json";

import { executeSQL } from "../support/database";

test("Deve poder cadastrar um novo filme", async ({ page }) => {
  // Importante estar logado
  const movie = data.create;
  await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);
  await page.login.visit();
  await page.login.submit("admin@zombieplus.com", "pwd123");
  await page.movies.isLoggedIn();
  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year
  );
  await page.toast.containText("Cadastro realizado com sucesso!");
});
