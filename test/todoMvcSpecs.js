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

  test.it('can remove an item', function(){
    this.timeout(6000);
    addItem(driver, "Something Important");
    var listItem = driver.findElement({tagName: 'li'});
    driver.findElement({tagName:'li'}).click();
    driver.findElement({className: 'destroy', tagName:'button'}).click();
    driver.findElements({tagName:'li'}).then(function(elements){
      elements.length.should.equal(3);
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

  test.xit('can edit an item', function(){
    this.timeout(6000);
    addItem(driver, "Something Important");
    var listItem = driver.findElement({tagName:'li'})

    // driver.wait(function () {
    //   return driver.isElementPresent({id:'footer'});
    // }, 4000);
    
    // listItem.getText().then(function(text){
    //   console.log(text);
    // });

    // new webdriver.ActionSequence(driver).
    //     mouseMove(listItem).
    //     doubleClick().
    //     perform();

    var newText = "Something More Important!"
    listItem.doubleClick();
    listItem.sendKeys(newText);
    driver.findElement({id:'new-todo'}).sendKeys(webdriver.Key.ENTER);
    listItem.getText().then(function(text){
      text.should.equal(newText);
    });
  });
});

function addItem(driver, todoText){
  driver.get('http://todomvc.com/examples/vanillajs/');
  driver.findElement({id:'new-todo'}).sendKeys(todoText);
  driver.findElement({id:'new-todo'}).sendKeys(webdriver.Key.ENTER);
};