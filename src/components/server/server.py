from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
import secrets
from datetime import date
from datetime import datetime


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SESSION_COOKIE_NAME'] = 'test'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = False

print(app.config['SECRET_KEY'])

@app.before_request
def log_request():
    print(f"Incoming request: {request.method} {request.path}")

# Database configuration


config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'arc',
    'raise_on_warnings': True
}

def get_db_connection():
    conn = mysql.connector.connect(**config)
    if conn:
        print("ssss")
    else :
        print("ffff")
    return conn



@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        conn = get_db_connection()

        cursor = conn.cursor()

        # Assuming the emp_details table has the fields for login, you'd likely have a separate user table.
        query = "SELECT * FROM accountdetails WHERE username=%s AND password=%s"
        cursor.execute(query, (data['username'], data['password']))

        result = cursor.fetchone()

        cursor.close()
        conn.close()

        if result:
            return jsonify({"success": True, "message": "Logged in!"})
        else:
            return jsonify({"success": False, "message": "Invalid credentials."})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/api/register', methods=['POST'])
def add_customer():
    try:
        data = request.json
        # Make sure data is not None and has required fields
        if not data or 'username' not in data or 'password' not in data or 'email' not in data:
            return jsonify({"success": False, "message": "Invalid data provided"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if username is already taken
        cursor.execute("SELECT * FROM accountdetails WHERE username = %s", (data['username'],))
        if cursor.fetchone():
            return jsonify({"success": False, "message": "Username already taken, use a different username"}), 409

        # If username is not taken, proceed with inserting new user
        cursor.execute("""
            INSERT INTO accountdetails 
            (username, fullname, password, email, dateofbirth, timeofbirth, placeofbirth, mobile, address) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (data['username'], data['fullname'], data['password'], data['email'], data['dateofbirth'],
                  data['timeofbirth'], data['placeofbirth'], data['mobile'], data['address']))
        print('Inserting time of birth:', data['timeofbirth'])
        conn.commit()

        return jsonify({"success": True, "message": "Registration successful"})

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"success": False, "message": "Database error"}), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"success": False, "message": "An error occurred"}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/updateaccountdetails', methods=['POST'])
def update_customer():
    try:
        data = request.json
        # Make sure data is not None and has required fields
        if data is None or 'username' not in data:
            return jsonify({"success": False, "message": "Invalid data provided"}), 400
        
        # Check if additional details are provided for the update
        if 'fullname' not in data or 'email' not in data or 'dateofbirth' not in data or 'timeofbirth' not in data or 'placeofbirth' not in data or 'mobile' not in data or 'address' not in data:
            return jsonify({"success": False, "message": "Missing data for update"}), 400

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Check if the user exists
        user_check_query = "SELECT * FROM accountdetails WHERE username=%s"
        cursor.execute(user_check_query, (data['username'],))
        result = cursor.fetchone()
        
        if not result:
            return jsonify({"success": False, "message": "Username not found"}), 404
        else:
            # If user exists, proceed with updating their details
            update_query = """
                UPDATE accountdetails 
                SET fullname=%s, email=%s, password=%s, dateofbirth=%s, timeofbirth=%s, placeofbirth=%s, mobile=%s, address=%s 
                WHERE username=%s
            """
            cursor.execute(update_query, (
                data['fullname'], 
                data['email'], 
                data['password'], 
                data['dateofbirth'], 
                data['timeofbirth'], 
                data['placeofbirth'], 
                data['mobile'], 
                data['address'],
                data['username']
            ))
            conn.commit()
            return jsonify({"success": True, "message": "Account details updated successfully"})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/api/username', methods=['GET'])
def username_check():
    try:
        username = request.args.get('username')
        if not username:
            return jsonify({"isAvailable": False, "message": "No username provided"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        query = "SELECT COUNT(*) FROM accountdetails WHERE username=%s"
        cursor.execute(query, (username,))

        # Fetchone will return a tuple (count,) we check if count is 0
        result = cursor.fetchone()[0] == 0

        cursor.close()
        conn.close()

        return jsonify({"isAvailable": result, "message": "Username available" if result else "Username taken, try new one"})

    except Exception as e:
        return jsonify({"isAvailable": False, "message": str(e)}), 500
    
@app.route('/api/userdetails', methods=['GET'])
def user_details():
    username = request.args.get('username')
    print(username)
    if not username:
        return jsonify({"success": False, "message": "Username not provided"}), 400

    conn = get_db_connection()
    try:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM accountdetails WHERE username = %s", (username,))
        user_details = cursor.fetchone()
        cursor.close()
        
        if user_details:
            return jsonify({"success": True, "data": user_details}), 200
        else:
            return jsonify({"success": False, "message": "User not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if conn.is_connected():
            conn.close()





if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
