<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="Licencia MIT"/>
  <img src="https://img.shields.io/badge/status-en%20desarrollo-orange?style=flat-square" alt="Estado"/>
  <img src="https://img.shields.io/badge/contratos-Solidity-blue?style=flat-square" alt="Solidity"/>
  <img src="https://img.shields.io/badge/frontend-React%20Native-61DAFB?style=flat-square" alt="React Native"/>
  <img src="https://img.shields.io/badge/gobernanza-DAO-purple?style=flat-square" alt="DAO"/>
</div>

# 🏛️ Moneda Soberana · Crédito Mutuo Tokenizado

Sistema monetario ciudadano, robusto y descentralizado, basado en **crédito mutuo**, **demurrage automático** y **gobernanza directa** mediante identidad humana única.

> “Una moneda del común, gobernada por quienes la usan, no por bancos ni Estados.”

---

## ✨ Características principales

- **Crédito mutuo en cadena**: el dinero se crea al intercambiar bienes y servicios, y se destruye al saldar deudas. Suma total siempre cero.
- **Demurrage perezoso**: los saldos positivos pierden valor lentamente (ej. 1 % mensual) para incentivar la circulación. Lo oxidado va a la tesorería común.
- **Renta básica ciudadana (UBI)**: cada persona verificada recibe una asignación periódica igualitaria.
- **Identidad soberana con ZK**: una persona, un voto. La verificación de “humano único” usa pruebas de conocimiento cero, protegiendo la privacidad.
- **DAO sin plutocracia**: gobernanza 1 persona = 1 voto, con votación cuadrática para decisiones monetarias y técnicas.
- **Infraestructura autogestionada**: nodo secuenciador de capa 2 (OP Stack) mantenido por la comunidad, no por corporaciones externas.

---

## 🧱 Arquitectura conceptual

```

┌─────────────────────────┐
│   Monedero móvil        │  React Native · autocustodia · recuperación social
├─────────────────────────┤
│   Servicios off‑chain   │  Indexador (GraphQL) · Keeper de demurrage/UBI
├─────────────────────────┤
│   Contratos inteligentes│  MonedaSocial.sol · IdentidadHumana.sol · DAO.sol
├─────────────────────────┤
│   L2 Soberana           │  OP Stack · secuenciador comunitario · tarifas cero
└─────────────────────────┘

```

---

## 🛠️ Stack tecnológico

| Capa               | Tecnología                          |
|--------------------|-------------------------------------|
| Blockchain         | EVM L2 (OP Stack / Polygon CDK)     |
| Smart contracts    | Solidity ^0.8.20, Hardhat, Foundry  |
| Identidad ZK       | Circom, snarkjs, Proof of Humanity  |
| Indexación         | Subsquid / Envio                    |
| Monedero           | React Native, WalletConnect         |
| Gobernanza         | Governor de OpenZeppelin, Timelock  |
| Almacenamiento UI | IPFS, ENS                           |

---

## 🚀 Primeros pasos (desarrollo local)

### Requisitos

- Node.js ≥18, npm / yarn
- Hardhat o Foundry
- React Native CLI
- MetaMask o similar (para pruebas)
- Git y GitHub CLI

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/mechmind-dwv/moneda-soberana.git
cd moneda-soberana

# Instalar dependencias de contratos
cd contracts
npm install

# Compilar y probar
npx hardhat compile
npx hardhat test

# Levantar frontend (monedero)
cd ../frontend
npm install
npx react-native start
```

Despliegue en red de pruebas

```bash
cd contracts
npx hardhat run scripts/deploy.js --network optimism-goerli
```

(Las direcciones de los contratos quedarán registradas en governance/deployments/)

---

🗳️ Gobernanza comunitaria

Todas las decisiones clave (tasa de oxidación, límites de crédito, actualizaciones del protocolo) se toman mediante asamblea digital. Cada persona verificada puede:

1. Crear una propuesta en el portal de gobernanza.
2. Debatir en foros off‑chain.
3. Votar con votación cuadrática.
4. Tras un período de timelock, la propuesta se ejecuta automáticamente.

La tesorería comunitaria se administra con una billetera multisig (Safe) cuyos firmantes son elegidos por la asamblea y rotan periódicamente.

---

🤝 Contribuir

¡La soberanía monetaria se construye en común! Para participar:

1. Haz un fork del repositorio.
2. Crea una rama con tu feature (git checkout -b feat/mi-aporte).
3. Escribe pruebas y código limpio.
4. Abre un Pull Request describiendo los cambios.

Revisa CONTRIBUTING.md (próximamente) para pautas de estilo y código de conducta.

---

📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

---

🌐 Contacto

· Comunidad: [canal de Telegram/Discord] (por definir)
· Desarrollador principal: mechmind-dwv · ia.mechmind@gmail.com
· Repositorio: github.com/mechmind-dwv/moneda-soberana

---

Hecho con convicción por una ciudadanía que se niega a delegar el valor de su trabajo.
