import type { Project } from "@/lib/projects";

import e2eCover from "@/assets/cover-qa-e2e.svg";
import apiCover from "@/assets/cover-qa-api.svg";
import securityCover from "@/assets/cover-qa-security.svg";
import performanceCover from "@/assets/cover-qa-performance.svg";
import defectCover from "@/assets/cover-qa-defects.svg";

export const sqaProjects: Project[] = [
  {
    slug: "e2e-qa-automation",
    index: "06",
    title: "End-to-End QA Automation Framework",
    shortTitle: "E2E Automation",
    tagline:
      "Cross-browser Playwright automation for critical shopping journeys, with traceable reports and CI-ready diagnostics.",
    category: "SQA · Browser Automation",
    cover: e2eCover,
    year: "2026",
    summary:
      "A maintainable Playwright Test and TypeScript framework that validates authentication, inventory, cart and checkout journeys against the SauceDemo training storefront. It uses a Page Object Model, isolated browser contexts, HTML and JUnit reporting, and failure screenshots, videos and traces.",
    problem:
      "Browser test suites become difficult to maintain when page interactions, assertions, test data and environment configuration are mixed together. A single-browser run can also miss browser-specific regressions.",
    solution:
      "A typed Page Object Model separates page behavior from test intent, while a shared Playwright configuration runs the same scenarios in Chromium, Firefox and WebKit and preserves actionable failure diagnostics.",
    architecture: [
      "Playwright Test is the execution layer for local runs and GitHub Actions; each test receives an isolated browser context.",
      "Authentication, inventory, cart and checkout specs describe user journeys and positive/negative behavior.",
      "Reusable LoginPage, InventoryPage, CartPage and CheckoutPage objects encapsulate locators and page actions.",
      "Validated BASE_URL configuration rejects malformed or non-HTTP targets before test discovery.",
      "HTML and JUnit reporters publish readable results; screenshots, videos and traces are retained for failed tests.",
    ],
    features: [
      "Nine maintained functional and negative test scenarios covering authentication, inventory, sorting, cart and checkout.",
      "Chromium, Firefox and WebKit browser projects with isolated test contexts.",
      "Page Object Model with reusable, typed page classes.",
      "HTML and JUnit reports for developers and CI systems.",
      "Failure screenshots, videos and Playwright traces for debugging.",
      "GitHub Actions workflow with type-checking and report artifact upload.",
    ],
    stack: [
      "Playwright Test",
      "TypeScript",
      "Node.js",
      "Page Object Model",
      "GitHub Actions",
      "HTML / JUnit",
    ],
    challenges: [
      {
        challenge:
          "Keeping browser-specific behavior consistent without duplicating the test suite.",
        solution:
          "The same test definitions run through Playwright browser projects, with page objects centralizing interactions and browser contexts isolated per test.",
      },
      {
        challenge: "Making failed CI runs diagnosable instead of returning only a red build.",
        solution:
          "The framework configures trace, screenshot and video capture on failure and publishes HTML/JUnit reports as workflow artifacts.",
      },
    ],
    takeaways: [
      "A good automation framework makes test intent readable while keeping locator and interaction details out of the test cases.",
      "Cross-browser results are meaningful only when the execution environment, target and dated evidence are recorded alongside the pass rate.",
    ],
    gallery: [],
    liveUrl: null,
    showcaseUrl: null,
    githubUrl: "https://github.com/shehzadres/end-to-end-qa-automation-framework",
  },
  {
    slug: "api-testing-framework",
    index: "07",
    title: "API Testing & Validation Framework",
    shortTitle: "API QA Framework",
    tagline:
      "A complete API quality pipeline combining Pytest, Postman/Newman, contract checks, database validation and CI.",
    category: "SQA · API & Contract Testing",
    cover: apiCover,
    year: "2026",
    summary:
      "A portfolio-grade API quality engineering project built around TaskFlow, a scoped task-management REST API. It combines 34 Pytest checks, Postman/Newman collections, OpenAPI drift detection, SQLite integrity checks, a small latency smoke test and GitHub Actions reporting.",
    problem:
      "API checks often stop at status codes and miss authorization boundaries, malformed payloads, schema drift, persistence errors and the quality gates needed to prevent regressions.",
    solution:
      "A layered validation suite exercises functional behavior, negative and boundary cases, authorization, database integrity and API contracts, then runs the checks in a repeatable CI workflow with human- and machine-readable reports.",
    architecture: [
      "A FastAPI TaskFlow service exposes REST endpoints and a generated OpenAPI contract.",
      "Pytest and FastAPI TestClient validate authentication, authorization, CRUD, negative inputs, boundary conditions and database behavior.",
      "A Postman collection runs independently through Newman to verify client-facing request and response workflows.",
      "Contract scripts compare the generated OpenAPI schema with a committed snapshot; SQLite checks verify integrity and foreign keys.",
      "GitHub Actions runs Python tests, coverage, npm audit, performance smoke checks and Newman, then uploads reports.",
    ],
    features: [
      "34 Pytest checks with 97% recorded statement coverage in the documented local verification run.",
      "13 Postman/Newman requests with 22 assertions in the recorded run.",
      "Authentication, role-based authorization, owner isolation, CRUD and negative/boundary testing.",
      "OpenAPI contract drift detection and SQLite integrity/foreign-key validation.",
      "Latency smoke test with a p95 regression threshold, clearly separated from load testing.",
      "GitHub Actions pipeline with HTML, JUnit and JSON report artifacts.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Pytest",
      "Postman",
      "Newman",
      "OpenAPI",
      "SQLite",
      "Node.js",
      "GitHub Actions",
    ],
    challenges: [
      {
        challenge: "Verifying authorization beyond successful login and basic endpoint responses.",
        solution:
          "Tests use multiple seeded identities to verify role permissions and prevent users from reading, updating or deleting another user's records.",
      },
      {
        challenge: "Detecting breaking API changes before they reach consumers.",
        solution:
          "A committed OpenAPI snapshot is compared with the generated schema, while Postman/Newman independently validates request and response behavior.",
      },
    ],
    takeaways: [
      "API quality requires contract, authorization, persistence and negative testing, not just checking whether an endpoint returns HTTP 200.",
      "Performance smoke checks and load tests answer different questions and should never be presented as interchangeable evidence.",
    ],
    gallery: [],
    liveUrl: null,
    showcaseUrl: "https://shehzadres.github.io/api-testing-validation-framework/",
    githubUrl: "https://github.com/shehzadres/api-testing-validation-framework",
  },
  {
    slug: "security-assessment-lab",
    index: "08",
    title: "Security Testing & Vulnerability Assessment Lab",
    shortTitle: "Security Assessment Lab",
    tagline:
      "A localhost-only vulnerability lab that reproduces, documents, remediates and retests common web security flaws.",
    category: "SQA · Application Security",
    cover: securityCover,
    year: "2026",
    summary:
      "A reproducible security testing portfolio lab with intentionally vulnerable and hardened local applications. It demonstrates six vulnerability classes, evidence-led findings, Playwright and Pytest regression checks, OWASP ZAP passive baselines and scoped Burp proxy cases.",
    problem:
      "Security findings are easy to list but harder to reproduce, explain, remediate and verify. Scanner output without controlled scope or retest evidence can also create a misleading impression of security.",
    solution:
      "A controlled localhost lab compares a vulnerable target with a hardened implementation, records each finding and remediation, and uses automated regression checks plus passive scanner evidence to verify the documented controls.",
    architecture: [
      "Two local Python/SQLite targets run separately: an intentionally vulnerable baseline and a hardened comparison implementation.",
      "Pytest and Playwright exercise the documented vulnerability cases and verify the defensive behavior after remediation.",
      "OWASP ZAP passive baseline scans assess the local targets; Burp Suite Community captures six explicitly scoped proxy cases.",
      "A structured findings register records severity, evidence, impact, remediation guidance and retest status.",
      "A static recruiter dashboard, evidence viewer and CI history page expose the results without requiring a local tool setup.",
    ],
    features: [
      "Six demonstrated classes: SQL injection, reflected XSS, stored XSS, IDOR, session fixation/cookie flags and missing security headers.",
      "Vulnerable-versus-hardened comparison with documented defensive controls.",
      "23 recorded passing Pytest checks in the latest documented local full run.",
      "OWASP ZAP passive baseline and six scoped Burp proxy evidence cases.",
      "Findings register, remediation notes, retest log and evidence viewer.",
      "GitHub Pages recruiter dashboard and automated CI workflow.",
    ],
    stack: [
      "Python",
      "Flask",
      "SQLite",
      "Pytest",
      "Playwright",
      "OWASP ZAP",
      "Burp Suite Community",
      "GitHub Actions",
    ],
    challenges: [
      {
        challenge:
          "Demonstrating vulnerabilities safely without exposing an intentionally weak application.",
        solution:
          "Both targets are scoped to localhost and the project documents explicit restrictions against LAN exposure, port forwarding or testing systems without authorization.",
      },
      {
        challenge: "Avoiding exaggerated claims from scanner output.",
        solution:
          "The project labels ZAP results as passive baseline evidence, records the exact test scope and explicitly states that zero alerts do not prove an application is vulnerability-free.",
      },
    ],
    takeaways: [
      "A useful security assessment connects reproducible evidence to a specific remediation and a retest, rather than treating a scanner score as the conclusion.",
      "Scope and safety controls are part of security testing quality, not optional documentation.",
    ],
    gallery: [],
    liveUrl: null,
    showcaseUrl:
      "https://shehzadres.github.io/security-testing-vulnerability-assessment-framework/",
    githubUrl: "https://github.com/shehzadres/security-testing-vulnerability-assessment-framework",
  },
  {
    slug: "performance-load-testing",
    index: "09",
    title: "Performance & Load Testing Platform",
    shortTitle: "Performance Testing",
    tagline:
      "A reproducible JMeter performance lab with real workload evidence, latency analysis and Prometheus/Grafana monitoring.",
    category: "SQA · Performance Engineering",
    cover: performanceCover,
    year: "2026",
    summary:
      "A local performance-engineering platform built with Apache JMeter, Docker Compose, a Node.js demo API, Prometheus, Grafana and a Python analyzer. It runs configurable smoke, baseline, load and stress profiles and produces raw JTL evidence, percentile metrics and release comparisons.",
    problem:
      "Performance claims are often made without reproducible workloads, raw evidence, clear test environments or a distinction between smoke, load and stress testing.",
    solution:
      "A containerized local lab runs controlled JMeter workloads against its own demo API, captures raw samples, calculates latency and throughput metrics, and keeps baseline-versus-candidate comparisons tied to actual runs.",
    architecture: [
      "Docker Compose starts the instrumented Node.js demo API, Prometheus and Grafana services.",
      "Apache JMeter runs configurable smoke, baseline, load and stress workloads against the local API.",
      "JMeter writes raw JTL samples; a Python analyzer calculates p50, p90, p95 and p99 latency, throughput and error rate.",
      "Prometheus scrapes API metrics and Grafana visualizes service behavior and alert rules.",
      "Release comparison scripts compare two recorded runs and generate JSON and Markdown reports; GitHub Actions runs a smaller smoke integration.",
    ],
    features: [
      "Configurable virtual users, ramp-up periods, durations and named test runs.",
      "Smoke, baseline, load and stress profiles against a local demo API.",
      "p50, p90, p95 and p99 latency, throughput and error-rate analysis.",
      "Prometheus metrics, Grafana dashboards and alert rules.",
      "Raw JTL, JSON summaries, Markdown reports and baseline/candidate comparisons.",
      "Recruiter showcase populated from real CI smoke-run evidence.",
    ],
    stack: [
      "Apache JMeter",
      "Docker Compose",
      "Node.js",
      "Prometheus",
      "Grafana",
      "Python",
      "PowerShell",
      "GitHub Actions",
    ],
    challenges: [
      {
        challenge: "Avoiding misleading benchmark results and double-counted transaction samples.",
        solution:
          "The analyzer uses raw JTL data, excludes Transaction Controller samples from HTTP throughput, and records the workload and execution environment beside the metrics.",
      },
      {
        challenge:
          "Separating application behavior from the limitations of the machine running the test.",
        solution:
          "The documentation records the local hardware and Docker/JMeter versions and warns that the host or load generator can become the bottleneck before the demo API.",
      },
    ],
    takeaways: [
      "A benchmark is only useful when its workload, environment, raw evidence and measurement method are visible.",
      "Local stress results describe a specific test setup, not universal production capacity or an SLA.",
    ],
    gallery: [],
    liveUrl: null,
    showcaseUrl: "https://shehzadres.github.io/performance-load-testing-platform/",
    githubUrl: "https://github.com/shehzadres/performance-load-testing-platform",
  },
  {
    slug: "qa-defect-management",
    index: "10",
    title: "Software QA & Defect Management System",
    shortTitle: "Defect Management",
    tagline:
      "A complete QA lifecycle showcase connecting requirements, test cases, execution evidence, defects and traceability.",
    category: "SQA · Test Management",
    cover: defectCover,
    year: "2026",
    summary:
      "A practical QA portfolio built around TaskFlow, a local project/task management application. It combines requirements analysis, risk-based test design, 32 documented test cases, Playwright browser/API checks, defect triage, Jira workflow documentation, SQL validation and evidence-based reporting.",
    problem:
      "A test suite alone does not show how quality work is planned, traced to requirements, executed, reported and connected to defect management across a release cycle.",
    solution:
      "A complete QA workflow links a requirements catalogue to test cases and execution evidence, records defects and triage decisions, validates the evidence database, and publishes a recruiter-facing dashboard.",
    architecture: [
      "A local FastAPI TaskFlow application provides controlled user, project and task workflows for testing.",
      "A requirements catalogue is linked to 32 designed test cases through a traceability matrix.",
      "A Playwright runner combines real Chromium browser interactions with HTTP/API assertions and database integrity checks.",
      "Execution evidence is written to JSON and CSV, then a report publisher derives the dashboard and case statuses from the saved run.",
      "A separate SQL evidence database validates row counts, foreign keys and complete requirement-to-test-case traceability; Jira workflow examples are documented as simulated training records.",
    ],
    features: [
      "10 documented requirements and 32 designed test cases with full recorded traceability.",
      "32/32 passed in the latest saved local portfolio execution, with fresh results reproducible through the runner.",
      "Combined browser, API and database validation across authentication, CRUD, access control, status transitions and search.",
      "Defect register, lifecycle documentation, triage workflow and Jira integration evidence.",
      "SQL schema, reporting queries, JSON evidence and generated QA dashboard.",
      "GitHub Pages recruiter dashboard with an evidence-first project walkthrough.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Playwright",
      "Pytest",
      "SQLite",
      "SQL",
      "Jira",
      "CSV / JSON",
      "GitHub Pages",
    ],
    challenges: [
      {
        challenge:
          "Keeping the dashboard consistent with the actual test execution instead of hand-maintained status numbers.",
        solution:
          "The live runner writes structured JSON and CSV evidence, and the report publisher derives the dashboard and case statuses from those generated artifacts.",
      },
      {
        challenge:
          "Showing defect-management experience without claiming simulated issues were found in a passing test run.",
        solution:
          "The five defect records and Jira issues are explicitly labelled as simulated training examples, separate from the 32 passing execution cases.",
      },
    ],
    takeaways: [
      "Traceability connects requirements, test design, execution and release decisions into one quality process.",
      "Clear evidence boundaries matter: simulated defects, saved local runs and freshly reproduced results must be labelled accurately.",
    ],
    gallery: [],
    liveUrl: null,
    showcaseUrl: "https://shehzadres.github.io/software-qa-defect-management-system/",
    githubUrl: "https://github.com/shehzadres/software-qa-defect-management-system",
  },
];
