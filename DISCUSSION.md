# Improvements to Discuss

## 1. Database Indexing

Improvements I would make to this application would be adding indexes on city for location filtering, composite indexes on name fields like first & last name and an index on years of experience to improve query performance.

## 2. Pagination

If current API loads all 100,000s advocates into memory, it would cause crashes and a significant degradation in network performance. I would improve this by implementing database LIMIT/OFFSET pagination

## 3. TanStack Query

Implement TanStack Query for intelligent caching and state management

## 4. Redis Caching Layer

Database queries can become expensive with 100,000s of advocates and each new user will trigger an API call. Caching expensive or frequently used queries on the server-side may reduce database load and server repeated results quickly.

## 5. Advanced Filtering API

The search is a basic text based search with not many parameters. If we had 100,000s of users they might want to search in their particular city, by years of experience, etc.
