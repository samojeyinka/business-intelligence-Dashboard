// SQL injection prevention utilities

// Escape SQL identifiers (table names, column names)
export function escapeSqlIdentifier(identifier: string): string {
  // Remove any backticks and escape any existing backticks
  return `\`${identifier.replace(/`/g, '``')}\``;
}

// Escape SQL string values
export function escapeSqlString(value: string): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  
  // Replace single quotes with two single quotes (SQL standard)
  return `'${value.replace(/'/g, "''")}'`;
}

// Safely build a WHERE clause with multiple conditions
export function buildSafeWhereClause(conditions: Record<string, any>): string {
  const clauses = Object.entries(conditions)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([column, value]) => {
      const safeColumn = escapeSqlIdentifier(column);
      
      if (typeof value === 'string') {
        return `${safeColumn} = ${escapeSqlString(value)}`;
      } else if (typeof value === 'number') {
        return `${safeColumn} = ${value}`;
      } else if (typeof value === 'boolean') {
        return `${safeColumn} = ${value ? 1 : 0}`;
      } else if (Array.isArray(value)) {
        const safeValues = value
          .map(item => 
            typeof item === 'string' 
              ? escapeSqlString(item) 
              : item
          )
          .join(', ');
        return `${safeColumn} IN (${safeValues})`;
      }
      
      return null;
    })
    .filter(Boolean)
    .join(' AND ');
  
  return clauses.length > 0 ? `WHERE ${clauses}` : '';
}

// Safely build an ORDER BY clause
export function buildSafeOrderByClause(
  column: string, 
  direction: 'ASC' | 'DESC' = 'ASC'
): string {
  const safeColumn = escapeSqlIdentifier(column);
  const safeDirection = direction === 'DESC' ? 'DESC' : 'ASC';
  
  return `ORDER BY ${safeColumn} ${safeDirection}`;
}

// Safely build a LIMIT clause
export function buildSafeLimitClause(limit: number, offset: number = 0): string {
  // Ensure limit and offset are positive integers
  const safeLimit = Math.max(1, Math.floor(Number(limit)));
  const safeOffset = Math.max(0, Math.floor(Number(offset)));
  
  return `LIMIT ${safeLimit} OFFSET ${safeOffset}`;
}