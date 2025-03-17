<h1 align="center"> 🩺 HEALMATE <br>
 </h1>

![Screenshot 2025-03-03 020936](https://github.com/user-attachments/assets/80445e7d-c763-4362-9712-106d45d11813)
-----------------------------------------------------------
<br>

  A conversational AI chatbot that analyzes symptoms, provides potential diagnoses, and recommends next steps. 
  <br>
  (e.g., self-care, doctor consultation, or emergency care).
  <br>
  Built with **Rasa**, **spaCy**, and **Flask**, and integrated with medical APIs for accurate triage.
  <br>
  <br>



## 🌟 Features
- **Symptom Analysis**: Collects symptoms, duration, and severity.
- **Urgency Triage**: Flags high-risk symptoms (e.g., chest pain).
- **Medical Knowledge**: Integrates with [Endlessmedical API](https://endlessmedical.com/) for evidence-based recommendations.
- **Privacy-First**: No personal health data stored.
- **Web Interface**: Simple and intuitive UI.

## 🛠️ Technologies Used
- **Backend**: Rasa (NLP/Dialogue Management), Flask (API)
- **NLP**: spaCy, Rasa DIETClassifier
- **APIs**: Endlessmedical (Medical Knowledge)
- **Frontend**: HTML/CSS/JavaScript
- **Deployment**: Heroku (Backend), Netlify (Frontend)

## ⚙️ Installation

### Prerequisites
- Python 3.7+
- Git
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (for deployment)
- [Netlify Account](https://www.netlify.com/) (for frontend hosting)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/healthcare-chatbot.git
   cd healthcare-chatbot
2. **Set Up a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt

4. **Train the Rasa Model**:
   ```bash
   rasa train

## 🤝 Contributing

1. Fork the repository.
   
2. Create a new branch: git checkout -b feature/your-feature.
   
3. Commit changes: git commit -m "Add your feature".
   
4. Push to the branch: git push origin feature/your-feature.
   
5. Submit a pull request.
   
   
