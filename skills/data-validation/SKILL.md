# SentinelIQ Data Validation Skill

This skill provides domain-specific knowledge and instructions for validating the NexaTel raw dataset.

## Validation Scope
AI agents should use this skill when asked to write validation scripts, verify data integrity, or troubleshoot ingestion failures.

## Directory Structure Validation
The following structure is mandatory:
- `data/raw/`
  - `dataset_manifest.json` (Root manifest)
  - `docs/architecture/` (Markdown files)
  - `docs/decisions/` (Markdown or DOCX files)
  - `logs/` (JSONL format)
  - `policies/` (PDF files)
  - `release_notes/` (DOCX files)

## Record Count Thresholds
| Data Type | Minimum required |
|-----------|------------------|
| Tickets   | 30               |
| Policies  | 10               |
| Logs      | 5                |
| API Snapshots | 2            |

## Known Patterns for Extraction
Validation logic should verify that the following patterns are present and extractable (via regex or LLM):
- **Ticket IDs:** `TICKET-[0-9]+`
- **Incident IDs:** `INC-[0-9]{4}-[0-9]{4}`
- **Change IDs:** `CHG-[0-9]{4}-[0-9]{2}-[0-9]{3}`
- **Emails:** `[a-z.]+@nexatel.example` or `[a-z.]+@asterion.example`
- **Error Codes:** `ERR_[A-Z0-9_]+`

## Integrity Checks
1. **Manifest Parity:** Compare `record_counts` in `dataset_manifest.json` against the actual file counts on disk.
2. **JSONL Validity:** Ensure every line in `.log` files is a valid JSON object.
3. **Bad Files Handling:** The ingestion pipeline MUST NOT crash when encountering corrupted or empty files. It should log an error to the error repository and continue.
4. **PII Masking:** Validate that all emails follow the test domains (`.example`) to ensure no real PII is present.

## Implementation Guide
When implementing a validator:
- Use `pathlib` for file system traversal.
- Use `json` and `jsonlines` for log validation.
- Return a detailed report (JSON or Markdown) listing all discrepancies found.
