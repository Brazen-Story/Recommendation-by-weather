import sys
import io
import re
import mysql.connector
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# 콘솔의 기본 인코딩을 'utf-8'로 변경
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# MySQL 연결 설정
db_config = {
    'user': 'root',
    'password': 'kim0523',
    'host': 'localhost',
    'database': 'byWeather',
    'raise_on_warnings': True
}

# MySQL 연결
cnx = mysql.connector.connect(**db_config)
cursor = cnx.cursor()

# 크롬 드라이버 경로
driver_path = "C:/chromedriver.exe"

# 크롬 옵션 설정
options = Options()
options.add_argument("--headless")  # 브라우저 창을 띄우지 않고 실행 (백그라운드 실행)

# ChromeDriver 서비스 생성
service = Service(driver_path)

# WebDriver 객체 생성
driver = webdriver.Chrome(service=service, options=options)

# 크롤링할 페이지 URL
url = "https://devlink.tistory.com/12"

# 페이지 로드
driver.get(url)

try:
    # article 요소 찾기
    article = driver.find_element("tag name", "article")

    # article 내부의 div 요소 찾기
    div = article.find_element("tag name", "div")

    # div 내부의 모든 p 태그 찾기
    paragraphs = div.find_elements("tag name", "p")

    # p 태그의 텍스트 출력 및 MySQL에 삽입
    for p in paragraphs:
        text = p.text

        # 대괄호가 포함된 문자열 및 빈 문자열 제거
        filtered_text = re.sub(r'\[.*?\]', '', text).strip()

        # "-"가 없는 문자열 제거
        if "-" not in filtered_text:
            continue

        # 한국어와 영어로 분리
        english_name, korean_name = filtered_text.split(" - ")

        # 출력
        print(korean_name, english_name)

        # MySQL에 삽입
        # MySQL에 삽입
        insert_query = "INSERT INTO region_name (English, Korean) VALUES (%s, %s)"
        cursor.execute(insert_query, (korean_name, english_name))

    # 변경사항 커밋
    cnx.commit()

finally:
    # MySQL 연결 종료
    cursor.close()
    cnx.close()

    # WebDriver 종료
    driver.quit()
