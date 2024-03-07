from flask import Flask, request, jsonify
from flask_cors import CORS
from regression import apply_regression
from extract_data import extract_data

app = Flask(__name__)
CORS(app)

@app.route('/predict_sales_quantity', methods=['POST'])
def predict_sales_quantity():
    data = request.get_json()
    target_date = data.get('target_date')
    material_code = data.get('material_code')
    sales_office_id = data.get('sales_office_id')

    future_data = extract_data(target_date)
    sales_quantity = apply_regression(target_date, material_code, sales_office_id, future_data)

    return jsonify({'sales_quantity': sales_quantity})

if __name__ == '__main__':
    app.run(debug=True)