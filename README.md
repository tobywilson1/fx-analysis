# fx-analysis

Sources fx data asynchronously from a REST API and displays in a D3 chart based on user-entered filters e.g. fx pair.

---

### Version: 1.0.0

---

### 🌟 Features & technologies

- Sources FX data from a REST API via asynchronous requests.
- D3 chart updates when response is received back.
- React component-based UI
- D3 chart is defined independently of React component.
- State management using Redux.

---

### ⚙ Installation & Running

```sh
$ npm install
```

```sh
$ npm start
```

---

### 🤔 How to use it?

#### 1. Configure URL of REST API

Update the .env file in the root directory.

#### 2. Define structure of data in db.json file

This can be used as a test file served by json-server fake API.

#### 3. D3 charts

D3 charts are saved in the src/charts directory.
