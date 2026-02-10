import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import {Root} from "./routes/root";
import {loader as rootLoader} from "./routes/rootLoader";
import {action as rootAction} from "./routes/createContact";
import {loader as contactLoader} from "./routes/contactLoader";
import ErrorPage from './error-page';
import Contact from "./routes/contact";
import EditContact from "./routes/edit";
import {action as editAction} from "./routes/updateContact"
import {action as deleteAction} from "./routes/deleteContact"
import {Index} from "./routes/index"
import {action as contactAction} from "./routes/updateContact"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    HydrateFallback: () => <div>Loading...</div>,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true, element: <Index />
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: deleteAction,
            errorElement: <div>Opps! there was an error</div>
          }
        ]
      }

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
