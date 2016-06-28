require 'selenium-webdriver'
require 'pry'

describe "TODOリストテスト" do

  before do
    Selenium::WebDriver::Chrome.driver_path = './chromedriver'
    @webdriver = Selenium::WebDriver.for :chrome
  end

  it "入力したテキストがTODOリストに表示されること" do
    @webdriver.navigate.to "http://localhost:8080/todolist.html"
    element = @webdriver.find_element(:id, 'addTodoText')
    element.send_keys "Hello World"
    @webdriver.save_screenshot('screenshot/1.png')
    @webdriver.find_element(:id, 'addTodoBtn').click()
    @webdriver.save_screenshot('screenshot/2.png')
    todos = @webdriver.find_elements(:css, '.todo')
    expect(todos.size).to eq(1)
  end

  after do
    @webdriver.quit
  end
end
