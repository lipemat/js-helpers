# error

An `Error` subclass that carries per-field messages. Useful for translating `WP_Error` REST API responses into form field errors.

## Exports

### `class ErrorWithFields<T>`

Extends `Error`. Accepts an `ErrorField<T>` (which may include `additional_errors`) and exposes a `fields` map of field code to message. Field codes are normalized (e.g. `user_email` → `email`).

### `ErrorField<T>` (type)

```ts
interface ErrorField<T> {
	code: keyof T;
	data?: object | string | boolean | number;
	message: string;
	additional_errors?: Array<ErrorField<T>>;
}
```

### `Fields<T>` (type)

```ts
type Fields<T> = { [field in keyof T]?: string };
```

## Usage

```ts
import {ErrorWithFields} from '@lipemat/js-helpers';

type Form = {email: string; username: string};

throw new ErrorWithFields<Form>( {
	code: 'rest_user_invalid_email',
	message: 'Invalid email address.',
} );
// error.fields.email === 'Invalid email address.'
```
