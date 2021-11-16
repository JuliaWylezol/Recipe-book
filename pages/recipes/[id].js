import Layout from '../../components/Layout/Layout';
import Head from 'next/head';
import Link from 'next/link';
import getRecipes from '../../services/recipes/getRecipes';
import { getRecipeInfo } from '../../services/recipes/getRecipeInfo';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import isAuthorized from '../../services/recipes/isAuthorized';
// import deleteRecipe from '../../services/recipes/delete';

export const getStaticPaths = async () => {
  const recipes = await getRecipes();

  return {
    paths: recipes.map((recipe) => ({ params: { id: String(recipe.id) } })),
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const recipe = await getRecipeInfo(params.id);

  return {
    revalidate: 30,
    props: {
      recipe
    }
  };
};

export default function RecipePage({ recipe }) {
  const ingredients = recipe.ingredients.split(';');
  const preparation = recipe.preparation.split(';');
  const router = useRouter();
  const [session] = useSession();

  return (
    <Layout>
      <Head>
        <title> {recipe.name} </title>
      </Head>

      <div className="w-200 h-auto flex flex-col items-center my-12 mx-auto p-4 rounded-lg font-serif bg-yellow-100">
        <div className="flex justify-around w-32 my-2 pb-4 self-end">
          {isAuthorized(recipe, session) && (
            <Link href={`/recipes/${recipe.id}/edit`}>
              <button className="ml-4">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQwMS41MjI4OSA0MDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTM3MC41ODk4NDQgMjUwLjk3MjY1NmMtNS41MjM0MzggMC0xMCA0LjQ3NjU2My0xMCAxMHY4OC43ODkwNjNjLS4wMTk1MzIgMTYuNTYyNS0xMy40Mzc1IDI5Ljk4NDM3NS0zMCAzMGgtMjgwLjU4OTg0NGMtMTYuNTYyNS0uMDE1NjI1LTI5Ljk4MDQ2OS0xMy40Mzc1LTMwLTMwdi0yNjAuNTg5ODQ0Yy4wMTk1MzEtMTYuNTU4NTk0IDEzLjQzNzUtMjkuOTgwNDY5IDMwLTMwaDg4Ljc4OTA2MmM1LjUyMzQzOCAwIDEwLTQuNDc2NTYzIDEwLTEwIDAtNS41MTk1MzEtNC40NzY1NjItMTAtMTAtMTBoLTg4Ljc4OTA2MmMtMjcuNjAxNTYyLjAzMTI1LTQ5Ljk2ODc1IDIyLjM5ODQzNy01MCA1MHYyNjAuNTkzNzVjLjAzMTI1IDI3LjYwMTU2MyAyMi4zOTg0MzggNDkuOTY4NzUgNTAgNTBoMjgwLjU4OTg0NGMyNy42MDE1NjItLjAzMTI1IDQ5Ljk2ODc1LTIyLjM5ODQzNyA1MC01MHYtODguNzkyOTY5YzAtNS41MjM0MzctNC40NzY1NjMtMTAtMTAtMTB6bTAgMCIgZmlsbD0iI2I0NTMwOSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTM3Ni42Mjg5MDYgMTMuNDQxNDA2Yy0xNy41NzQyMTgtMTcuNTc0MjE4LTQ2LjA2NjQwNi0xNy41NzQyMTgtNjMuNjQwNjI1IDBsLTE3OC40MDYyNSAxNzguNDA2MjVjLTEuMjIyNjU2IDEuMjIyNjU2LTIuMTA1NDY5IDIuNzM4MjgyLTIuNTY2NDA2IDQuNDAyMzQ0bC0yMy40NjA5MzcgODQuNjk5MjE5Yy0uOTY0ODQ0IDMuNDcyNjU2LjAxNTYyNCA3LjE5MTQwNiAyLjU2MjUgOS43NDIxODcgMi41NTA3ODEgMi41NDY4NzUgNi4yNjk1MzEgMy41MjczNDQgOS43NDIxODcgMi41NjY0MDZsODQuNjk5MjE5LTIzLjQ2NDg0M2MxLjY2NDA2Mi0uNDYwOTM4IDMuMTc5Njg3LTEuMzQzNzUgNC40MDIzNDQtMi41NjY0MDdsMTc4LjQwMjM0My0xNzguNDEwMTU2YzE3LjU0Njg3NS0xNy41ODU5MzcgMTcuNTQ2ODc1LTQ2LjA1NDY4NyAwLTYzLjY0MDYyNXptLTIyMC4yNTc4MTIgMTg0LjkwNjI1IDE0Ni4wMTE3MTgtMTQ2LjAxNTYyNSA0Ny4wODk4NDQgNDcuMDg5ODQ0LTE0Ni4wMTU2MjUgMTQ2LjAxNTYyNXptLTkuNDA2MjUgMTguODc1IDM3LjYyMTA5NCAzNy42MjUtNTIuMDM5MDYzIDE0LjQxNzk2OXptMjI3LjI1NzgxMi0xNDIuNTQ2ODc1LTEwLjYwNTQ2OCAxMC42MDU0NjktNDcuMDkzNzUtNDcuMDkzNzUgMTAuNjA5Mzc0LTEwLjYwNTQ2OWM5Ljc2MTcxOS05Ljc2MTcxOSAyNS41ODk4NDQtOS43NjE3MTkgMzUuMzUxNTYzIDBsMTEuNzM4MjgxIDExLjczNDM3NWM5Ljc0NjA5NCA5Ljc3MzQzOCA5Ljc0NjA5NCAyNS41ODk4NDQgMCAzNS4zNTkzNzV6bTAgMCIgZmlsbD0iI2I0NTMwOSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L3N2Zz4="
                  alt="edit"
                  className="w-10 h-10"
                />
              </button>
            </Link>
          )}
          {/* {isAuthorized(recipe, session) && (
            <button onClick={deleteRecipe(recipe.airtableID)} className="ml-2">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTQyNCA2NGgtODh2LTE2YzAtMjYuNDY3LTIxLjUzMy00OC00OC00OGgtNjRjLTI2LjQ2NyAwLTQ4IDIxLjUzMy00OCA0OHYxNmgtODhjLTIyLjA1NiAwLTQwIDE3Ljk0NC00MCA0MHY1NmMwIDguODM2IDcuMTY0IDE2IDE2IDE2aDguNzQ0bDEzLjgyMyAyOTAuMjgzYzEuMjIxIDI1LjYzNiAyMi4yODEgNDUuNzE3IDQ3Ljk0NSA0NS43MTdoMjQyLjk3NmMyNS42NjUgMCA0Ni43MjUtMjAuMDgxIDQ3Ljk0NS00NS43MTdsMTMuODIzLTI5MC4yODNoOC43NDRjOC44MzYgMCAxNi03LjE2NCAxNi0xNnYtNTZjMC0yMi4wNTYtMTcuOTQ0LTQwLTQwLTQwem0tMjE2LTE2YzAtOC44MjIgNy4xNzgtMTYgMTYtMTZoNjRjOC44MjIgMCAxNiA3LjE3OCAxNiAxNnYxNmgtOTZ6bS0xMjggNTZjMC00LjQxMSAzLjU4OS04IDgtOGgzMzZjNC40MTEgMCA4IDMuNTg5IDggOHY0MGMtNC45MzEgMC0zMzEuNTY3IDAtMzUyIDB6bTMxMy40NjkgMzYwLjc2MWMtLjQwNyA4LjU0NS03LjQyNyAxNS4yMzktMTUuOTgxIDE1LjIzOWgtMjQyLjk3NmMtOC41NTUgMC0xNS41NzUtNi42OTQtMTUuOTgxLTE1LjIzOWwtMTMuNzUxLTI4OC43NjFoMzAyLjQ0eiIgZmlsbD0iI2I0NTMwOSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIGQ9Im0yNTYgNDQ4YzguODM2IDAgMTYtNy4xNjQgMTYtMTZ2LTIwOGMwLTguODM2LTcuMTY0LTE2LTE2LTE2cy0xNiA3LjE2NC0xNiAxNnYyMDhjMCA4LjgzNiA3LjE2MyAxNiAxNiAxNnoiIGZpbGw9IiNiNDUzMDkiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD48cGF0aCBkPSJtMzM2IDQ0OGM4LjgzNiAwIDE2LTcuMTY0IDE2LTE2di0yMDhjMC04LjgzNi03LjE2NC0xNi0xNi0xNnMtMTYgNy4xNjQtMTYgMTZ2MjA4YzAgOC44MzYgNy4xNjMgMTYgMTYgMTZ6IiBmaWxsPSIjYjQ1MzA5IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PHBhdGggZD0ibTE3NiA0NDhjOC44MzYgMCAxNi03LjE2NCAxNi0xNnYtMjA4YzAtOC44MzYtNy4xNjQtMTYtMTYtMTZzLTE2IDcuMTY0LTE2IDE2djIwOGMwIDguODM2IDcuMTYzIDE2IDE2IDE2eiIgZmlsbD0iI2I0NTMwOSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                alt="delete"
                className="w-10 h-10"
              />
            </button>
          )} */}
          <Link href="/">
            <button className="ml-2">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTMyNS45NjcsMjU2bDc5LjQwNS03OS4yM2M5LjM1OC05LjMzNywxNC41MTEtMjEuNzYxLDE0LjUxMi0zNC45ODFjMC0xMy4yMjEtNS4xNTQtMjUuNjQ1LTE0LjUxMi0zNC45ODQgICAgYy0wLjAwMSwwLTAuMDAyLDAtMC4wMDIsMGMtMTkuMjQ2LTE5LjIwNC01MC41NjQtMTkuMjAzLTY5LjgxMSwwTDI1NiwxODYuMTg4bC03OS41NTktNzkuMzg1ICAgIGMtMTkuMjQ4LTE5LjIwMi01MC41NjUtMTkuMjAzLTY5LjgxMywwLjAwMWMtOS4zNTksOS4zMzktMTQuNTEyLDIxLjc2NC0xNC41MTIsMzQuOTg0YzAuMDAxLDEzLjIyLDUuMTU0LDI1LjY0NCwxNC41MTMsMzQuOTgxICAgIEwxODYuMDMzLDI1NmwtNzkuNDA1LDc5LjIzYy05LjM1OSw5LjMzOC0xNC41MTIsMjEuNzYyLTE0LjUxMiwzNC45ODJjMCwxMy4yMiw1LjE1MywyNS42NDUsMTQuNTEzLDM0Ljk4MyAgICBjOS42MjQsOS42MDMsMjIuMjYyLDE0LjQwNSwzNC45MDUsMTQuNDAzYzEyLjY0MS0wLjAwMSwyNS4yODQtNC44MDIsMzQuOTA3LTE0LjQwM0wyNTYsMzI1LjgxMmw3OS41NTksNzkuMzg1ICAgIGMxOS4yNDgsMTkuMjAyLDUwLjU2NSwxOS4yMDMsNjkuODEzLTAuMDAxYzkuMzU5LTkuMzM5LDE0LjUxMi0yMS43NjQsMTQuNTEyLTM0Ljk4NGMtMC4wMDEtMTMuMjItNS4xNTQtMjUuNjQ0LTE0LjUxMy0zNC45ODEgICAgTDMyNS45NjcsMjU2eiBNMzg0LjUwNywzODQuMjg3Yy03Ljc0Miw3LjcyNS0yMC4zNCw3LjcyNS0yOC4wODQsMGwtODkuOTktODkuNzkzYy0yLjg4My0yLjg3Ni02LjY1Ny00LjMxNS0xMC40MzItNC4zMTUgICAgcy03LjU0OSwxLjQzOC0xMC40MzIsNC4zMTVsLTg5Ljk5LDg5Ljc5M2MtNy43NDMsNy43MjQtMjAuMzQzLDcuNzI2LTI4LjA4NCwwYy0zLjc2NS0zLjc1Ni01Ljg0LTguNzU2LTUuODQtMTQuMDc0ICAgIGMwLjAwMS01LjMxOCwyLjA3NC0xMC4zMTcsNS44MzktMTQuMDczbDg5Ljg4My04OS42ODVjMi43NzctMi43Nyw0LjMzNy02LjUzMiw0LjMzNy0xMC40NTVzLTEuNTYxLTcuNjg1LTQuMzM3LTEwLjQ1NSAgICBsLTg5Ljg4My04OS42ODVjLTMuNzY0LTMuNzU2LTUuODM4LTguNzU1LTUuODM4LTE0LjA3M2MwLTUuMzE4LDIuMDczLTEwLjMxOCw1LjgzOS0xNC4wNzRjNy43NDItNy43MjUsMjAuMzQtNy43MjUsMjguMDg0LDAgICAgbDg5Ljk5LDg5Ljc5M2M1Ljc2NSw1Ljc1MiwxNS4wOTgsNS43NTIsMjAuODYzLDBsODkuOTktODkuNzkzYzcuNzQxLTcuNzI0LDIwLjM0Mi03LjcyNiwyOC4wODUsMCAgICBjMy43NjQsMy43NTcsNS44MzksOC43NTYsNS44MzksMTQuMDc0Yy0wLjAwMSw1LjMxOC0yLjA3NCwxMC4zMTYtNS44MzgsMTQuMDczbC04OS44ODMsODkuNjg1ICAgIGMtMi43NzcsMi43Ny00LjMzNyw2LjUzMi00LjMzNywxMC40NTVzMS41NjEsNy42ODUsNC4zMzcsMTAuNDU1bDg5Ljg4Myw4OS42ODVjMy43NjQsMy43NTYsNS44MzgsOC43NTUsNS44MzgsMTQuMDczICAgIEMzOTAuMzQ2LDM3NS41MywzODguMjczLDM4MC41MywzODQuNTA3LDM4NC4yODd6IiBmaWxsPSIjYjQ1MzA5IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxnPgoJCTxwYXRoIGQ9Ik00MzguMTU0LDBINzMuODQ2QzMzLjEyNywwLDAsMzMuMTI3LDAsNzMuODQ2djM2NC4zMDhDMCw0NzguODczLDMzLjEyNyw1MTIsNzMuODQ2LDUxMmgzNjQuMzA4ICAgIEM0NzguODczLDUxMiw1MTIsNDc4Ljg3Myw1MTIsNDM4LjE1NFY3My44NDZDNTEyLDMzLjEyNyw0NzguODczLDAsNDM4LjE1NCwweiBNNDgyLjQ2Miw0MzguMTU0ICAgIGMwLDI0LjQzMS0xOS44NzYsNDQuMzA4LTQ0LjMwOCw0NC4zMDhINzMuODQ2Yy0yNC40MzEsMC00NC4zMDgtMTkuODc2LTQ0LjMwOC00NC4zMDhWNzMuODQ2ICAgIGMwLTI0LjQzMSwxOS44NzYtNDQuMzA4LDQ0LjMwOC00NC4zMDhoMzY0LjMwOGMyNC40MzEsMCw0NC4zMDgsMTkuODc2LDQ0LjMwOCw0NC4zMDhWNDM4LjE1NHoiIGZpbGw9IiNiNDUzMDkiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTwvZz4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8L2c+PC9zdmc+"
                alt="exit"
                className="w-10 h-10"
              />
            </button>
          </Link>
        </div>
        <div className="flex justify-between w-3/4">
          <div className="flex flex-col">
            <h2 className="font-nav text-4xl text-yellow-800 w-4/5">{recipe.name}</h2>
            <p className="mt-12 text-lg">Category: {recipe.category}</p>
            <p className="mt-6 text-lg">Price: {recipe.price}</p>
            <p className="mt-6 text-lg">Difficulty: {recipe.difficulty}</p>
          </div>
          <img src={recipe.photo[0].url} className="w-64 h-64 rounded-xl" alt=""></img>
        </div>
        <div className="flex flex-col w-3/4 mb-4">
          <h3 className=" text-xl text-yellow-800 my-5 pt-8">Ingredients</h3>
          {ingredients.map((ingredient) => (
            <ul key={ingredient}>
              <li>
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-3 inline-block"></span>
                {ingredient}
              </li>
            </ul>
          ))}
        </div>
        <div className="flex flex-col w-3/4 pb-10">
          <h3 className="text-xl text-yellow-800 my-5">Preparation</h3>
          {preparation.map((step) => (
            <ul key={step}>
              <li className="mb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 mr-3 inline-block"></span>
                {step}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </Layout>
  );
}
