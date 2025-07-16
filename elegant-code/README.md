# Elegant Code Test

Background - DynamoDB has 2 operations, Scan and Query

1) Scan - A scan operation can return every result in your table, it sounds great until you realise there are cost implications, you are charged for iterating over every item in your table. Even if you are using FilterExpression to reduce the amount of results being returned.

2) Query - think of these operations as a subset of Scan but without the cost and performance implications. This operation allows you to retrieve data with matching provided parition key

My solution - written in both Rust and TypeScript 

Both implementations solve the same DynamoDB cost optimization problem - converting expensive Scan operations into cheaper parallel Query operations by distributing work across multiple threads.

## Rust Implementation

1) Tokio async tasks: Uses tokio::spawn() for lightweight green threads instead of heavy OS threads
2) Clean async/await: Proper async pattern with .await instead of blocking calls
3) Readable flow: Clear separation between task creation and result collection
4) Resource efficient: Green threads are much cheaper than OS threads

## TypeScript Implementation

1) Dedicated worker file: Clean separation of concerns with external worker script
2) Promise-based coordination: Simple Promise.all pattern for collecting worker results
3) Type safety: Maintains generic type safety while using proper worker threads
4) Scalable: Workers can be reused and pooled for better resource management

