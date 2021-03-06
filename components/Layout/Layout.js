import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

const navLinks = [
  { path: '/', label: 'Recipe Book', id: 1 },
  { path: '/recipes/add', label: 'Add new recipe', id: 2 },
  { path: '/register', label: 'Register', id: 3 },
  { path: '/log', label: 'Log In', id: 4 },
  { path: '/recipes/my', label: 'My recipes', id: 5 }
];

export default function Layout({ children }) {
  const [session, loading] = useSession();

  return (
    <div className="w-full h-full mx-auto">
      <nav className="bg-yellow-500 w-full h-16 flex justify-between sticky top-0">
        <div className="flex flex-row ml-8">
          <img
            alt="recipe icon"
            width="50"
            height="50"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9Ik91dF9saW5lIiBkYXRhLW5hbWU9Ik91dCBsaW5lIj48cGF0aCBkPSJNMzQuOTYxNDMsMzk2LjY4NjUyQTMyLjc1NzY2LDMyLjc1NzY2LDAsMCwxLDMyLDM4My4wMjkzdi05Ljc0MTdBNzkwLjU5MzU2LDc5MC41OTM1NiwwLDAsMSw3MC45NTExNywxMjhIMjQ2LjEzNGMtNy4zNTE0NCwyMy4wODQxMS0xMy43MTUzOSw0Ni42NzE2My0xOC45NTA4Niw3MC4yNjcwOWwxNS42MjAxMSwzLjQ2NTgyQzI0OC4zMDMyOCwxNzYuOTQ0MzQsMjU1LjA4NywxNTIuMTcyNDksMjYyLjk1ODEzLDEyOEgyODBhMzIuMDM2LDMyLjAzNiwwLDAsMCwzMi0zMlY3MmE3Ljk5OTc3LDcuOTk5NzcsMCwwLDAtOC04SDI2NGEzMi4wMzYsMzIuMDM2LDAsMCwxLDMyLTMyaDEuNDQ4MjRhMzIuMDY5MjUsMzIuMDY5MjUsMCwwLDEsMzAuODcyMDcsMjMuNTgwMDhsMTEuNzcyNDYsNDMuMTY1NTNjMi43OTIsMTAuMjM1ODQsNS40MTUsMjAuNjgxMTUsNy43OTY4OCwzMS4wNDU4OWwxNS41OTM3NS0zLjU4M2MtMi40Mjk2OS0xMC41NzM3My01LjEwNi0yMS4yMy03Ljk1NDEtMzEuNjcyODZMMzQzLjc1Njg0LDUxLjM3MDEyQTQ4LjEwNTQ2LDQ4LjEwNTQ2LDAsMCwwLDI5Ny40NDgyNCwxNkg4MEE0OC4wNTQzNiw0OC4wNTQzNiwwLDAsMCwzMiw2NFY5NmEzMi4wNTU4NSwzMi4wNTU4NSwwLDAsMCwyMi41ODUzMywzMC41ODQ3OEE4MDYuNTI3LDgwNi41MjcsMCwwLDAsMTYsMzczLjI4NzZ2OS43NDE3QTQ4LjY0NDIsNDguNjQ0MiwwLDAsMCwyMC4zOTg5Myw0MDMuMzE0Wk0yOTYsODBWOTZhMTYsMTYsMCwwLDEtMzIsMFY4MFpNNDgsOTZWNjRBMzIuMDM2LDMyLjAzNiwwLDAsMSw4MCwzMkgyNjAuMjUyQTQ3LjgwODIzLDQ3LjgwODIzLDAsMCwwLDI0OCw2NFY5NmEzMS44MDg4MiwzMS44MDg4MiwwLDAsMCw0LjI5NDQzLDE2SDY0QTE2LjAxODMzLDE2LjAxODMzLDAsMCwxLDQ4LDk2WiIgZmlsbD0iIzkyNDAwZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIGQ9Ik00MTcuODIxMjksMjI4LjQ5MjE5bC0zLjY0MjU4LDE1LjU4MDA4QzQ2Mi43NjE3MiwyNTUuNDMxNjQsNDgwLDI3MC41MjU4OCw0ODAsMjgwYzAsOC4xNDUtMTEuNTYwMzYsMTcuNTk2OTItMzIuOTM1NjcsMjUuOTQ4NjEtMy43MzUyMy0xMS44OTg1Ni0xOC43NjI4OC0yMS43MzY1Ny00NC44MzQ4NC0yOS4zMDE2NGwtNC40NTksMTUuMzY2MjFjMjIuMjIwMjcsNi40NDcyNywzMy4wMDI2OCwxNC4yMjg2NCwzNC4xMjU2MSwxOS4xNTI0N0M0MDAuMTExMjEsMzIwLjgzNzQsMzUzLjY5NTY4LDMyOCwyOTYsMzI4Yy01Ny42OTgxMiwwLTEwNC4xMTUxMS03LjE2MzIxLTEzNS45MDAxNS0xNi44MzU1NywxLjU5ODg4LTcuNTUwMTcsMjQuNDE0NDktMjAuMzc4Myw3Mi45OTM0MS0yNy4wNzk0N2wtMi4xODY1Mi0xNS44NDk2MWMtMjQuMzczNTQsMy4zNjIzMS00NS4wODc0LDguNTc3MTUtNTkuOTAxMzcsMTUuMDgxMDYtMTQuNTk4MDgsNi40MDg2OS0yMy4zMzAyLDE0LjAwMTk1LTI2LjA2NywyMi42MzMxN0MxMjMuNTYxNDYsMjk3LjU5NzY2LDExMiwyODguMTQ1MzksMTEyLDI4MGMwLTMuMzcyNTYsMi43NDg1NC0xNS4zNTQ0OSwzOC4xMTY3LTI3LjkzOTQ1LDI2Ljk0MTg5LTkuNTg2NDMsNjQuNzIwNy0xNi4yODQxOCwxMDYuMzc3LTE4Ljg1ODg5bC0uOTg3My0xNS45Njk3M2MtNDMuMTA3OTEsMi42NjQ1NS04Mi40NDA5Miw5LjY4MDE4LTExMC43NTM0MiwxOS43NTQ0QzEwNC40NTgsMjUxLjMyNDcxLDk2LDI2OC4yOTE1LDk2LDI4MGExMzUuNDAxMjMsMTM1LjQwMTIzLDAsMCwwLDkuMjQyNjgsNDkuMjY3NThsMTYuMTg5OTQsNDEuNjMxODMsMTQuOTEyMTEtNS43OTg4Mi0xNi4xODk5NC00MS42MzE4NGExMjAuMjY1NzQsMTIwLjI2NTc0LDAsMCwxLTQuNTgwMDgtMTQuNDExMjVjMTAuMjYsNi44NTY4MSwyNC40NjE3MywxMi45ODI0Miw0Mi40MjA5LDE4LjIyMDMzQzE5NC45NjcyOSwzMzguMDYxNTIsMjQzLjk3OCwzNDQsMjk2LDM0NHMxMDEuMDMyNzEtNS45Mzg0OCwxMzguMDA0MzktMTYuNzIyMTdjMTcuOTU5MTctNS4yMzc5MSwzMi4xNjEtMTEuMzYzNTIsNDIuNDIwOS0xOC4yMjAzM2ExMjAuMjY1NzQsMTIwLjI2NTc0LDAsMCwxLTQuNTgwMDgsMTQuNDExMjVsLTI3LjQ2NjMsNzAuNjI3NDRhNzEuOTA1MjQsNzEuOTA1MjQsMCwwLDEtMTAuNjUwMzksMTguNTk4MTVsMTIuNTQzLDkuOTMyNjFBODcuODc4MzIsODcuODc4MzIsMCwwLDAsNDU5LjI5MSwzOTkuODk1bDI3LjQ2NjMtNzAuNjI3NDRBMTM1LjQwMTIzLDEzNS40MDEyMywwLDAsMCw0OTYsMjgwQzQ5NiwyNTEuMDg4ODcsNDQ3LjAxODU1LDIzNS4zMTkzNCw0MTcuODIxMjksMjI4LjQ5MjE5WiIgZmlsbD0iIzkyNDAwZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIGQ9Ik0zNTQuMzE0ODIsMTY2LjU3Mjc1YTE2NC4wMjA0MSwxNjQuMDIwNDEsMCwwLDAtOTAuNDUwMDcsODAuMzk4OTNsLTIzLjAyLDQ2LjAzMDI3LDE0LjMxMDU0LDcuMTU2MjUsMjMuMDIxLTQ2LjAzMjIyYTE0Ny45NzE3NiwxNDcuOTcxNzYsMCwwLDEsNzUuNjU4NTEtNzAuMjE5MywzMS43MDkzMywzMS43MDkzMywwLDAsMCwxLjU1MTE1LDQuNTYyNDRjLTIyLjA2NywxOC41NzktNDEuODk3MzQsNDMuOTAzMzgtNTYuMjc4NTEsNzIuMDI5NDJsLTIzLjU1MDI5LDQ1Ljc1LDE0LjIyNTU4LDcuMzIzMjQsMjMuNTYwNTUtNDUuNzY5NTNjMTMuMzQ4NDUtMjYuMTA2LDMxLjYyOTI3LTQ5LjU0MjU1LDUxLjkxNzY3LTY2LjcyNzc5YTMxLjg4OSwzMS44ODksMCwwLDAsMi43ODYsMS44ODMwNiwzMS4yMjc4NiwzMS4yMjc4NiwwLDAsMCwzLjMwMDIzLDEuNzA2MjRxLTQuODAzNiw4Ljk5NzUzLTEwLjAxOCwxOC43MjA1Mi0xMy4wODc2NSwyNC40Mjg0Ni0yNi45NjcyOCw1MC42NDg0M2wtMTguMTQxNjEsMzQuMjIwMjIsMTQuMTM2NzIsNy40OTQxNCwxOC4xNTI4NC0zNC4yNDIxOXExMy44MDU0MS0yNi4yMzY4MiwyNi45MjIzNi01MC41NjQ0NWM0LjEzNTE5LTcuNzE4MjYsOC4xMTEyLTE1LjE0MDE0LDExLjg2Mi0yMi4xNzY2NGExNDYuMDQ1MzYsMTQ2LjA0NTM2LDAsMCwxLTE3LjY3NzQzLDc4LjgwNTU1bC0xMS4yMzQ4NiwyMC42MDAwOSwxNC4wNDY4Nyw3LjY2MTE0LDExLjIzMzg5LTIwLjU5ODE1QTE2Mi4wNDU4NywxNjIuMDQ1ODcsMCwwLDAsNDAyLjc3MTE4LDIwMS4yNzNhMzEuMDM1MjcsMzEuMDM1MjcsMCwwLDAsOC4xMTg0Ny04Ljg0MTM3TDQ3NC41NjQ5NCw4OC4yMzQ4NmEzMS4zMjI4OSwzMS4zMjI4OSwwLDAsMC01My40NTQ1OS0zMi42NjY1TDM1Ny40MzUwNiwxNTkuNzY1MTRBMzEuNTUwNDYsMzEuNTUwNDYsMCwwLDAsMzU0LjMxNDgyLDE2Ni41NzI3NVptMTYuNzcyNTgsMS41MzUxNkw0MzQuNzYyNyw2My45MTE2MmExNS4zMjMxMywxNS4zMjMxMywwLDEsMSwyNi4xNDk5LDE1Ljk4MDQ3TDM5Ny4yMzczLDE4NC4wODgzOGExNS4zMjMxMywxNS4zMjMxMywwLDEsMS0yNi4xNDk5LTE1Ljk4MDQ3WiIgZmlsbD0iIzkyNDAwZSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIGQ9Ik00MTQuMjYyNyw0MTcuOTE0NTVhMzAuMDE3LDMwLjAxNywwLDAsMC0yMi44ODcyMS03LjcxMTkxbC03LjU1NDkzLjY4Njg5QTU2LjAxODA3LDU2LjAxODA3LDAsMCwwLDMzNiwzODRIMTA0YTU2LjAzMTM3LDU2LjAzMTM3LDAsMCwwLTQ3Ljg0MTY3LDI2Ljg5MDM4bC03LjUzMjM1LS42ODQ4MWEyOS45MTY5NSwyOS45MTY5NSwwLDEsMC0yLjY5Mjg3LDU5LjcxMDkzYy44OTUsMCwxLjc5NDQzLS4wNDA1MiwyLjY5MjM4LS4xMjIwN2w3LjUzMjEtLjY4NDY5QTU2LjM2NDkxLDU2LjM2NDkxLDAsMCwwLDEwNCw0OTZIMzM2YTU1LjU5MzMsNTUuNTkzMywwLDAsMCwzOS41OTM3NS0xNi4zOTk5LDU2LjI5MjY2LDU2LjI5MjY2LDAsMCwwLDguMjYxMDUtMTAuNDg2NTdsNy41MzA5NC42ODQ4MWMuOTAxMzcuMDgwNTcsMS44MTc4Ny4xMjE1OCwyLjcyNDEyLjEyMTU4YTI5LjkxODQyLDI5LjkxODQyLDAsMCwwLDIwLjE1Mjg0LTUyLjAwNTM3Wk00Ny4xNzY3Niw0NTMuODU5ODZBMTMuOTE4MTIsMTMuOTE4MTIsMCwxLDEsNDUuODc0LDQyNi4wODA1N3EuNjQ3NDYsMCwxLjMwMzIzLjA1OTU3bDQ4LjE2NDA2LDQuMzc4NDFhOS41MjA1NCw5LjUyMDU0LDAsMCwxLDAsMTguOTYyOWguMDAwNDlaTTc0LjkxNzkxLDQ2Ny40MDQzLDk2Ljc5LDQ2NS40MTZoLjAwMDQ5QTI1LjUyMDg5LDI1LjUyMDg5LDAsMCwwLDk2Ljc5LDQxNC41ODRMNzQuODc2MjgsNDEyLjU5MThjLjI3ODQ0LS4yOTQ5Mi41NTU4NS0uNTkwNTguODQzOTMtLjg3NzkzQTM5Ljk5OTIzLDM5Ljk5OTIzLDAsMSwxLDEwNCw0ODAsNDAuMjE4MzEsNDAuMjE4MzEsMCwwLDEsNzQuOTE3OTEsNDY3LjQwNDNabTI4OS4zNjE4OC44ODE4M0EzOS43MDIwOCwzOS43MDIwOCwwLDAsMSwzMzYsNDgwSDE0My4xMzgzMWE1NS44NzU2Nyw1NS44NzU2NywwLDAsMCwwLTgwSDMzNmEzOS45OTgxNSwzOS45OTgxNSwwLDAsMSwyOC4yNzk3OSw2OC4yODYxM1ptMjkuODMwMDctMTQuMzY2MjFjLS40MzExNSwwLS44NjcxOC0uMDE5NTMtMS4yODUxNS0uMDU3MTNsLTIuNDg3MjUtLjIyNjA3YTU2LjM1NTQzLDU2LjM1NTQzLDAsMCwwLS4wMjQtMjcuMjcxNDlsMi41MDY4My0uMjI4YTEzLjkxOTkzLDEzLjkxOTkzLDAsMSwxLDEuMjg5NTUsMjcuNzgyNzFaIiBmaWxsPSIjOTI0MDBlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
          />
          <Link href={navLinks[0].path} key={navLinks[0].id}>
            <a className="text-gray-100 p-4 text-4xl font-nav hover:text-yellow-800">
              {navLinks[0].label}
            </a>
          </Link>
        </div>
        <div>
          {session && (
            <div>
              <Link href={navLinks[4].path} key={navLinks[4].id}>
                <a className="text-gray-100 p-4 text-l font-serif hover:text-yellow-800">
                  {navLinks[4].label}
                </a>
              </Link>
              <Link href={navLinks[1].path} key={navLinks[1].id}>
                <a className="text-gray-100 p-4 text-l font-serif hover:text-yellow-800">
                  {navLinks[1].label}
                </a>
              </Link>
              <button onClick={signOut} className=" p-4 text-l font-serif text-yellow-800">
                Log out
              </button>
            </div>
          )}
          {!session && !loading && (
            <div className="mt-4">
              <Link href={navLinks[3].path} key={navLinks[1].id}>
                <a className="text-gray-100 p-4 text-l font-serif hover:text-yellow-800">
                  {navLinks[1].label}
                </a>
              </Link>
              <Link href={navLinks[2].path} key={navLinks[2].id}>
                <a className="text-gray-100 p-4 text-l font-serif hover:text-yellow-800">
                  {navLinks[2].label}
                </a>
              </Link>
              <Link href={navLinks[3].path} key={navLinks[3].id}>
                <a className="text-gray-100 p-4 text-l font-serif hover:text-yellow-800">
                  {navLinks[3].label}
                </a>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <main className="bg-gray-100 p5 h-full"> {children}</main>
    </div>
  );
}
