import pandas as pd
from extract_data import extract_data
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score

def apply_regression(target_date, material_code, sales_office_id, future_data):
    data = pd.read_excel("data.xlsx", sheet_name='Sheet1')

    columns_to_convert = ['SalesOfficeID','MaterialCode']
    for column in columns_to_convert:
        data[column] = data[column].astype(str)

    filtered_data = data[(data['MaterialCode'] == material_code) & (data['SalesOfficeID'] == sales_office_id)]
    try:
        x = filtered_data[['DayType', 'Holiday', 'LongWeekend', 'Marriages', 'temp', 'feelslike', 'humidity', 'precip', 'precipprob', 'preciptype', 'cloudcover']]
        y= filtered_data['SalesQuantity']   

        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)

        # Random Forest Regression
        rf_regressor = RandomForestRegressor(n_estimators=100, random_state=0)  # You can adjust n_estimators as needed
        rf_regressor.fit(x_train, y_train)
        y_pred = rf_regressor.predict(x_train)

        # Calculate R-squared score
        r2 = r2_score(y_train, y_pred)
        print(r2)

        # Predict SalesQuantity using future data
        future_df = pd.DataFrame([future_data])
        future_x = future_df[['DayType', 'Holiday', 'LongWeekend', 'Marriages', 'temp', 'feelslike', 'humidity', 'precip', 'precipprob', 'preciptype', 'cloudcover']]
        future_sales_quantity = rf_regressor.predict(future_x)
        return_val = "Predicted Sales Quantity of Product "+material_code+" on Date "+target_date+" from office "+sales_office_id+" is "
        return (return_val+str(future_sales_quantity[0])+" kg")
    except:
        return ("Some Error Occured (Probably insufficient data of product "+material_code+" in office "+sales_office_id+")")