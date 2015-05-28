var should = require('chai').should();
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var driver;

test.describe('Trello', function(){

  beforeEach(function(){
    driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();    
  });

  afterEach(function(){
    driver.quit();
  });

  test.it('should login', function(){
    this.timeout(8000);   
    driver.get('https://trello.com/login');
    driver.findElement({id:'user'}).sendKeys("jeremy.sklarsky@gmail.com");
    driver.findElement({id:'password'}).sendKeys("UkypR47R");
    driver.findElement({id:'login'}).click();
    
    driver.wait(function () {
      return driver.isElementPresent({className:"board-list-item--add-board"});
    }, 4000);

    var text = driver.findElement(webdriver.By.tagName("body")).getText().then(function(text){
      text.should.include("Jeremy Sklarsky");
    });
  });

  test.it('should create a new board', function(){
    this.timeout(10000);   
    // login
    driver.get('https://trello.com/login');
    driver.findElement({id:'user'}).sendKeys("jeremy.sklarsky@gmail.com");
    driver.findElement({id:'password'}).sendKeys("UkypR47R");
    driver.findElement({id:'login'}).click();
    // wait for login to happen
    driver.wait(function () {
      return driver.isElementPresent({className:"board-list-item--add-board"});
    }, 4000);
    // create dummy title
    var title = Math.floor(Math.random()*100000).toString();
    // submit title and make new board
    driver.findElement({className:"board-list-item--add-board"}).click();
    driver.findElement({id:'boardNewTitle'}).sendKeys(title);
    driver.findElement({tagName: 'form'}).submit();
    driver.findElement(webdriver.By.tagName("body")).getText().then(function(text){
      text.should.include(title);
    });

    // add item to board
    driver.findElement({className:'list-name-input'}).sendKeys("List Item 1");
    driver.findElement({className:'js-save-edit'}).click();
    driver.findElement({className:'js-open-card-composer'}).click();
    // add a card to the list
    driver.findElement({className:'list-card-composer-textarea'}).sendKeys("An important item");
    driver.findElement({className:'js-add-card'}).click();
    driver.findElement(webdriver.By.tagName("body")).getText().then(function(text){
      text.should.include("An important item");
    });
  });  
});