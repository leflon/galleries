<p align='center'>
  <img src='/github-splash.png' alt='Galleries' width='512' />
  <h2 align='center'>Simple <i>Pinterest-ish</i> gallery app</h2>
</p>
<p align='center'>
  <img src="https://img.shields.io/badge/typescript-3178c6?logo=typescript&style=for-the-badge&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/angular-F3143E?logo=angular&style=for-the-badge" alt="Angular">
  <img src="https://img.shields.io/badge/firebase-DD2C00?logo=firebase&style=for-the-badge" alt="Firebase">
</p>

Galleries is a simple web app that allows you to create and manage galleries
of images (soon enough, videos too).

You can either add images from distant locations or upload them from your
personal files.

## Features

- Create and manage galleries
- Upload images
- Add images from URLs
- Add tags to images
- _Search images by tags_ (soon)

## Technologies

This app is built with:

- [Angular](https://angular.dev)
- [Firebase](https://firebase.google.com), using
  - **Firestore**
  - **Firebase Storage**
  - **Firebase Authentication**
  - **Firebase Functions**
  - **Firebase Hosting**

## Installation

1. Clone the repository

*Using Git*

```bash
git clone https://github.com/leflon/galleries.git
```

*Using GitHub CLI*

```bash
gh repo clone leflon/galleries
```

2. Install dependencies

```bash
npm install
```

3. Create a Firebase project
   Follow [these instructions](https://firebase.google.com/docs/web/setup#add-firebase-to-your-app) to create a Firebase project and add the Firebase configuration to your app.

4. Run the app

```bash
npm start
```

## Contributing

If you want to contribute to this project, feel free to open an issue or a pull request.

Please note that this project is purely personal and has no vocation to
become a full-fledged app. It is meant to be a learning experience for me.
However, if you have any suggestions or improvements, I would be happy to implement them.
