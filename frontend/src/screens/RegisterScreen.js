import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import API_URL from "../config/api";

export default function RegisterScreen({
  navigation,
}) {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async () => {
      try {
        const response =
          await fetch(
            `${API_URL}/api/auth/register`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                name,
                email,
                password,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          return Alert.alert(
            "Error",
            data.message
          );
        }

        Alert.alert(
          "Correcto",
          "Usuario registrado correctamente"
        );

        navigation.navigate(
          "Login"
        );
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
        autoCapitalize="none"
        keyboardType="email-address"
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
        onPress={() =>
          navigation.navigate(
            "Login"
          )
        }
      >
        <Text style={styles.link}>
          ¿Ya tienes cuenta?
          {" "}
          Inicia sesión
        </Text>
      </TouchableOpacity>

      {/* -------- TEMPORAL -------- */}

      <View style={styles.divider} />

      <Text style={styles.businessTitle}>
        ¿Tienes un negocio?
      </Text>

      <Text style={styles.businessSubtitle}>
        Registra tu establecimiento
        gratuitamente en Moon y
        comienza a recibir clientes.
      </Text>

      <TouchableOpacity
        style={
          styles.businessButton
        }
        onPress={() =>
          navigation.navigate(
            "RegisterStore"
          )
        }
      >
        <Text
          style={
            styles.businessButtonText
          }
        >
          Registrar establecimiento
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#0D0D0D",
      justifyContent:
        "center",
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
      backgroundColor:
        "#1E1E1E",
      color: "#FFFFFF",
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
    },

    button: {
      backgroundColor:
        "#7C3AED",
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

    divider: {
      height: 1,
      backgroundColor:
        "#2A2A2A",
      marginVertical: 35,
    },

    businessTitle: {
      color: "#FFFFFF",
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 10,
    },

    businessSubtitle: {
      color: "#A1A1AA",
      textAlign: "center",
      fontSize: 14,
      lineHeight: 22,
      marginBottom: 18,
    },

    businessButton: {
      borderWidth: 1,
      borderColor: "#7C3AED",
      borderRadius: 12,
      padding: 15,
      alignItems: "center",
    },

    businessButtonText: {
      color: "#7C3AED",
      fontWeight: "700",
      fontSize: 15,
    },
  });