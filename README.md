<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# yt-playlist-length-calculator -->

# YouTube Playlist Length Calculator

This project is a React application that calculates the total length of a YouTube playlist based on a given range of video numbers. Users can input a YouTube playlist link and specify the start and end video numbers to calculate the total duration of the selected range of videos.

## Features

- Input a YouTube playlist link, start video number, and end video number.
- Calculate the total length of the playlist from the specified start to end video numbers.
- Display the total length in a human-readable format (HH:MM:SS).
- Progress bar showing the calculation progress.
- Tailwind CSS and Bootstrap for a modern and responsive user interface.

## Installation

1. Clone the repository:

    ```shell
    git clone https://github.com/pragun-bansal/yt-playlist-length-calculator
    ```

2. Navigate to the project directory:

    ```shell
    cd yt-playlist-length-calculator
    ```

3. Install the dependencies:

    ```shell
    npm install
    ```

4. Obtain a YouTube Data API key from the [Google Developers Console](https://console.developers.google.com/).

5. Create a `.env` file in the project root and add your API key:

    ```plaintext
    REACT_APP_API_KEY=your_api_key
    ```

## Usage

1. Start the development server:

    ```shell
    npm start
    ```

2. Open your web browser and navigate to `http://localhost:3000`.

3. Input the YouTube playlist link, start video number, and end video number in the form provided.

4. Click "Calculate Total Length" to calculate the total duration of the specified range of videos in the playlist.

5. The application will display the total length of the playlist range in a human-readable format.

## Dependencies

- [React](https://reactjs.org/)
- [axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-bootstrap](https://react-bootstrap.github.io/)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request if you have any improvements, bug fixes, or new features to add.


