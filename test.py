from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

binary = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
url = 'https://www.alljobs.co.il/SearchResultsGuest.aspx?page=1&position=&type=&freetxt=&city=&region='

options = Options()
options.binary_location = binary
options.add_argument('--headless')
options.add_argument('--window-size=1280,1024')

browser = webdriver.Chrome('chromedriver', chrome_options=options)
browser.get(url)

WebDriverWait(browser, 16).until(EC.presence_of_all_elements_located)

# print(browser)

html = browser.page_source
print(html)
# print("works= {}".format("open-board" in html))