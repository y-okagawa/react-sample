require "selenium-webdriver"
driver = Selenium::WebDriver.for :firefox
driver.get('http://example.selenium.jp/reserveApp')
driver.find_element(:id, 'guestname').send_keys('サンプルユーザ')
driver.find_element(:id, 'goto_next').click
driver.quit
