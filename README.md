# Accessibility (a11y) tests

A collection of test cases of accessible HTML patterns (maybe some JavaScript too).

When telling other developers what is and isn’t accessible, it’s actually hard to
a: be sure your suggestions are actually accessible and
b: convince them to use my suggestions because seeing is believing

By making simple test cases of common and sometimes specific scenarios, I can ensure the advice I give is accurate

## Test criteria

Tested with latest version of VoiceOver on MacOS Monterey and Safari 16.0 and JAWS 2022 on Chrome on Windows 11.

Yes, the tests could be more exhaustive. This is a start.

## Tests

## 1. [Alert dialog](./alert-dialog.html)

Testing an alert which displays as soon as the page loads, it should let screen-reader users know that an alert is present and it should prevent elements in the background from being read aloud of being accessed via the keyboard e.g. via the <kbd>TAB</kbd> or <kbd>TAB</kbd> + <kbd>SHIFT</kbd> keys.

This mimics a cookie notice which in practice should prevent the user accessing the page content until they accept the terms. So the user should not be able to press the <kbd>Esc</kbd> key or click outside of it to dismiss it.

## 2. [Alert dialog (using the <code>dialog</code> element)](./alert-dialog-element.html)

Same as the first test but using the new <code>dialog</code> element. Obviously this will not work in older browsers (which is not ideal if your goal is progressive enhancement) but it works in modern browsers.

[Which browsers support the dialog element?](https://caniuse.com/?search=dialog)

## 3. [Skip link](./skip-link.html)

Users should be able to skip long sections (e.g. huge lists of links in a header) and go straight to the page’s content. This is especially true when they are looking at multiple pages of the same site/app and the header content might be read to them multiple times during their journey.

The skip link should be visibly hidden (using CSS) until it is brought into focus by the user, at which point it should be positioned in a very prominent location and have a focus indicator.

## 4. [Form autocomplete/autofill](./autofill.html)

Users should be able to interact with a field in a common form e.g. one asking for their personal details like their name and address and if they have these values stored in their browser/Operating System then they should be offered the opportunity to use them and save some time.

## 5. [Opening new windows for external links](./new-window.html)

If a link is to open in a new window (tab) then the user should be informed of this.

## 6. [Form errors](./form-errors.html)

Form errors should be easy to spot and easy to navigate to to fix. We should display a summary of the errors at the top of the form and then individual errors inline next to their field. In the summary at the top, it is advantageous to link to the individual errors for ease of people wanting to fix them.

Bonus points for adding the number of errors to the page if a [age reload has occurred <code>&lt;title&gt;</code> tag. e.g. <code>&lt;title&lt;3 Errors - Page Title - Brand name&lt;/title&lt;</code>

## 6a. [Form errors live](./form-errors-live.html)

Similar to the above form errors test, except this example, adds errors as soon as the user leaves (onBlur) the form field. The screen-reader user should be immediately informed of their error - just as they are by the visual design cues.

## 7. [Loading indicator](./loading.html) and [Loading indicator alternative](./loading-status.html)

Pages show loading indicators to let a user know _something_ is happening in the background and that they should wait for it to finish. This works well for users who can see the visual indicator but what about those who cannot: we need to let screen-readers know something is happening too.

## 8. [Placeholders as labels](./placeholder-labels.html)

An experiment to see how screen-readers cope with various ways of showing placeholders instead of labels. The idea is that we want the screen-reader to announce the 'label' if the field is empty and also if it has a value so the user of the screen-reader is not left wondering which field they are editing.

## 8. [Accessible names](./accessible-names.html)

We want our buttons to read out useful context-driven names to our users e.g. in the design it may make sense to have 5 ADD buttons but for a screen-reader we need more context than that. How can we get the screen-reader to read out 'Add [name of something]' instead?

We also want our icons (especially when inside buttons) to only have an accessible name if there’s no text label alongside it.

## 9. [Details](./details.html)

Using the new(ish) <code>&lt;details&gt;</code> element in HTML can be quick way to get collapsing/expanding (i.e. 'accordion') style content.

However, it is not considered an optimal pattern for accordions.

## 10. [Custom dropdown/Typeahead](./typeahead.html)

For times when a <code>&lt;select&gt;</code> element won’t do (for various reasons) we need a custom styled one but screen-reader users and/or keyboard users shouldn’t be disadvantaged.

For typeahead dropdowns that have appear to have the equivalent of an `optgroup` we have this [Typeahead (with multiple-lists) test](./typeahead-sublist.html).

## 11. [Cards](./cards.html)

Cards are repeated blocks of data usually with an image, a heading, some copy and a link. We want our cards to be tabbale for keyboard access, have a large hit area for all users, and to give context to screen-reader users when tabbing through links on the page e.g. we don't want a screen-reader user to hear 'Find out more' doxens of times and not know where that link leads. We also want the focus indicator to be very visible, preferable around the whole card.
