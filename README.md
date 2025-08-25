# ChatExpress

A real-time messaging app built with NodeJS, Express, and MongoDB. Includes user authentication, data/session persistence, user Avatars, and vulgarity filtering. ChatExpress's name is inspired by it being a Chatting application built with the Express library.

**Live Preview:** 🚧 Migrating from Railway

## User

A user is any individual currently accessing the application.

### Registration

Registering allows a user to send messages and potentially upgrade to member status.

- **Optional:** avatar image, first name, last name, email
- **Required:** username, password, password confirmation
  - _Provided password is hashed before being stored on the database and the confirmation is deleted immediately after it's validated._

### Status

User status defines the level of access a user has to the app's data and features.

- **Anonymous (not registered)**
  - View message history with redacted usernames and timestamps.
  - Register for an account.
- **Basic (registered)**
  - View message history with redacted usernames and timestamps.
  - Send Messages.
  - Upgrade to Member by answering the question in the `profile` page correctly.
- **Member**
  - View Message history with full details.
  - Send Messages.
  - Update user avatar once every 12 hours.
- **Admin**
  - Must be set directly in database.
  - Can do everything any other user can as well as delete messages.

## Learning Outcome

<details><summary> New</summary>

- **Authentication**
  - Configured and deployed a local authentication strategy using the `Passport.js` middleware.
    - Paired with `express-session` to persist authentication state across sessions.
    - Set up route authorization to securely control user access.
    - Implemented `bcrypt` password hashing.
- **Cloudinary**
  - **User Avatar Management:** Utilized the `Cloudinary` Node.js SDK to handle user avatar uploads.
    - Completed the "_Introduction to Cloudinary for Node.js Developers (90-Minute Course)_"
    - Leveraged transforms and inline CDN imports for efficient image storage, caching, and serving.
- **File Uploading**
  - **Multer:** Incorporated the `multer` middleware to parse image file uploads (multipart/form-data)
    - Stored the Buffer object containing the binary data in local memory.
  - **Streamifier:** Used `streamifier` to create a readable stream from the Multer Buffer Object.
    - Piped the stream data directly to cloudinary storage.
- **Handlebars**
  - **Configuration:** Configured and utilized the `Handlebars` template engine for server-side rendering.
  - **Features Used:** Partials, Layouts, and various Block/Built-in/Custom helpers.
- **Obscenity:** Integrated the Obscenity library to censor explicit messages.

</details>

<details><summary> Reinforced </summary>

- **AJAX**
  - **Client Side Scripting:** Configured client side scripts to handle server-side communication.
    - Enabled smooth dynamic interface updates.
    - Utilized a central `formHandler` to process post requests and server responses
- **Validation**
  - **Input Sanitization and Validation:** Implemented input sanitization and validation middleware using `express-validator`.
    - Ensured consistent and safe inputs from the user.
- **MongoDB/Mongoose**
  - **Schema Design and Document Management:** Created and structured document schemas using `Mongoose`.
    - Stored, managed, and executed queries on MongoDB documents.
    - Utilized Mongo's aggregation framework to retrieve and return specific data.
<!-- - **Deployment**
  - **Platform:** Deployed using [Railway](https://railway.app/).
    - Leveraged Railway's robust and intuitive platform to deploy and manage fullstack applications efficiently. -->
- **UML Class Diagrams**
  - **Tool:** Used [plantUML](https://plantuml.com/) to create UML Class diagram.
    - Planned the general structure of database document models.
- **Responsive Design**
  - **Device Accessibility:** Designed the application to be easily accessible across various device dimensions.
    - Incorporated dynamic CSS properties and a condensed mobile navigation for devices with smaller screens.

</details>

## Created With

<details><summary>Core</summary>

- [**JavaScript**](https://ecma-international.org/publications-and-standards/standards/): Primary language.
- [**HTML5**](https://html.spec.whatwg.org/multipage/): DOM structuring.
- [**CSS3**](https://www.w3.org/Style/CSS/): Design and styling.
- [**Node.js**](https://nodejs.org/): JavaScript runtime environment.
- [**Express**](https://expressjs.com/): Node.js web framework.
- [**MongoDB**](https://mongodb.com/): Non-relational database management system.
- [**Handlebars**](https://handlebarsjs.com/): JavaScript server-side template engine.
- [**mongoose**](https://mongoosejs.com/): MongoDB Object Data Manager (ODM).
- [**Cloudinary**](https://cloudinary.com/): Image API Platform.

</details>

<details><summary>Libraries</summary>

- [**express-session**](https://github.com/expressjs/session#readme): Establishes state authenticated persistence across sessions.
- [**Passport**](https://www.passportjs.org/): Node.js Authentication Middleware.
- [**bcrypt**](https://www.npmjs.com/package/bcrypt): Powerful hashing library.
- [**debug**](https://github.com/debug-js/debug/): Provides console debugging based on application environment and namespaces.
- [**dotenv**](https://github.com/motdotla/dotenv/): Loads environment variables from .env\* file(s) into process.env.
- [**cookie-parser**](https://github.com/expressjs/cookie-parser): Parses cookie headers and populates the req.cookies with an object keyed by the cookie names.
- [**morgan**](https://github.com/expressjs/morgan): HTTP request logger.
- [**http-errors**](https://github.com/jshttp/http-errors): Used to create HTTP errors for node web applications.
- [**helmet**](https://helmetjs.github.io/): Helps secure Express applications by setting HTTP response headers.
- [**compression**](https://github.com/expressjs/compression): Compresses request response bodies
- [**express-async-handler**](https://github.com/Abazhenov/express-async-handler): Handles exceptions for asynchronous express route handlers.
- [**express-rate-limit**](https://github.com/express-rate-limit/express-rate-limit): Limits repeated requests to public APIs and/or endpoints.
- [**express-validator**](https://express-validator.github.io/docs/): Wraps [validator.js](https://github.com/validatorjs/validator.js) to provide validation and sanitization of express requests.
- [**ESLint**](https://eslint.org/): Static JavaScript code analyzer.
- [**ESLint Config Standard**](https://github.com/standard/eslint-config-standard): Enforces JavaScript Standard Style code syntax rules through ESLint.
- [**ESLint Config Prettier**](https://github.com/prettier/eslint-config-prettier): Turns off conflicting and/or unnecessary ESLint rules for Prettier.
- [**Prettier**](https://prettier.io/): Code formatter to enforce consistency.
- [**Luxon**](https://moment.github.io/luxon/#/): Javascript date and time wrapper.
- [**Streamifier**](https://www.npmjs.com/package/streamifier): Converts a Buffer/String into a readable stream.
- [**connect-mongo**](https://www.npmjs.com/package/connect-mongo): Creates a session store in the provided MongoDB.

</details>

<details><summary>Development and Deployment</summary>

- [**PlantUML**](https://plantuml.com/): Diagram tool.
<!-- - [**Railway**](https://railway.app/): Infrastructure platform for managing, monitoring, and deploying full-stack web applications. -->
- [**MongoDB Atlas**](https://www.mongodb.com/): Cloud database service that automates deployment, scaling, and management of MongoDB clusters.
- [**GitHub**](https://github.com/): Remote repository hosting.
- [**Git**](https://git-scm.com/): Version control and source code management.

</details>

## License

MIT

Copyright © 2024-2025 Nolan Gajdascz | [GitHub](https://github.com/gajdascz)
