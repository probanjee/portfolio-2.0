import { describe, it, expect } from 'vitest';
import { SIMULATION_DATA, getSimulation } from '../simulationEngine';

describe('Simulation Engine Data Schema and Consistency Tests', () => {
  it('should export SIMULATION_DATA containing the 5 projects', () => {
    expect(SIMULATION_DATA).toBeDefined();
    const projects = Object.keys(SIMULATION_DATA);
    expect(projects).toContain('sqlsense');
    expect(projects).toContain('api-automation-generator');
    expect(projects).toContain('workout-planning-app');
    expect(projects).toContain('honeypot-system');
    expect(projects).toContain('file-encryption-tool');
    expect(projects.length).toBe(5);
  });

  describe('SQLSense Query Flow Simulator (sqlsense)', () => {
    const sim = getSimulation('sqlsense');

    it('should exist and have correct metadata', () => {
      expect(sim).not.toBeNull();
      expect(sim.title).toBe('Query Flow Simulator');
      expect(sim.description).toContain('logical execution order');
    });

    it('should contain exactly 8 standard SQL execution steps in logical order', () => {
      expect(sim.steps).toHaveLength(8);
      const labels = sim.steps.map(s => s.label);
      expect(labels).toEqual([
        'FROM',
        'JOIN',
        'WHERE',
        'GROUP BY',
        'HAVING',
        'SELECT',
        'ORDER BY',
        'LIMIT'
      ]);
    });

    it('should contain all required fields for each step', () => {
      sim.steps.forEach(step => {
        expect(step.id).toBeDefined();
        expect(step.label).toBeDefined();
        expect(step.order).toBeDefined();
        expect(step.explanation).toBeDefined();
        expect(step.inputConcept).toBeDefined();
        expect(step.outputConcept).toBeDefined();
        expect(step.exists).toBe(true);
      });
    });
  });

  describe('API Middleware Request Lifecycle (api-automation-generator)', () => {
    const sim = getSimulation('api-automation-generator');

    it('should exist and have correct metadata', () => {
      expect(sim).not.toBeNull();
      expect(sim.title).toBe('API Request Lifecycle Simulator');
    });

    it('should contain exactly 9 request flow lifecycle steps', () => {
      expect(sim.steps).toHaveLength(9);
      const labels = sim.steps.map(s => s.label);
      expect(labels).toEqual([
        'Client Request',
        'Authentication',
        'Authorization',
        'Validation',
        'Middleware Chain',
        'Rate Limiter',
        'Controller Handler',
        'Database Layer',
        'HTTP Response'
      ]);
    });
  });

  describe('Workout Intelligence Simulator (workout-planning-app)', () => {
    const sim = getSimulation('workout-planning-app');

    it('should exist and have correct metadata', () => {
      expect(sim).not.toBeNull();
      expect(sim.title).toBe('Workout Intelligence Simulator');
    });

    it('should contain exactly 7 steps of workout generation pipeline', () => {
      expect(sim.steps).toHaveLength(7);
      const labels = sim.steps.map(s => s.label);
      expect(labels).toEqual([
        'User Goal',
        'Fitness Level',
        'Equipment Check',
        'Exercise Selection',
        'Volume Math',
        'Recovery Analysis',
        'Plan Generation'
      ]);
    });
  });

  describe('Cyber Attack Replay Simulator (honeypot-system)', () => {
    const sim = getSimulation('honeypot-system');

    it('should exist and have correct metadata', () => {
      expect(sim).not.toBeNull();
      expect(sim.title).toBe('Cyber Attack Replay Simulator');
    });

    it('should contain exactly 6 security stages', () => {
      expect(sim.steps).toHaveLength(6);
      const labels = sim.steps.map(s => s.label);
      expect(labels).toEqual([
        'Attacker Connection',
        'Honeypot Decoy',
        'Command Attempt',
        'Telemetry Log',
        'Threat Scoring',
        'Alert Trigger'
      ]);
    });
  });

  describe('C++ Cryptographic File Engine Simulator (file-encryption-tool)', () => {
    const sim = getSimulation('file-encryption-tool');

    it('should exist and have correct metadata', () => {
      expect(sim).not.toBeNull();
      expect(sim.title).toBe('C++ Cryptographic File Engine Simulator');
    });

    it('should contain exactly 6 binary stream processing steps', () => {
      expect(sim.steps).toHaveLength(6);
      const labels = sim.steps.map(s => s.label);
      expect(labels).toEqual([
        'Original Data',
        'Key Matrix',
        'Encryption',
        'Ciphertext File',
        'Decryption',
        'Plaintext Restored'
      ]);
    });
  });
});
