import oracledb
import os
import sys

# Define database credentials from project.md
USER = "TRAININGSPROGRAMM_SCHEMA_0H7C8"
PASSWORD = "VL5JMY1BBSLY4ZAB4WXGY9IDt#MITS"
DSN = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCPS)(HOST=db.freesql.com)(PORT=2484))(CONNECT_DATA=(SERVICE_NAME=23ai_34ui2)))"

def main():
    print("Attempting to connect to the database...")
    try:
        # Connect in thin mode
        connection = oracledb.connect(
            user=USER,
            password=PASSWORD,
            dsn=DSN
        )
        print("Successfully connected to the database!")
        
        cursor = connection.cursor()
        
        # 1. Check if SUPPORT_TICKETS table exists
        print("\nChecking if SUPPORT_TICKETS table exists...")
        cursor.execute("""
            SELECT table_name 
            FROM all_tables 
            WHERE table_name = 'SUPPORT_TICKETS' 
              AND owner = :owner
        """, owner=USER)
        row = cursor.fetchone()
        if row:
            print(f"Table 'SUPPORT_TICKETS' exists under owner '{USER}'.")
        else:
            print(f"Table 'SUPPORT_TICKETS' was NOT found under owner '{USER}'. Checking all tables for this user...")
            cursor.execute("SELECT table_name FROM user_tables ORDER BY table_name")
            tables = cursor.fetchall()
            for t in tables:
                print(f"Found table: {t[0]}")
            return

        # 2. Get table column definitions
        print("\nGetting schema of SUPPORT_TICKETS...")
        cursor.execute("""
            SELECT column_name, data_type, data_length, nullable 
            FROM all_tab_columns 
            WHERE table_name = 'SUPPORT_TICKETS' 
              AND owner = :owner
            ORDER BY column_id
        """, owner=USER)
        columns = cursor.fetchall()
        print(f"Total columns: {len(columns)}")
        for col in columns:
            print(f" - {col[0]}: {col[1]}({col[2]}), Nullable: {col[3]}")

        # 3. Get row count
        print("\nGetting row count of SUPPORT_TICKETS...")
        cursor.execute("SELECT COUNT(*) FROM SUPPORT_TICKETS")
        count = cursor.fetchone()[0]
        print(f"Total rows in SUPPORT_TICKETS: {count}")

        # 4. Fetch sample rows if any
        if count > 0:
            print("\nFetching sample rows from SUPPORT_TICKETS (up to 5)...")
            # Get column names to display headers
            col_names = [col[0] for col in columns]
            
            # Query first 5 rows
            cursor.execute("SELECT * FROM SUPPORT_TICKETS WHERE ROWNUM <= 5")
            rows = cursor.fetchall()
            for i, r in enumerate(rows, 1):
                print(f"\nRow {i}:")
                for col_name, val in zip(col_names, r):
                    if val is not None:
                        print(f"  {col_name}: {val}")
        else:
            print("\nTable is empty.")

    except Exception as e:
        print(f"Error occurred: {e}", file=sys.stderr)
    finally:
        if 'connection' in locals():
            connection.close()
            print("\nConnection closed.")

if __name__ == "__main__":
    main()
