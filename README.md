
# 3-Tier Rule Engine Application

## Project Overview

This application is a 3-tier rule engine that helps determine user eligibility based on attributes such as age, department, income, spend, etc. It uses **Abstract Syntax Tree (AST)** to represent conditional rules and allows users to dynamically create, combine, and evaluate these rules. The frontend allows user interaction, while the backend processes the data and applies the rules.

---

## Objective

Develop a rule engine that dynamically evaluates a candidate's eligibility for a task based on attributes such as:
- **Age**
- **Department**
- **Income**
- **Experience**

---

## Architecture

### 1. Frontend (React.js)
   - Users can create rules, combine them, and evaluate eligibility based on entered data.
   - UI allows:
     - **Rule Creation**
     - **Rule Combination**
     - **Eligibility Evaluation**

### 2. Backend (Node.js & Express)
   - Manages API endpoints for rule handling and evaluation.
   - Processes data using combined AST rules to determine eligibility.

### 3. Database (MongoDB Atlas)
   - Stores the rules created by users.
   - Hosted on **MongoDB Atlas** for cloud-based database services.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Hosted on Atlas)
- **Other Tools**: 
  - **AST** for rule representation and combination
  - **Axios** for frontend-backend communication

---

## Features

- **Rule Creation**: Define rules based on attributes like age, income, department, and experience.
- **Rule Combination**: Combine multiple rules to form a set of conditions.
- **Candidate Evaluation**: Input a candidate's details and determine if they meet the combined rule set.

---
## Live Link of Web App 

- https://rule-engine-with-ast-frontend-pvwg.vercel.app/create

---
## Usage

1. **Rule Creation**:
   - Navigate to the "Create Rule" tab on the frontend.
   - Input the conditions (e.g., age > 30, income > 50000, etc.).
   - Click Create Rule to save the new rule to the database.

2. **Rule Combination**:
   - Go to the "Combine and Evaluate" tab.
   - Select rules from the list of previously created rules.
   - Click Combine Rules to create a set of combined conditions.

3. **Eligibility Evaluation**:
   - In the same "Combine and Evaluate" tab, input a person's details (e.g., age, department, income, experience).
   - Click Evaluate to determine if the person is eligible based on the combined rules.
   - The result will show whether the candidate fits the criteria.
  
## Future Improvements
- Add support for more complex rule combinations (e.g., nested conditions).
- Implement caching to improve evaluation performance.
- Enhance UI to provide a more intuitive experience with drag-and-drop rule creation.

## Contact
For any queries or suggestions, feel free to contact:

- **Name**: Shreyal Jain
- **Email**: shreyaljain0007@gmail.com
