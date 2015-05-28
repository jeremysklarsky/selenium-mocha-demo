var should = require('chai').should();
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var driver;

test.describe('Wikipedia', function() {

  beforeEach(function(){
    driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();    
  });

  afterEach(function(){
    driver.quit();
  });

  test.it('should work', function() {
    this.timeout(4000);
    driver.get('http://www.wikipedia.com');
    driver.getTitle().then(function(title) {
      title.should.equal("Wikipedia");
    });
  });

  test.it('should be able to search for an article', function() {
    this.timeout(8000);
    driver.get('http://www.wikipedia.com');

    driver.findElement(webdriver.By.name("search")).sendKeys("javascript");
    driver.findElement(webdriver.By.name("go")).click();
    driver.getTitle().then(function(title){
      title.should.include("JavaScript");
    });
  });

  test.it('should be able to expand and collapse menus', function(){
    this.timeout(6000);

    driver.get('http://en.wikipedia.org/wiki/JavaScript');
    var element = driver.findElement({id:'collapseButton0'});
    element.getText().then(function(text){
      text.should.equal("show");
    });

    element.click();
    element.getText().then(function(text){
      text.should.equal("hide");
    });

    element.click();
    element.getText().then(function(text){
      text.should.equal("show");
    });
  });

  test.it('should be able to navigate to a new page by clicking a link', function(){
    this.timeout(5000);
    driver.get('http://en.wikipedia.org/wiki/JavaScript');
    driver.findElement(webdriver.By.partialLinkText("jQuery")).click();  
    driver.getTitle().then(function(title){
      title.should.include("jQuery");
    });
  });
});





