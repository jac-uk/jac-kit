# JAC Kit #

The story so far...

Our three main repositories (admin, apply and assessments) all have a local copy of the same set of components and helper files. Rather than maintain each copy independently we made the decision to centralise our shared code.

We considered a number of options such as submodules, symlinks and monorepo yet decided to set up a library package and use Github Packages to include the library in our repositories. The JAC Kit was born...

So far we have imported `draftComponents`, `helpers` and `tests` into the JAC Kit.

Over time we will be adding a new, tidied set of `components` utilising [Storybook](https://storybook.js.org) to help develop and document these components.

Primarily the JAC Kit is for our own benefit (code sharing, easier component development). That said we develop in the open and you never know there might be something useful to the wider community.

## Dependencies ##

This library is for [Vue.JS](https://vuejs.org) version 2.x.
It imports CSS styles from the [GOV.UK Frontend](https://frontend.design-system.service.gov.uk/#gov-uk-frontend), the [MOJ Frontend](https://github.com/ministryofjustice/moj-frontend). Some of the components and helpers import `@firebase/app` and `@firebase/storage` from [Google Firebase](https://firebase.google.com). Our `RichTextInput` component uses [`@ckeditor`](https://ckeditor.com).

