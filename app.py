import os
import requests  # 👈 arriba del archivo
from flask import Flask, jsonify, request, render_template
import sqlite3
from datetime import datetime

app = Flask(__name__)

DATABASE = 'database.db'

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS rsvp (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            dni TEXT NOT NULL,
            restriccion TEXT,
            telefono TEXT NOT NULL,
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS musica (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            cancion TEXT NOT NULL,
            artista TEXT,
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS carta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            sugerencia TEXT NOT NULL,
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/api/rsvp', methods=['POST'])
def submit_rsvp():
    try:
        data = request.get_json(silent=True) or {}

        nombre      = data.get('nombre')
        dni         = data.get('dni')
        telefono    = data.get('telefono')
        restriccion = data.get('restriccion', 'Ninguna')

        if not all([nombre, dni, telefono]):
            return jsonify({'success': False, 'message': 'Todos los campos son requeridos'}), 400

        # 👇 PEGÁ TU URL ACÁ
        url = "https://script.google.com/macros/s/AKfycbxxxxxxx/exec"

        response = requests.post(url, json={
            "nombre": nombre,
            "dni": dni,
            "telefono": telefono,
            "restriccion": restriccion
        })

        return jsonify({'success': True, 'message': '¡Gracias por confirmar tu asistencia!'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/musica', methods=['POST'])
def submit_musica():
    try:
        data    = request.get_json()
        nombre  = data.get('nombre')
        cancion = data.get('cancion')
        artista = data.get('artista', '')

        if not all([nombre, cancion]):
            return jsonify({'success': False, 'message': 'Nombre y canción son requeridos'}), 400

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO musica (nombre, cancion, artista) VALUES (?, ?, ?)',
            (nombre, cancion, artista)
        )
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': '¡Gracias por tu sugerencia musical!'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/carta', methods=['POST'])
def submit_carta():
    try:
        data       = request.get_json()
        nombre     = data.get('nombre')
        sugerencia = data.get('sugerencia')

        if not all([nombre, sugerencia]):
            return jsonify({'success': False, 'message': 'Nombre y sugerencia son requeridos'}), 400

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO carta (nombre, sugerencia) VALUES (?, ?)',
            (nombre, sugerencia)
        )
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'message': '¡Gracias por tu sugerencia!'})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/confirmaciones', methods=['GET'])
def get_confirmaciones():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM rsvp ORDER BY fecha_registro DESC')
        confirmaciones = cursor.fetchall()
        conn.close()
        return jsonify({'success': True, 'data': confirmaciones})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)