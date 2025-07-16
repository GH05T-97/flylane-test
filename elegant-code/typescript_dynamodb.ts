import { Worker } from 'worker_threads';
// ./query-worker.js would have the worker implementation
const dynamoQuery = async <T>(key: string): Promise<T> => (await client.query({ TableName: "table", KeyConditionExpression: "pk = :pk", ExpressionAttributeValues: { ":pk": key } }).promise()).Items as T;
const parallelQuery = async <T>(keys: string[]): Promise<T[]> => {
    const workers = keys.map(key => new Worker('./query-worker.js', { workerData: key }));
    return Promise.all(workers.map(worker => new Promise<T>(resolve => worker.on('message', resolve))));
};