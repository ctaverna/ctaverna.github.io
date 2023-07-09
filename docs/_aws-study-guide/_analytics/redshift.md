# Redshift

Amazon Redshift integrates with various ETL tools, BI reporting, data mining, and analytics tools.

It is based on open standard PostgreSQL, so most existing SQL client applications will integrate with minimal changes.

Like most SQL-based databases, you can create a table using the CREATE TABLE command.

Additional columns can be added to a table by using the ALTER TABLEcommand, but you cannot change the data type on an existing column.

## Nodes

### Leader node&#x20;

Stores metadata about the cluster.\
Communicates with client applications by using open standard PostgreSQL, JDBC, and ODBC drivers.

* Receives queries from clients, parses the queries, and develops query execution plans
* Coordinates a parallel execution of these plans with the compute nodes
* &#x20;Aggregates the intermediate results from these nodes
* &#x20;Finally, it returns the results to the client applications.&#x20;

### Compute nodes and slices

* Execute the query execution plan and transmit data among themselves to serve these queries.&#x20;
* A compute node is partitioned into slices.&#x20;
  * Each slice is allocated a portion of the node’s memory and disk space, where it processes a portion of the workload assigned to the node.&#x20;
  * The leader node manages distributing data to the slices and allocates the workload for any queries or other database operations to the slices. The slices then work in parallel to complete the operation. The node size of the cluster determines the number of slices per node.

## **Distribution Strategy**&#x20;

&#x20;When you execute a query, the query optimizer redistributes the rows to the compute nodes as needed to perform any joins and aggregations. The goal in selecting a table distribution style is to minimize the impact of the redistribution step by locating the data where it needs to be before the query is executed.

* **EVEN distribution:** Rows are distributed across the slices in a **round-robin** fashion, regardless of the values in any particular column.\
  It is an appropriate choice when a table does not participate in joins or when there is not a clear choice between KEY distribution or ALL distribution. EVEN is the **default** distribution type.
* **KEY distribution:** Rows are distributed according to the **values in one column**.\
  The leader node attempts to place matching values on the same node slice. Use this style when you will be querying heavily against values of a specific column.
* **ALL distribution:** A copy of the **entire table** is distributed to **every node**.\
  This ensures that every row is collocated for every join in which the table participates. This multiplies the storage required by the number of nodes in the cluster, and it takes much longer to load, update, or insert data into multiple tables. Use this style only for relatively slow-moving tables that are not updated frequently or extensively.



