use tokio::task;

async fn dynamodb_query(key: String) -> QueryResult { client.query().table("table").key_condition_expression("pk = :pk").expression_attribute_values(":pk", key).send().await.unwrap() }
async fn parallel_query(keys: Vec<String>) -> Vec<QueryResult> {
    let tasks: Vec<_> = keys.into_iter().map(|key| task::spawn(dynamodb_query(key))).collect();
    futures::future::join_all(tasks).await.into_iter().map(|r| r.unwrap()).collect()
}