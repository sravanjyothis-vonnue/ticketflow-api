# Ticket: Add Ticket Comments and Status History

## Goal

Add comments and status history to tickets through the database, service and API layers.

## Requirements

Implement:

- database migrations
- comment model
- status-history model
- comment endpoints
- status-history endpoint
- authorization
- service-layer logic
- tests

## Comment API

```http
POST /api/tickets/:ticketId/comments
GET  /api/tickets/:ticketId/comments
```

A comment must contain:

```text
id
ticketId
authorId
body
createdAt
updatedAt
```

## Status history

Every successful ticket status change must create a history record.

A history record should contain:

```text
id
ticketId
fromStatus
toStatus
changedById
createdAt
```

## History endpoint

Implement:

```http
GET /api/tickets/:ticketId/status-history
```

Stretch:

```http
GET /api/tickets/:ticketId/status-history?page=1&limit=20
```

## Permissions

Users should only be able to perform actions they are authorized to perform.

Define sensible rules based on the existing authorization model.

## Tests

Add tests for:

- creating comments
- listing comments
- unauthorized comment creation
- status changes creating history
- retrieving status history
- pagination
- authorization
