var should = require('chai').should();
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var driver;

test.describe('Todo-MVC', function(){

  beforeEach(function(){
    driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();    
  });

  afterEach(function(){
    driver.quit();
  });

  test.it('can add a new todo item', function(){
    this.timeout(4000);
    addItem(driver, "Something Important");
    driver.findElement({tagName: 'li'}).getText().then(function(text){
      text.should.equal("Something Important");
    });
  });

  test.xit('can remove an item', function(){
    this.timeout(6000);
    addItem(driver, "Something Important");
    var listItem = driver.findElement({tagName: 'li'});
    
    new webdriver.ActionSequence(driver).
        mouseMove(listItem).
        perform();

    driver.wait(function () {
      return driver.isElementPresent({className: 'destroy', tagName:'button'});
    }, 4000);

    driver.findElement({className: 'destroy', tagName:'button'}).click();
    
    listItem.getText().then(function(text){
      text.should.equal("All");
    });
  });

  test.it('can check off a finished item', function(){
    this.timeout(6000);
    addItem(driver, "Something Important");
    var listItem = driver.findElement({tagName: 'li'});
    driver.findElement({className: 'toggle', tagName:'input'}).click();
    listItem.getAttribute('class').then(function(attr){
      attr.should.equal('completed');
    });
    
    
  });
});

function addItem(driver, todoText){
  driver.get('http://todomvc.com/examples/vanillajs/');
  driver.findElement({id:'new-todo'}).sendKeys(todoText);
  driver.findElement({id:'new-todo'}).sendKeys(webdriver.Key.ENTER);
};