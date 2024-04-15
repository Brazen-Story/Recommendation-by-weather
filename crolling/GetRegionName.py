import sys
import io
import re
import mysql.connector
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

db_config = {
    'user': 'root',
    'password': 'kim0523',
    'host': 'localhost',
    'database': 'byWeather',
    'raise_on_warnings': True
}

cnx = mysql.connector.connect(**db_config)
cursor = cnx.cursor()

driver_path = "C:/chromedriver.exe"

options = Options()
options.add_argument("--headless") 

service = Service(driver_path)

driver = webdriver.Chrome(service=service, options=options)

url = "https://devlink.tistory.com/12"

driver.get(url)

try:
    article = driver.find_element("tag name", "article")

    div = article.find_element("tag name", "div")

    paragraphs = div.find_elements("tag name", "p")

    for p in paragraphs:
        text = p.text

        filtered_text = re.sub(r'\[.*?\]', '', text).strip()

        if "-" not in filtered_text:
            continue

        values = filtered_text.split(" - ")

        if len(values) >= 2:
            korean_name = values[0]
            english_name = values[1]
        else:
            continue

        select_query = "SELECT COUNT(*) FROM region_name WHERE Korean = %s"
        cursor.execute(select_query, (korean_name,))
        count = cursor.fetchone()[0]

        if count == 0:
            print(korean_name, english_name)

            insert_query = "INSERT INTO region_name (Korean, English) VALUES (%s, %s)"
            cursor.execute(insert_query, (korean_name, english_name))

    cnx.commit()

    select_query = "SELECT Korean, COUNT(*) FROM region_name GROUP BY Korean HAVING COUNT(*) > 1"
    cursor.execute(select_query)

    for (korean_name, count) in cursor:
        print(f"중복된 값: {korean_name}, 개수: {count}")


finally:
    cursor.close()
    cnx.close()

    driver.quit()
