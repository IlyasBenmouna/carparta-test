Carparta Take Home Assignment
=============================

Start the project
-----------------
step 1 - cd into frontend folder
step 2 - run `npm install`
step 3 - run `./start.sh`
step 4 - access http://localhost:5173/ in your browser

Design Decisions
----------------

1. I have kept the UI basic due to time restrictions, with the intention of making it more user-friendly in the future.
2. I have used ShadCNs component library for most of the UI components, as to save time and not spend too long with styling
3. We have one main controller that manages the API requests, state and logic of the workflow from the first step to the last step,
    and passes down methods and state to the child components which are the different pages..
4. We navigate through the different steps of the workflow by creating a 'step state' and changing this state whenever a user clicks next, back or skip.
5. All of the state is managed in local state in the controller component. If I had more time I would setup a redux/store to manage the state globally.
6. I have called all of the api requests only when the user selects one of the fields that is necessary for the request.
    This is to save on unnecessary data being returned. e.g. models are only returned when a make is selected so we only return the potential models of the car the user is selecting.
    This idea is based of the autotrader website.
7. the tests are not complete, I have only written tests for the controller component. I could write more unit tests for all UI components and screenshot tests potentially for UI
8. For the test, i've used RTL and Vitest libraries.
9. The UI for the date picker is pretty bad, but I was having difficulties with the datepicker component from ShadCN.
10. i've managed the loading state with a <p> tag, but I would like to add a loading spinner in the future or a skeleton loader