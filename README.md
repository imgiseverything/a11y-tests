# Accessibility (a11y) tests

A collection of test cases of accessible HTML patterns (maybe some JavaScript too).

When telling other developers what is and isn't accessible, it's actually hard to
a: be sure your suggestions are actually accessible and
b: convince them to use my suggestions because seeing is believing

By making simple test cases of common and sometimes specific scenarios, I can ensure the advice I give is accurate

## Test criteria

Tested with latest version of VoiceOver on MacOS Monterey and Safari 16.0 and JAWS 2022 on Chrome on Windows 11.

Yes, the tests could be more exhaustive. This is a start.

## Tests

## 1. [Alert dialog](./alert-dialog.html)

Testing an alert which displays as soon as the page loads, it should let screen-reader users know that an alert is present and it should prevent elements in the background from being read aloud of being accessed via the keyboard e.g. via the <kbd>TAB</kbd> or <kbd>TAB</kbd> + <kbd>SHIFT</kbd> keys.

This mimics a cookie notice which in practice should prevent the user accessing rhe page content until they accept the terms. So the user should not be able to press the <kbd>Esc</kbd> key or click outside of it to dismiss it.

## 2. [Alert dialog (using the <code>dialog</code> element)](./alert-dialog-element.html)

Same as the first test but using the new <code>dialog</code> element. Obviously this will not work in older browsers which is not ideal if your goal is progressive enhancement but it works in modern browsers.

[Which browsers support the dialog element?](https://caniuse.com/?search=dialog)

## 3. [Skip link](./skip-link.html)

Users should be able to skip long sections like huge lists of links in a header and go straight to the page's content. This is especially true when they are looking at multiple pages of the same site/app.

The skip link should be visibly hidden (using CSS) until it is brought into focus by the user, at which point it should be position in a very prominent location.
