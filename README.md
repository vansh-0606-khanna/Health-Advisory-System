# AI-Powered Health Advisory System

> Turning environmental data into personalized, actionable health recommendations.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-backend-339933)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## Overview

Vayu is an AI-powered health advisory system that links environmental conditions to human health. It combines air quality monitoring, weather forecasting, and machine learning to assess pollution-related risks and generate personalized preventive-care recommendations.

**Objective:** Bridge the gap between environmental intelligence and preventive healthcare by converting raw environmental data into meaningful, actionable guidance.

## Key Features

| Feature | Description |
|---|---|
| **Air Quality Monitoring** | Analyzes AQI levels and flags pollution-related health risks |
| **Weather Prediction** | ML models forecast weather conditions from environmental parameters |
| **Personalized Health Advisory** | Recommendations based on air quality, weather, and associated risks |
| **Data Analysis & Visualization** | Interactive dashboards showing environmental trends and insights |
| **AI-Based Recommendations** | Intelligent suggestions for preventive healthcare and awareness |

## Screenshots

### Model Reports
<p align="center">
  <img src="https://github.com/user-attachments/assets/48a17561-79ae-436a-92f2-33c1dd74c15b" width="48%" alt="AQI model report" />
  <img src="https://github.com/user-attachments/assets/d15c39e7-6244-4f09-9d79-aa1fb70395e1" width="48%" alt="Forecast and health advisory" />
</p>

### Application Interface
<p align="center">
  <img src="https://github.com/user-attachments/assets/b1b96e64-4f48-4871-916b-4279de344a39" width="48%" alt="Dashboard view" />
  <img src="https://github.com/user-attachments/assets/8673a2b0-479d-44aa-8f15-7f23d689c746" width="48%" alt="Health advisory view" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/4de002d8-8019-40ac-ab6a-0cfe6d7b7a51" width="48%" alt="Air quality view" />
  <img src="https://github.com/user-attachments/assets/954afea7-ad83-497e-8aaf-ddc1d684c046" width="48%" alt="Trends view" />
</p>

## Tech Stack

- **Machine Learning & Data:** Python, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn
- **Backend:** Node.js (`server.js`), REST APIs
- **Frontend:** HTML / React.js
- **Database:** MySQL

## Project Structure

```
├── MAIN_FILE_VAYU_BACKEND_clean.ipynb   # Core ML pipeline and backend logic
├── PollutionDataProcessing (1).ipynb    # Data cleaning and preprocessing
├── server.js                            # API server
├── index.html                           # Frontend
├── package.json                         # Node dependencies
├── _env.example                         # Environment variable template
└── HOW TO RUN.txt                       # Setup notes
```

## Getting Started

### Prerequisites
- Python 3.x and Jupyter Notebook
- Node.js and npm
- MySQL (if used)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Install Node dependencies
npm install

# 3. Configure environment variables
cp _env.example .env
# then add your own API keys in .env

# 4. Run the notebooks (data processing, then model), then start the server
node server.js
```

Then open `http://localhost:<port>` in your browser.

## Roadmap

- [ ] Add user profiles (age, existing conditions) for deeper personalization
- [ ] Deploy as a hosted web app
- [ ] Extend forecasts to more cities
- [ ] Add alerts for hazardous AQI levels

## Contributors

- [Vansh Khanna](https://github.com/vansh-0606-khanna)
- <your name / GitHub link>

## License

Distributed under the MIT License. See `LICENSE` for details.

## Disclaimer

Vayu provides general informational guidance and is not a substitute for professional medical advice, diagnosis, or treatment.
