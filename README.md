# Modifications

1. **Used Async Pipe**:
   - Simplified template logic in `CvComponent` and `DetailsCvComponent` by utilizing the `async pipe` to subscribe to observables directly in the template.
   - Eliminated manual `subscribe` calls in the component TypeScript files.

2. **Improved Error Handling**:
   - Utilized `catchError` in services to handle errors and ensure graceful fallback when fetching data fails.
   - Displayed error messages to the user using `ngx-toastr`.

3. **Enhanced Code Readability**:
   - Removed redundant code and subscriptions.
   - Ensured proper initialization of observables using `EMPTY` or default values.

### Updated Components

- **`CvComponent`**:
  - Fetches the list of CVs and displays them using the `async pipe`.
  - Shows a detailed view of the selected CV.

- **`DetailsCvComponent`**:
  - Fetches CV details by ID and uses the `async pipe` for display.
  - Implements a delete function with error handling and user feedback.

---

## What is the Async Pipe?

The `async pipe` in Angular simplifies working with observables in templates. It:
1. **Subscribes** to the observable automatically.
2. **Unsubscribes** when the component is destroyed, preventing memory leaks.
3. Updates the view automatically whenever new data is emitted by the observable.

### Benefits of the Async Pipe
- Reduces boilerplate code by handling subscriptions and unsubscriptions.
- Keeps the component code clean and focused on logic.
- Prevents memory leaks by automatically managing observable lifecycles.

### Example Usage in a Template

```html
<div *ngIf="cv$ | async as cv; else loading">
  <h1>{{ cv.name }}</h1>
  <p>{{ cv.job }}</p>
</div>
<ng-template #loading>
  <p>Loading...</p>
</ng-template>
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
