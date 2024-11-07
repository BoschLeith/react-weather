# React Weather

React Weather is a simple React application that provides users with real-time weather information for any location. The application uses [OpenStreetMap](https://www.openstreetmap.org/) for geocoding the users location search and fetches data from [Open Meteo](https://open-meteo.com/) and displays current weather conditions, forecasts, and other relevant details.

## Features

- Search for weather by city or location
- Display current weather conditions
- View a 5-day weather forecast
- Responsive design for mobile and desktop
- User-friendly interface

## Installation

To install React Weather, follow these steps:

#### Option 1: Local Installation

1. **Ensure you have Node.js and npm installed** on your machine. You can download them from [nodejs.org](https://nodejs.org/).

2. **Clone the repository**:

   ```bash
   git clone https://github.com/BoschLeith/react-weather.git
   ```

3. **Navigate to the project directory**:

   ```bash
   cd react-weather
   ```

4. **Install the dependencies**:

   ```bash
   npm install
   ```

5. **Start the application**:

   ```bash
   npm run dev
   ```

6. **Open your browser** and go to `http://localhost:5173` (or the port specified in your Vite configuration) to view the app.

#### Option 2: Docker Installation

1. **Ensure you have Docker installed** on your machine. You can download it from [docker.com](https://www.docker.com/).

2. **Clone the repository** (if you haven't already):

   ```bash
   git clone https://github.com/BoschLeith/react-weather.git
   ```

3. **Navigate to the project directory**:

   ```bash
   cd react-weather
   ```

4. **Build the Docker image**:

   ```bash
   docker build -t react-weather .
   ```

5. **Run the Docker container**:

   ```bash
   docker run -p 5173:5173 react-weather
   ```

6. **Open your browser** and go to `http://localhost:5173` to view the app.
