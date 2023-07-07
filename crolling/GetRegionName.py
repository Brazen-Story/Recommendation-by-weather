import sys
import io
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# 콘솔의 기본 인코딩을 'utf-8'로 변경
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

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

    # p 태그의 텍스트 출력
    for p in paragraphs:
        print(p.text)

finally:
    # WebDriver 종료
    driver.quit()
