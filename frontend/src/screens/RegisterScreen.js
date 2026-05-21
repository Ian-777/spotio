import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.12:3000/api/auth/register", //*.*.*.*.*.*.*.*.*.*
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return Alert.alert("Error", data.message);
      }

      Alert.alert(
        "Correcto",
        "Usuario registrado correctamente"
      );

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "No se pudo conectar al servidor"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Crear cuenta
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#A1A1AA"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Correo"
        placeholderTextColor="#A1A1AA"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#A1A1AA"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>
          Registrarse
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.link}>
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#7C3AED",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    color: "#3B82F6",
    textAlign: "center",
  },
});