import React, { useState, useEffect } from "react";
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView
} from "react-native";
import { getBalance, getCreditLimit, sendTransaction } from "./services/blockchain";

const USER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export default function App() {
  const [balance, setBalance] = useState("0");
  const [limit, setLimit] = useState("0");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setError(null);
      const bal = await getBalance(USER_ADDRESS);
      const lim = await getCreditLimit(USER_ADDRESS);
      setBalance(bal);
      setLimit(lim);
    } catch (e) {
      console.error(e);
      setError(e.message || String(e));
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSend = async () => {
    if (!to || !amount) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    try {
      setError(null);
      await sendTransaction(to, amount);
      Alert.alert("Éxito", `Transferencia de ${amount} SOBER enviada a ${to}`);
      fetchData();
      setTo(""); setAmount("");
    } catch (e) {
      const msg = e.reason || e.message || String(e);
      setError(msg);
      Alert.alert("Error", msg);
    }
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>⚠️ Error</Text>
        <ScrollView><Text style={styles.errorText}>{error}</Text></ScrollView>
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏛️ Monedero Soberano</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Mi saldo</Text>
        <Text style={styles.value}>{balance} SOBER</Text>
        <Text style={styles.label}>Límite de crédito</Text>
        <Text style={styles.value}>{limit} SOBER</Text>
      </View>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Dirección destino" value={to} onChangeText={setTo} />
        <TextInput style={styles.input} placeholder="Cantidad (SOBER)" value={amount} onChangeText={setAmount} keyboardType="numeric" />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={fetchData}>
          <Text style={styles.secondaryButtonText}>Actualizar saldo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "white", padding: 20, borderRadius: 10, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  form: { marginTop: 10 },
  input: { backgroundColor: "white", padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  secondaryButton: { backgroundColor: "#2196F3", padding: 15, borderRadius: 8, alignItems: "center" },
  secondaryButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  errorContainer: { flex: 1, backgroundColor: "#fdd", padding: 20, paddingTop: 50, alignItems: "center" },
  errorTitle: { fontSize: 28, fontWeight: "bold", color: "darkred", marginBottom: 10 },
  errorText: { fontSize: 16, color: "darkred", marginBottom: 20 }
});
