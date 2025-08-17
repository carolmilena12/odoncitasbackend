const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

// Configuración de Firebase (la misma que usas en tu frontend)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "login-tutorial-93330.firebaseapp.com",
  projectId: "login-tutorial-93330",
  storageBucket: "login-tutorial-93330.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Email y contraseña de un usuario REAL en Firebase
const email = "correo@ejemplo.com";
const password = "tu_contraseña";

async function obtenerToken() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const token = await user.getIdToken();
    console.log("TOKEN DE FIREBASE:");
    console.log(token);
  } catch (error) {
    console.error("Error al obtener token:", error.message);
  }
}

obtenerToken();